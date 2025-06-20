"use client";

import { useState } from "react";

import styles from "./LoginPage.module.scss";
import { login } from "@src/lib/api/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("Загрузка...");

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
            setMessage(`❌ ${error.message}`);
        }
    };

    return (
        <main className={styles.page}>
            <form onSubmit={handleLogin} className={styles.form}>
                <h1 className={styles.title}>Вход</h1>

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
                    Войти
                </button>

                {message && <p className={styles.message}>{message}</p>}
            </form>
        </main>
    );
}
