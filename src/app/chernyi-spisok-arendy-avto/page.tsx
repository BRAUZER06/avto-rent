// src/app/chernyi-spisok-arendy-avto/page.tsx
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

export const revalidate = 3600; // ISR: 1 час

// ====== конфиг сайта (можешь заменить на свои значения) ======
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "rent-auto";
const PATH = "/chernyi-spisok-arendy-avto";
const CANONICAL = `${SITE_URL}${PATH}`;
const OG_IMAGE = `${SITE_URL}/og/blacklist.jpg`;

// утилита как у тебя
function absolutize(url?: string | null) {
    if (!url) return undefined;
    if (url.startsWith("http")) return url;
    const media = process.env.NEXT_PUBLIC_MEDIA_URL || "";
    return media ? `${media}${url}` : url;
}

// ====== SEO meta ======
const TITLE = "Чёрный список арендаторов авто — проверить арендатора | rent-auto";
const DESCRIPTION =
    "Чёрный список арендаторов автомобилей: что это, как работает и чем полезен. Поиск доступен зарегистрированным компаниям и частным арендодателям. Проверка по ФИО, году рождения или номеру ВУ.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: CANONICAL },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: CANONICAL,
        type: "website",
        siteName: SITE_NAME,
        locale: "ru_RU",
        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt: "Чёрный список арендаторов авто",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        images: [OG_IMAGE],
    },
};

// ====== страница ======
export default function Page() {
    return (
        <>
            {/* JSON-LD */}
            <FaqJsonLd />
            <BreadcrumbsJsonLd />
            <OrgJsonLd />
            <HowToJsonLd />

            <main className="max-w-5xl mx-auto px-4 py-10 text-zinc-100">
                {/* Hero */}
                <section className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                        Чёрный список арендаторов авто — проверка надёжности перед выдачей
                        машины
                    </h1>
                    <p className="mt-4 text-zinc-300">
                        {SITE_NAME} помогает компаниям и частным арендодателям снизить
                        риски: перед тем как передать автомобиль, проверьте, не находится
                        ли человек в чёрном списке. Поиск доступен только
                        зарегистрированным пользователям — так мы защищаем персональные
                        данные и сохраняем качество базы.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href="/auth"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold"
                            aria-label="Зарегистрироваться и получить доступ к проверке арендаторов"
                        >
                            Зарегистрироваться и получить доступ
                        </Link>
                        <Link
                            href="/profile/blacklist"
                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold"
                            aria-label="Перейти к проверке в чёрном списке"
                        >
                            Уже есть аккаунт — перейти к проверке
                        </Link>
                    </div>
                </section>

                {/* Почему важно */}
                <section className="mb-14">
                    <h2 className="text-2xl font-extrabold mb-3">
                        Почему проверка по чёрному списку важна
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                h: "Меньше рисков и убытков",
                                p: "Один запрос перед выдачей авто помогает вовремя остановить проблемного клиента и избежать неуплаты, споров и простоя.",
                            },
                            {
                                h: "Общая база доверенных компаний",
                                p: "Информацию добавляют реальные арендодатели — и компании, и частные лица. База растёт и улучшается.",
                            },
                            {
                                h: "Просто и быстро",
                                p: "Ввод в одном поле — ФИО, год рождения или номер ВУ. Система распознаёт тип запроса автоматически.",
                            },
                        ].map((c, i) => (
                            <article
                                key={i}
                                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
                            >
                                <h3 className="text-lg font-bold mb-2">{c.h}</h3>
                                <p className="text-zinc-300">{c.p}</p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Как это работает */}
                <section className="mb-12">
                    <h2 className="text-2xl font-extrabold mb-3">Как это работает</h2>
                    <ol className="list-decimal pl-5 space-y-2 text-zinc-300">
                        <li>
                            Зарегистрируйтесь как компания или частный арендодатель и
                            подтвердите контакты.
                        </li>
                        <li>
                            После модерации получите доступ к разделу «Чёрный список».
                        </li>
                        <li>
                            Введите ФИО <i>или</i> год рождения <i>или</i> номер ВУ —
                            достаточно одного параметра.
                        </li>
                        <li>
                            Изучите совпадения и причины попадания. При необходимости
                            добавьте свою запись о нарушителе.
                        </li>
                    </ol>
                    <p className="mt-3 text-sm text-zinc-400">
                        Внимание: доступ к персональным данным ограничен и предоставляется
                        только действующим арендодателям в целях оценки риска.
                    </p>
                </section>

                {/* Сценарии использования */}
                <section className="mb-12">
                    <h2 className="text-2xl font-extrabold mb-3">
                        Типовые сценарии использования
                    </h2>
                    <div className="space-y-4 text-zinc-300">
                        <div>
                            <h3 className="font-semibold">Короткая аренда (1–3 дня)</h3>
                            <p>
                                Быстрая проверка по ФИО или ВУ помогает отсеять
                                рискованных клиентов, часто меняющих прокат.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Долгосрочная аренда</h3>
                            <p>
                                При длительных договорах важно убедиться, что человек не
                                нарушал условия ранее: неуплата, просрочки, спорные
                                возвраты.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Высокая залоговая сумма</h3>
                            <p>
                                Если залог большой, любой спор обходится дорого. Один
                                поиск — и вы понимаете, стоит ли продолжать.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Цифры/факты (можешь скорректировать под реальные) */}
                <section className="mb-12">
                    <h2 className="text-2xl font-extrabold mb-3">Цифры и факты</h2>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {[
                            { n: "5+", d: "регионов Кавказа уже подключены" },
                            { n: "1000+", d: "проверок в месяц" },
                            { n: "70%", d: "споров удаётся предотвратить" },
                        ].map((x, i) => (
                            <div
                                key={i}
                                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-center"
                            >
                                <div className="text-3xl font-extrabold">{x.n}</div>
                                <div className="text-zinc-300 mt-1">{x.d}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Правила и ответственность */}
                <section className="mb-12">
                    <h2 className="text-2xl font-extrabold mb-3">
                        Правомерность и защита данных
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                        <li>
                            Доступ к поиску получают только подтверждённые арендодатели
                            после регистрации и модерации.
                        </li>
                        <li>
                            Храним минимум персональных данных и используем нормализацию
                            идентификаторов (анти-дубли по ВУ).
                        </li>
                        <li>
                            Запись может быть оспорена: на время спора помечается до
                            решения модераторов.
                        </li>
                        <li>
                            Все действия логируются: видны автор записи (компания/аккаунт)
                            и время добавления.
                        </li>
                    </ul>
                </section>

                {/* FAQ (расширенный) */}
                <section className="mb-16">
                    <h2 className="text-2xl font-extrabold mb-3">Частые вопросы</h2>
                    <div className="space-y-4">
                        <Faq q="Нужно ли указывать все поля (ФИО, ВУ, год) для проверки?">
                            Нет. Достаточно одного параметра — ФИО <i>или</i> год рождения{" "}
                            <i>или</i> номер ВУ. Система распознаёт тип запроса
                            автоматически.
                        </Faq>
                        <Faq q="Кто может видеть мои добавленные записи?">
                            Другие подтверждённые арендодатели. Гости без регистрации не
                            имеют доступа к результатам поиска.
                        </Faq>
                        <Faq q="Что будет, если клиент оспорит запись?">
                            Она пометится как спорная. Мы запросим документы у обеих
                            сторон и примем решение. До этого момента запись ограниченно
                            участвует в поиске.
                        </Faq>
                        <Faq q="Можно ли удалить запись?">
                            Вы можете удалить запись, которую добавили сами. Для этого
                            откройте «Профиль → Чёрный список → Мой список».
                        </Faq>
                    </div>
                </section>

                {/* CTA + перелинковка */}
                <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                    <h2 className="text-2xl font-extrabold mb-2">
                        Подключитесь и проверяйте арендаторов безопаснее
                    </h2>
                    <p className="text-zinc-300 mb-4">
                        Создайте аккаунт, пройдите короткую модерацию и получите доступ к
                        чёрному списку.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/auth"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold"
                        >
                            Создать аккаунт
                        </Link>
                        <Link
                            href="/profile/blacklist"
                            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold"
                        >
                            Войти и проверять
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}

// ====== Примитивный FAQ блок (серверный) ======
function Faq({ q, children }: { q: string; children: React.ReactNode }) {
    return (
        <div className="rounded-lg border border-zinc-800 p-4 bg-zinc-900">
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-zinc-300">{children}</p>
        </div>
    );
}

// ====== JSON-LD ======
function FaqJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Что такое чёрный список арендаторов авто?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Это база проблемных клиентов, которых компании и частные лица добавляют за неуплату, умышленный ущерб, поддельные данные и другие серьёзные нарушения условий аренды.",
                },
            },
            {
                "@type": "Question",
                name: "Кто может проверить человека в чёрном списке?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Проверка доступна только зарегистрированным пользователям: компаниям проката и честным частным лицам, сдающим авто. Гости видят только информацию о сервисе.",
                },
            },
            {
                "@type": "Question",
                name: "Как зарегистрироваться и получить доступ к проверке?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Создайте аккаунт, подтвердите email и заполните профиль арендодателя. После модерации станет доступен поиск по чёрному списку.",
                },
            },
            {
                "@type": "Question",
                name: "Какие данные используются для проверки?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Имя, фамилия, год рождения и серия+номер водительского удостоверения. Мы используем нормализацию, чтобы снизить риск ошибок и дублей.",
                },
            },
            {
                "@type": "Question",
                name: "Можно ли оспорить запись?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Да. Пользователь может отправить запрос на пересмотр. Запись будет помечена как спорная до проверки документов модераторами.",
                },
            },
            {
                "@type": "Question",
                name: "Подходит ли сервис для частных лиц?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Да. Частные арендодатели после регистрации также получают доступ к проверке арендаторов.",
                },
            },
        ],
    };
    return (
        <Script
            id="ld-faq-blacklist"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

function BreadcrumbsJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
            {
                "@type": "ListItem",
                position: 2,
                name: "Чёрный список арендаторов авто",
                item: CANONICAL,
            },
        ],
    };
    return (
        <Script
            id="ld-breadcrumbs-blacklist"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

function OrgJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: absolutize("/logo.png"),
    };
    return (
        <Script
            id="ld-org-blacklist"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

function HowToJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Как проверить арендатора по чёрному списку",
        description: "Пошаговая инструкция проверки арендатора перед выдачей автомобиля.",
        step: [
            {
                "@type": "HowToStep",
                name: "Зарегистрируйтесь",
                text: "Создайте аккаунт арендодателя и подтвердите контакты.",
            },
            {
                "@type": "HowToStep",
                name: "Откройте раздел «Чёрный список»",
                text: "Перейдите в профиль → Чёрный список.",
            },
            {
                "@type": "HowToStep",
                name: "Введите данные",
                text: "Укажите ФИО или год рождения, или номер ВУ — достаточно одного параметра.",
            },
            {
                "@type": "HowToStep",
                name: "Изучите результаты",
                text: "Посмотрите совпадения и причины добавления при их наличии.",
            },
        ],
    };
    return (
        <Script
            id="ld-howto-blacklist"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
