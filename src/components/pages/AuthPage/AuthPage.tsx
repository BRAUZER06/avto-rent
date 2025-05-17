"use client";
import { useState } from "react";
import styles from "./AuthPage.module.scss";
import { confirmPhoneNumber, sendPhoneNumber } from "@src/lib/api/auth";
import { setTokens } from "@src/lib/api/tokenService";

export default function AuthPage() {
    const [phone, setPhone] = useState<string>(""); // Номер телефона
    const [otp, setOtp] = useState<string>(""); // Код подтверждения
    const [otpSent, setOtpSent] = useState<boolean>(false); // Отправлен ли код
    const [error, setError] = useState<string | null>(null); // Для вывода ошибок

    // Отправка OTP
    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Сброс ошибок

        try {
            await sendPhoneNumber(phone); // Отправляем номер на сервер
            setOtpSent(true); // Устанавливаем флаг, что код отправлен
        } catch (err: any) {
            setError(err.message || "Ошибка отправки кода");
        }
    };

    // Подтверждение номера телефона
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Сброс ошибок

        try {
            const data = await confirmPhoneNumber(phone, otp); // Отправляем код и номер на сервер
            console.log("Успешное подтверждение:", data);

            // Сохраняем токены в localStorage
            setTokens(data.token, ""); // Предположительно, refreshToken отсутствует в данном API

            alert("Номер успешно подтвержден!");
        } catch (err: any) {
            setError(err.message || "Ошибка подтверждения");
        }
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.authContainer}>
                <h1 className={styles.title}>Авторизация/Регистрация</h1>
                {error && <p className={styles.error}>{error}</p>}{" "}
                {/* Отображение ошибки */}
                <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
                    <input
                        type="tel"
                        placeholder="Введите номер телефона"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                        className={styles.authInput}
                        disabled={otpSent}
                    />
                    {otpSent && (
                        <input
                            type="text"
                            placeholder="Введите код подтверждения"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            required
                            className={styles.authInput}
                        />
                    )}
                    <button type="submit" className={styles.authBtn}>
                        {otpSent ? "Подтвердить код" : "Отправить код"}
                    </button>
                </form>
            </div>
        </div>
    );
}
