"use client";

import { useState } from "react";

import styles from "./RegisterPage.module.scss";
import { signup } from "@src/lib/api/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("Загрузка...");

        try {
            const response = await signup({
                email,
                password,
                password_confirmation: password,
                company_name: companyName,
                role: 1,
            });
            setMessage(`✅ ${response.status.message}`);
            router.push("/profile/my_cars");
        } catch (error: any) {
            setMessage(`❌ ${error.message}`);
        }
    };

    return (
        <main className={styles.page}>
            <form onSubmit={handleRegister} className={styles.form}>
                <h1 className={styles.title}>Регистрация</h1>

                <input
                    type="text"
                    placeholder="Название компании"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    required
                    className={styles.input}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className={styles.input}
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className={styles.input}
                />

                <button type="submit" className={styles.button}>
                    Зарегистрироваться
                </button>

                {message && <p className={styles.message}>{message}</p>}
            </form>
        </main>
    );
}
