"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./RegisterPage.module.scss";
import { signup } from "@src/lib/api/auth";
import { regionsFull } from "@src/data/regions";

// ——— helpers ———
type Errors = Partial<{
    companyName: string;
    phone: string;
    region: string;
    email: string;
    password: string;
    common: string;
}>;

function isEmail(s: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

// Подсчитываем именно «буквы» (любой алфавит)
function hasAtLeastNLetters(s: string, n = 5) {
    const letters = (s.match(/\p{L}/gu) || []).length; // \p{L} — все буквы Юникода
    return letters >= n;
}

function hasCyrillic(s: string) {
    return /\p{Script=Cyrillic}/u.test(s); // true, если есть русские буквы
}

// Нормализация телефона (основной сценарий — РФ)
function normalizePhone(raw: string): string {
    const digits = (raw || "").replace(/\D/g, "");

    if (!digits) return "";

    // 8XXXXXXXXXX -> +7XXXXXXXXXX
    if (digits.length === 11 && digits[0] === "8") {
        return `+7${digits.slice(1)}`;
    }

    // 7XXXXXXXXXX -> +7XXXXXXXXXX
    if (digits.length === 11 && digits.startsWith("7")) {
        return `+${digits}`;
    }

    // XXXXXXXXXX -> +7XXXXXXXXXX
    if (digits.length === 10) {
        return `+7${digits}`;
    }

    // 00XXXXXXXX -> +XXXXXXXX
    if (raw.trim().startsWith("00")) {
        return `+${raw.trim().slice(2).replace(/\D/g, "")}`;
    }

    // если уже с плюсом или что-то экзотическое — приведём к +цифры
    if (raw.trim().startsWith("+")) {
        return `+${digits}`;
    }

    return `+${digits}`;
}

// E.164-like проверка (+ и 8-15 цифр)
function validatePhoneE164Like(phone: string) {
    return /^\+[0-9]{8,15}$/.test(phone);
}

export default function RegisterPage() {
    const router = useRouter();

    const [companyName, setCompanyName] = useState("");
    const [phone, setPhone] = useState("");
    const [region, setRegion] = useState(""); // храним name региона ("" — «Все регионы»)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState<Errors>({});
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const runValidation = () => {
        const next: Errors = {};

        // --- Название компании: минимум 5 букв (любой алфавит), допустимы буквы/цифры/пробелы/.-'&, ---
        const name = companyName.trim();
        const letterCount = (name.match(/\p{L}/gu) || []).length; // считаем буквы (unicode)
        if (!name) {
            next.companyName = "Укажите название компании";
        } else if (letterCount < 5) {
            next.companyName = "Минимум 5 букв в названии";
        } else if (!/^[\p{L}\d\s\-,'&_]+$/u.test(name)) {
            next.companyName =
                "Допустимы буквы, цифры, пробелы и символы , - ' & (точка запрещена)";
        }

        // --- Телефон: нормализация к виду +7XXXXXXXXXX (поддержка 8XXXXXXXXXX → +7...) ---
        const raw = String(phone || "");
        let digits = raw.replace(/\D/g, "");
        if (digits.length === 11 && digits.startsWith("8")) {
            digits = "7" + digits.slice(1);
        } else if (digits.length === 10) {
            digits = "7" + digits; // если без кода страны — считаем РФ
        }
        const normPhone = digits ? `+${digits}` : "";
        const isE164 = /^\+\d{10,15}$/.test(normPhone);

        if (!normPhone) {
            next.phone = "Укажите номер телефона";
        } else if (!isE164) {
            next.phone = "Неверный формат номера";
        }

        // --- Регион: нельзя «Все регионы» (id = 0/пусто) ---
        if (!region || Number(region) === 0) {
            next.region = "Выберите регион (не «Все регионы»)";
        }

        // --- Email ---
        const emailTrim = email.trim();
        if (!emailTrim) {
            next.email = "Укажите Email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)) {
            next.email = "Неверный Email";
        }

        // --- Пароль: минимум 6 символов, без кириллицы ---
        const hasCyrillic = /\p{Script=Cyrillic}/u.test(password);
        if (!password) {
            next.password = "Укажите пароль";
        } else if (password.length < 6) {
            next.password = "Минимум 6 символов";
        } else if (hasCyrillic) {
            next.password = "Пароль не должен содержать русские буквы";
        }

        setErrors(next);
        return { ok: Object.keys(next).length === 0, normPhone };
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        const { ok, normPhone } = runValidation();
        if (!ok) return;

        try {
            setLoading(true);
            setMessage("Загрузка...");

            // Собираем полезную нагрузку. На бэке примите как вам удобнее.
            const payload: any = {
                email: email.trim(),
                password,
                password_confirmation: password,
                company_name: companyName.trim(),
                region, // строка name из regionsFull
                role: 1,
                phone_1: { number: normPhone, label: "" }, // при желании адаптируйте под API
            };

            const response = await signup(payload);
            setMessage(`✅ ${response?.status?.message ?? "Регистрация успешна"}`);

            router.push("/profile/my_cars");
        } catch (error: any) {
            setMessage(`❌ ${error?.message ?? "Ошибка регистрации"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.page}>
            <form onSubmit={handleRegister} className={styles.form} noValidate>
                <h1 className={styles.title}>Регистрация</h1>

                {/* Компания */}
                <div className={styles.field}>
                    <input
                        type="text"
                        placeholder="Название компании"
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                        required
                        className={`${styles.input} ${errors.companyName ? styles.inputError : ""}`}
                        aria-invalid={Boolean(errors.companyName) || undefined}
                        aria-describedby={
                            errors.companyName ? "company-error" : undefined
                        }
                        maxLength={60}
                    />
                    {errors.companyName && (
                        <span
                            id="company-error"
                            role="alert"
                            className={styles.errorText}
                        >
                            {errors.companyName}
                        </span>
                    )}
                </div>

                {/* Телефон */}
                <div className={styles.field}>
                    <input
                        type="tel"
                        placeholder="Номер телефона или WhatsApp"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                        className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                        aria-invalid={Boolean(errors.phone) || undefined}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                        <span id="phone-error" role="alert" className={styles.errorText}>
                            {errors.phone}
                        </span>
                    )}
                </div>

                {/* Регион */}
                <div className={styles.field}>
                    <select
                        value={region}
                        onChange={e => setRegion(e.target.value)}
                        required
                        className={`${styles.input} ${errors.region ? styles.inputError : ""}`}
                        aria-invalid={Boolean(errors.region) || undefined}
                        aria-describedby={errors.region ? "region-error" : undefined}
                    >
                        <option value="">Выберите регион</option>
                        {regionsFull.map(r => (
                            <option key={r.id} value={r.name}>
                                {r.label}
                            </option>
                        ))}
                    </select>
                    {errors.region && (
                        <span id="region-error" role="alert" className={styles.errorText}>
                            {errors.region}
                        </span>
                    )}
                </div>

                {/* Email */}
                <div className={styles.field}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                        aria-invalid={Boolean(errors.email) || undefined}
                        aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                        <span id="email-error" role="alert" className={styles.errorText}>
                            {errors.email}
                        </span>
                    )}
                </div>

                {/* Пароль */}
                <div className={styles.field}>
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                        aria-invalid={Boolean(errors.password) || undefined}
                        aria-describedby={errors.password ? "password-error" : undefined}
                        pattern="^[^\p{Script=Cyrillic}]+$"
                    />

                    {errors.password && (
                        <span
                            id="password-error"
                            role="alert"
                            className={styles.errorText}
                        >
                            {errors.password}
                        </span>
                    )}
                </div>

                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? "Загрузка…" : "Зарегистрироваться"}
                </button>

                <p className={styles.description}>
                    После регистрации ваша заявка пройдёт модерацию. Это помогает нам
                    проверять компании и уменьшает количество ненадёжных пользователей. Мы
                    свяжемся с вами по телефону или WhatsApp для подтверждения.
                </p>

                <div className={styles.authRow}>
                    <span className={styles.muted}>Уже есть аккаунт?</span>
                    <Link href="/login" className={styles.authLink}>
                        Войти
                    </Link>
                </div>

                {message && <p className={styles.message}>{message}</p>}
            </form>
        </main>
    );
}
