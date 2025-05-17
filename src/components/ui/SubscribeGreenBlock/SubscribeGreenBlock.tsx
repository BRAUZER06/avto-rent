"use client";

import styles from "./SubscribeGreenBlock.module.scss";
import {
    TgIcon,
    HubrIcon,
    VkIcon,
    YoutubeIcon,
    KodurrovaIcon,
} from "@public/images/icons";

export const SubscribeGreenBlock = () => {
    return (
        <div className={styles.shareIcons}>
            <div className={styles.shareBackground}>
                {/* Ссылка Telegram */}
                <a
                    href={`https://telegram.me/s/x5_tech?before=1293`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <TgIcon className={styles.iconTg} />
                </a>
                <div className={styles.transitionBackground}></div>

                {/* Ссылка Hubr */}
                <a
                    href={`https://career.habr.com/companies/x5tech`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <HubrIcon className={styles.iconHubr} />
                </a>

                {/* Ссылка YouTube */}
                <a
                    href={`https://www.youtube.com/c/X5Technology`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <YoutubeIcon className={styles.iconYT} />
                </a>

                {/* Ссылка KodDurova */}
                <a
                    href={`https://kod.ru/author/x5`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <KodurrovaIcon className={styles.iconCodeDurovv} />
                </a>

                {/* Ссылка VK */}
                <a
                    href={`https://m.vk.com/x5tech?offset=10&own=1`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <VkIcon className={styles.iconVk} />
                </a>
            </div>
        </div>
    );
};
