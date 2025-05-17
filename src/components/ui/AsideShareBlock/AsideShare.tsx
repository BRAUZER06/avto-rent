"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./AsideShare.module.scss";
import { Notification, useNotification } from "../Notification/Notification";

export const AsideShare = () => {
    const [shareUrl, setShareUrl] = useState("");
    const shareText = encodeURIComponent("Поделиться");
    const { notification, showNotification } = useNotification();

    useEffect(() => {
        setShareUrl(encodeURIComponent(window.location.href));
    }, []);

    const copyLinkToClipboard = () => {
        navigator.clipboard
            .writeText(window.location.href)
            .then(() => {
                showNotification("Ссылка скопирована", "success");
            })
            .catch(err => {
                showNotification("Ошибка", "error");
            });
    };
    return (
        <div className={styles.asideShare}>
            <p className={styles.shareText}>Поделиться вакансией</p>
            <div className={styles.shareIcons}>
                <div className={styles.shareBackground}>
                    <Link
                        href={`https://telegram.me/share/url?url=${shareUrl}&text=${shareText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="/images/telegShare.svg"
                            width={32}
                            height={32}
                            alt="Telegram"
                        />
                    </Link>
                    <Link
                        href={`https://vk.com/share.php?url=${shareUrl}&title=${shareText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="/images/vkShare.svg"
                            width={32}
                            height={32}
                            alt="VK"
                        />
                    </Link>
                    <Link
                        href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="/images/whatsShare.svg"
                            width={32}
                            height={32}
                            alt="WhatsApp"
                        />
                    </Link>
                    <div onClick={copyLinkToClipboard}>
                        <Image
                            src="/images/copyLinkShare.svg"
                            width={32}
                            height={32}
                            alt="Copy Link"
                        />
                    </div>
                </div>
            </div>
            <Notification notification={notification} />
        </div>
    );
};
