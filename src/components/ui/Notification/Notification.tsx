import React, { useState, useEffect } from "react";
import styles from "./Notification.module.scss";

export type NotificationProps = {
    notification: {
        message: string;
        type: string;
    } | null;
};

export const useNotification = () => {
    const [notification, setNotification] = useState<
        NotificationProps["notification"] | null
    >(null);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (notification) {
            timer = setTimeout(() => {
                setNotification(null);
            }, 3000);
        }

        return () => clearTimeout(timer);
    }, [notification]);

    const showNotification = (message: string, type: string) => {
        setNotification({ message: message, type });
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
            <p>{notification.message}</p>
        </div>
    );
};
