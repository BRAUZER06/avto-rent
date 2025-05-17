"use client";

import { useState } from "react";
import Image from "next/image";
import { WysiwygRenderer } from "@lib/helpers/WysiwygRenderer";
import { Modal } from "../ui/Modal/Modal";
import styles from "./LecturesBlock.module.scss";
import { mediaUrlHelper } from "@src/lib/helpers/getApiUrl";

export const LecturesBlock = ({ data }: { data: any }) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    const handleImageClick = () => {
        setModalOpen(true);
    };

    const baseUrl = mediaUrlHelper();
    return (
        <div className={styles.lectures}>
            <h2 id="lectures" className={styles.lecturesTitle}>
                Доклады
            </h2>
            <ul className={styles.lecturesList}>
                {data.map((item: any) => (
                    <li key={item.title} className={styles.lecturesListItem}>
                        <div
                            onClick={handleImageClick}
                            className={styles.lecturesListItemVideo}
                        >
                            <Image
                                className={styles.lecturesListItemImage}
                                src={`${baseUrl}${item.preview?.url}`}
                                width={725}
                                height={392}
                                alt={item.title}
                            />
                        </div>
                        <div className={styles.lecturesListItemDescription}>
                            <h3 className={styles.lecturesListItemTitle}>{item.title}</h3>
                            <div className={styles.lecturesListItemText}>
                                {item.description}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <Modal isVisible={isModalOpen} onClose={() => setModalOpen(false)}>
                <iframe
                    className={styles.iframeStyle}
                    src="https://www.youtube.com/embed/vYwlHZVNEDU"
                    // @ts-ignore
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </Modal>
        </div>
    );
};
