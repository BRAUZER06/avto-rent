import React, { useState, useEffect } from "react";
import styles from "./Notification.module.scss";

export type NotificationProps = {
    notification: {
        message: string;
        type: string;
        isLoading?: boolean;
    } | null;
};

export const useNotification = () => {
    const [notification, setNotification] = useState<
        NotificationProps["notification"] | null
    >(null);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        // Таймер только если не загрузка
        if (notification && !notification.isLoading) {
            timer = setTimeout(() => {
                setNotification(null);
            }, 3000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [notification]);

    const showNotification = (message: string, type: string, isLoading = false) => {
        setNotification({ message, type, isLoading });
    };

    return {
        notification,
        showNotification,
    };
};

export const Notification: React.FC<NotificationProps> = ({ notification }) => {
    if (!notification) return null;

    return (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
            {notification.isLoading ? (
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    <p>{notification.message}</p>
                </div>
            ) : (
                <p>{notification.message}</p>
            )}
        </div>
    );
};
