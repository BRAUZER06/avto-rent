"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./LoginPage.module.scss";
import { login } from "@src/lib/api/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("Загрузка...");
        setLoading(true);

        try {
            const response = await login({
                email,
                password,
                password_confirmation: password,
                role: 1,
            });
            setMessage(`✅ ${response.status.message}`);
            router.push("/profile/my_cars");
        } catch (error: any) {
            setMessage(`❌ ${error?.message ?? "Ошибка авторизации"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.page}>
            <form onSubmit={handleLogin} className={styles.form} noValidate>
                <h1 className={styles.title}>Вход</h1>

                <label className={styles.srOnly} htmlFor="email">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className={styles.input}
                    disabled={loading}
                />

                <label className={styles.srOnly} htmlFor="password">
                    Пароль
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className={styles.input}
                    disabled={loading}
                />

                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? "Входим..." : "Войти"}
                </button>

                <div className={styles.authRow}>
                    <span className={styles.muted}>Нет аккаунта?</span>
                    {/* редирект на /auth для регистрации */}
                    <Link href="/auth" className={styles.authLink}>
                        Зарегистрироваться
                    </Link>
                </div>

                {message && <p className={styles.message}>{message}</p>}
            </form>
        </main>
    );
}
