"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import style from "./HeaderNavPanelClient.module.scss";

import HeaderNavPanelItem from "../HeaderNavPanelItem/HeaderNavPanelItem";
import HeaderNavPanelItemCar from "../HeaderNavPanelItemCar/HeaderNavPanelItemCar";
import { Icon2 } from "@src/components/icons/logos/Icon2";
import { useCompanyStore } from "@src/store/useCompanyStore";
import {
    FaWhatsapp,
    FaTelegramPlane,
    FaInstagram,
    FaGlobe,
    FaPhone,
} from "react-icons/fa";
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";

/* helpers */
function normalizeDigits(raw?: string | null): string | null {
    if (!raw) return null;
    const digits = raw.replace(/\D/g, "");
    return digits.length ? digits : null;
}
function formatPhoneDisplay(raw?: string | null): string | null {
    if (!raw) return null;
    let digits = raw.replace(/\D/g, "");
    if (!digits) return null;
    if (digits.length === 11 && digits.startsWith("8")) digits = `7${digits.slice(1)}`;
    if (digits.length === 11 && digits.startsWith("7")) {
        return `+7 ${digits.slice(1, 4)} ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
    }
    return `+${digits}`;
}
function buildTelHref(raw?: string | null): string | null {
    if (!raw) return null;
    let digits = raw.replace(/\D/g, "");
    if (!digits) return null;
    if (digits.length === 11 && digits.startsWith("8")) digits = `7${digits.slice(1)}`;
    if (!digits.startsWith("7")) return `tel:+${digits}`;
    return `tel:+${digits}`;
}
function buildWhatsappHref(raw?: string | null, text?: string): string | null {
    const d = normalizeDigits(raw);
    if (!d) return null;
    const base = `https://wa.me/${d}`;
    return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
function buildTelegramHref(raw?: string | null, text?: string): string | null {
    const h = (raw || "").trim().replace(/^@/, "");
    if (!h) return null;
    return text
        ? `https://t.me/${h}?text=${encodeURIComponent(text)}`
        : `https://t.me/${h}`;
}
function buildInstagramHref(raw?: string | null): string | null {
    const h = (raw || "").trim().replace(/^@/, "");
    return h ? `https://instagram.com/${h}` : null;
}
function ensureHttp(raw?: string | null): string | null {
    if (!raw) return null;
    if (/^https?:\/\//i.test(raw)) return raw;
    return `https://${raw}`;
}

interface HeaderNavPanelClientProps {
    isOpen: boolean;
    toggleNavPanel: () => void;
}

export const HeaderNavPanelClient = ({
    isOpen,
    toggleNavPanel,
}: HeaderNavPanelClientProps) => {
    const params = useParams();
    const brand = params.brand as string;
    const getBrandPath = (path: string) => `/client/${brand}${path}`;

    if (!isOpen) return null;

    const company = useCompanyStore(state => state.company);

    const phones = useMemo(() => {
        const list: Array<{ href: string; display: string; note?: string | null }> = [];
        const push = (raw?: { number?: string | null; label?: string | null }) => {
            if (!raw?.number) return;
            const display = formatPhoneDisplay(raw.number);
            const href = buildTelHref(raw.number);
            if (display && href) list.push({ href, display, note: raw.label ?? null });
        };
        push(company?.phone_1 || undefined);
        push(company?.phone_2 || undefined);
        if (company?.phone) {
            const display = formatPhoneDisplay(company.phone);
            const href = buildTelHref(company.phone);
            if (display && href) list.push({ href, display });
        }
        return list;
    }, [company?.phone_1, company?.phone_2, company?.phone]);

    const messageTemplate =
        "Здравствуйте! Хочу арендовать автомобиль. Подскажите, какие сейчас есть доступные варианты и условия?";

    const waHref = buildWhatsappHref(company?.whatsapp, messageTemplate);
    const tgHref = buildTelegramHref(company?.telegram, messageTemplate);
    const igHref = buildInstagramHref(company?.instagram);
    const siteHref = ensureHttp(company?.website);

    return (
        <div onClick={e => e.stopPropagation()} className={style.container}>
            <div className={style.headerNav}>
                {company?.company_avatar_url || company?.logo_urls?.[0]?.url ? (
                    <div className={style.companyInfo}>
                        <Image
                            src={
                                company?.company_avatar_url
                                    ? formatImageUrl(company.company_avatar_url)
                                    : formatImageUrl(company.logo_urls?.[0]?.url || "")
                            }
                            alt={company?.company_name || "Лого компании"}
                            width={48}
                            height={48}
                            className={style.companyLogo}
                        />
                        <span className={style.companyName}>
                            {company?.company_name || "Компания"}
                        </span>
                    </div>
                ) : (
                    <Icon2 className={style.logo} />
                )}

                <Image
                    className={style.closeIcon}
                    src="/images/closeMenuIcon.svg"
                    width={32}
                    height={32}
                    alt="Закрыть"
                    onClick={toggleNavPanel}
                />
            </div>

            <div className={style.navContainer}>
                <HeaderNavPanelItem.TextAndNumber
                    toggleNavPanel={toggleNavPanel}
                    number={company?.cars?.length ?? 0}
                    text={"Автопарк"}
                    path={getBrandPath("/")}
                />

                {/* <HeaderNavPanelItem.Text
                    toggleNavPanel={toggleNavPanel}
                    text={"Условия"}
                    path={getBrandPath("/terms")}
                /> */}

                <HeaderNavPanelItem.Text
                    toggleNavPanel={toggleNavPanel}
                    text={"Контакты"}
                    path={getBrandPath("/contact")}
                />

               
                <HeaderNavPanelItem.Text
                    toggleNavPanel={toggleNavPanel}
                    text={"О нас"}
                    path={getBrandPath("/about")}
                />
            </div>

            <div className={style.contacts}>
                <div className={style.contactsTitle}>Связаться</div>

                {phones.length > 0 && (
                    <div className={style.phoneList}>
                        {phones.map((p, i) => (
                            <div key={i} className={style.phoneItem}>
                                <span className={style.phoneIcon}>
                                    <FaPhone />
                                </span>
                                <div>
                                    <a href={p.href} className={style.phoneLink}>
                                        {p.display}
                                    </a>
                                    {p.note ? (
                                        <div className={style.phoneNote}>{p.note}</div>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {(waHref || tgHref || igHref || siteHref) && (
                    <>
                        <div className={style.messengersTitle}>Мессенджеры и соцсети</div>
                        <div className={style.messengers}>
                            {waHref && (
                                <a
                                    href={waHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${style.pill} ${style.wa}`}
                                    aria-label="Написать в WhatsApp"
                                    title="Написать в WhatsApp"
                                >
                                    <FaWhatsapp className={style.pillIcon} />
                                    WhatsApp
                                </a>
                            )}

                            {tgHref && (
                                <a
                                    href={tgHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${style.pill} ${style.tg}`}
                                    aria-label="Написать в Telegram"
                                    title="Написать в Telegram"
                                >
                                    <FaTelegramPlane className={style.pillIcon} />
                                    Telegram
                                </a>
                            )}

                            {igHref && (
                                <a
                                    href={igHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${style.pill} ${style.ig}`}
                                    aria-label="Открыть Instagram"
                                    title="Открыть Instagram"
                                >
                                    <FaInstagram className={style.pillIcon} />
                                    Instagram
                                </a>
                            )}

                            {siteHref && (
                                <a
                                    href={siteHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${style.pill} ${style.web}`}
                                    aria-label="Перейти на сайт"
                                    title="Перейти на сайт"
                                >
                                    <FaGlobe className={style.pillIcon} />
                                    Сайт
                                </a>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default HeaderNavPanelClient;
