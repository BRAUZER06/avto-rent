// app/about/page.tsx
import Link from "next/link";
import Script from "next/script";

export const revalidate = 60;

export async function generateMetadata() {
    const title = "О нас — RentAvtoKavkaz: платформа аренды авто в СКФО";
    const description =
        "RentAvtoKavkaz — платформа, которая объединяет компании и частных владельцев авто в СКФО. Без комиссий, с удобными инструментами, чёрным списком нарушителей и возможностью сдавать авто легально и безопасно.";
    const path = "/about";

    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            title,
            description,
            url: path,
            type: "website",
            locale: "ru_RU",
            // images: [{ url: "/og/about.jpg", width: 1200, height: 630, alt: title }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
        keywords:
            "аренда авто СКФО, прокат автомобилей Кавказ, аренда машин без комиссии, чёрный список арендаторов, RentAvtoKavkaz",
    };
}

const REGIONS: { key: string; name: string; flagSrc?: string }[] = [
    { key: "dagestan", name: "Дагестан", flagSrc: "/flags/dagestan.svg" },
    { key: "chechnya", name: "Чечня", flagSrc: "/flags/chechnya.svg" },
    { key: "ingushetia", name: "Ингушетия", flagSrc: "/flags/ingushetia.svg" },
    {
        key: "kabardino-balkaria",
        name: "Кабардино-Балкария",
        flagSrc: "/flags/kabardino-balkaria.svg",
    },
    {
        key: "karachay-cherkessia",
        name: "Карачаево-Черкесия",
        flagSrc: "/flags/karachay-cherkessia.svg",
    },
    {
        key: "north-ossetia",
        name: "Северная Осетия",
        flagSrc: "/flags/north-ossetia.svg",
    },
    { key: "stavropol", name: "Ставрополь", flagSrc: "/flags/stavropol.svg" },
];

function OrgJsonLd() {
    const org = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "RentAvtoKavkaz",
        url: "/",
        email: "rentavtokavkaz@gmail.com",
        sameAs: ["https://instagram.com/rent_avto_kavkaz"],
        areaServed: REGIONS.map(r => ({ "@type": "AdministrativeArea", name: r.name })),
    };

    const site = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "RentAvtoKavkaz",
        url: "/",
        potentialAction: {
            "@type": "SearchAction",
            target: "/avto?search={query}",
            "query-input": "required name=query",
        },
    };

    const service = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Платформа аренды автомобилей в СКФО",
        serviceType: "Car rental marketplace",
        provider: { "@type": "Organization", name: "RentAvtoKavkaz" },
        offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "RUB",
        },
    };

    return (
        <>
            <Script
                id="ld-org"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
            />
            <Script
                id="ld-site"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }}
            />
            <Script
                id="ld-service"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
            />
        </>
    );
}

export default async function AboutPage() {
    return (
        <main className="bg-[#111] text-white">
            <OrgJsonLd />

            {/* HERO */}
            <section className="px-4 pt-16 pb-10 bg-gradient-to-b from-[#0f1320] to-[#111]">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        RentAvtoKavkaz — единая платформа аренды автомобилей в СКФО
                    </h1>
                    <p className="mt-4 text-zinc-300 text-lg">
                        Мы объединяем <b>компании</b> и <b>владельцев</b> автомобилей,
                        чтобы аренда была прозрачной, удобной и безопасной. Без комиссий с
                        вашей сделки.
                    </p>

                    <div className="mt-6 flex gap-3 justify-center flex-wrap">
                        <Link href="/avto">
                            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 transition rounded-full font-semibold shadow-md shadow-blue-900/30">
                                Смотреть автомобили
                            </button>
                        </Link>
                        <Link href="/sdat">
                            <button className="px-6 py-3 rounded-full border border-gray-600 hover:bg-blue-800/30 transition">
                                Сдать свой автомобиль
                            </button>
                        </Link>
                    </div>

                    {/* <p className="mt-3 text-sm text-emerald-300">
                        Проверка арендаторов бесплатна
                    </p> */}
                </div>
            </section>

            {/* МИССИЯ / ИДЕЯ */}
            <section className="px-4 py-12">
                <div className="max-w-4xl mx-auto space-y-4">
                    <h2 className="text-2xl font-bold">
                        Почему и для чего мы это делаем
                    </h2>
                    <p className="text-zinc-300">
                        Идея RentAvtoKavkaz родилась из простой цели:
                        <b>
                            улучшить качество услуг в сфере аренды автомобилей в регионах
                            Северного Кавказа
                        </b>
                        и сделать рынок более живым. Мы хотим, чтобы люди
                        <b> чаще и смелее брали авто в аренду</b>, а компании получали
                        инструменты для честной и безопасной работы.
                    </p>
                    <p className="text-zinc-300">
                        Платформа выстраивает рынок аренды автомобилей заново — честно,
                        открыто и по правилам. Мы не делаем “как попало”. Мы строим
                        систему, которой доверяют компании и клиенты по всему Кавказу.
                        Команда RentAvtoKavkaz — это амбиции, структура и результат.
                    </p>
                </div>
            </section>

            {/* РЕГИОНЫ */}
            <section className="px-4 py-10 bg-[#151515]">
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-xl font-semibold mb-6">Работаем по всему СКФО</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {REGIONS.map(r => (
                            <li
                                key={r.key}
                                className="flex items-center gap-3 border border-zinc-700 rounded-lg p-3 bg-[#1a1a1a]"
                            >
                                <div className="w-8 h-8 rounded overflow-hidden bg-zinc-800 flex items-center justify-center">
                                    {/* флаги подключи как /public/flags/*.svg; если файла нет — покажем заглушку */}
                                    {r.flagSrc ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={r.flagSrc}
                                            alt={`Флаг: ${r.name}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-xs text-zinc-400">
                                            FLAG
                                        </span>
                                    )}
                                </div>
                                <span className="text-zinc-200">{r.name}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 text-sm text-zinc-400">
                        Хотите присоединиться как партнёр в вашем регионе?
                        <Link className="text-blue-400 underline" href="/sdat">
                            Узнайте условия
                        </Link>
                        .
                    </div>
                </div>
            </section>

            {/* ЧТО УМЕЕТ ПЛАТФОРМА */}
            <section className="px-4 py-12">
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-2xl font-bold mb-6">Возможности платформы</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            {
                                t: "Без комиссий",
                                d: "Сделки и оплата проходят напрямую между арендатором и владельцем.",
                            },
                            {
                                t: "Продвинутый поиск и фильтры",
                                d: "Категории, классы, цены, география — быстро находите нужное авто.",
                            },
                            {
                                t: "Чёрный список нарушителей",
                                d: (
                                    <>
                                        Инструмент для компаний: проверяйте людей перед
                                        выдачей авто и добавляйте проблемных. Просмотр и
                                        добавление доступны только&nbsp;
                                        <b>авторизованным и верифицированным</b>&nbsp;
                                        аккаунтам.
                                        <div className="mt-1 text-emerald-300 text-sm">
                                            Проверка бесплатна. Если человек попадёт в
                                            базу — <b>ему не сдадут авто</b> по всему СКФО
                                            и далее.
                                        </div>
                                    </>
                                ),
                                cta: (
                                    <div className="mt-3 flex gap-2">
                                        <Link href="/profile/blacklist">
                                            <button className="px-4 py-2 rounded-lg border border-zinc-700 hover:border-zinc-500">
                                                Запросить верификацию
                                            </button>
                                        </Link>
                                        <Link href="/cherny-spisok">
                                            <button className="px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700">
                                                Подробнее про чёрный список
                                            </button>
                                        </Link>
                                    </div>
                                ),
                            },
                            {
                                t: "Профили компаний и частных владельцев",
                                d: "Аватары, описание, контакты, логотипы — повышайте доверие и конверсию.",
                            },
                            {
                                t: "Удобство и скорость",
                                d: "Интерфейс без лишнего — карточки, фото, ключевые параметры, мобильная адаптация.",
                            },
                            {
                                t: "Рост спроса",
                                d: "Мы делаем рынок аренды понятнее и ближе к людям, чтобы авто снимали чаще.",
                            },
                        ].map((f, idx) => (
                            <div
                                key={idx}
                                className="border border-zinc-700 rounded-xl p-4 bg-[#1a1a1a]"
                            >
                                <h4 className="text-lg font-semibold">{f.t}</h4>
                                <p className="text-zinc-300 mt-2">{f.d as any}</p>
                                {"cta" in f && f.cta}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* КАК ЭТО РАБОТАЕТ */}
            <section className="px-4 py-12 bg-[#151515]">
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-2xl font-bold mb-6">Как это работает</h3>
                    <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            {
                                n: "1",
                                t: "Публикуете авто",
                                d: "Загружаете фото, указываете условия, цену и контакты.",
                            },
                            {
                                n: "2",
                                t: "Получаете заявки",
                                d: "Связь и оплата — напрямую. Мы не берём комиссию.",
                            },
                            {
                                n: "3",
                                t: "Контроль качества",
                                d: "Проверка арендаторов, чёрный список и репутация аккаунта.",
                            },
                        ].map(s => (
                            <li
                                key={s.n}
                                className="rounded-xl border border-zinc-700 p-4 bg-[#1c1c1c]"
                            >
                                <div className="text-3xl font-extrabold text-blue-400">
                                    {s.n}
                                </div>
                                <div className="mt-2 text-lg font-semibold">{s.t}</div>
                                <div className="mt-1 text-zinc-300">{s.d}</div>
                            </li>
                        ))}
                    </ol>
                    <div className="mt-6 flex gap-3 flex-wrap">
                        <Link href="/auth">
                            <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold">
                                Войти / Зарегистрироваться
                            </button>
                        </Link>
                        <Link href="/sdat">
                            <button className="px-5 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-500">
                                Сдать автомобиль
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* КОНТАКТЫ */}
            <section className="px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold mb-4">Контакты</h3>
                    <ul className="space-y-2 text-zinc-300">
                        <li>
                            Почта:
                            <a
                                className="text-blue-400 underline"
                                href="mailto:rentavtokavkaz@gmail.com"
                            >
                                rentavtokavkaz@gmail.com
                            </a>
                        </li>
                        <li>
                            Instagram:
                            <a
                                className="text-blue-400 underline"
                                href="https://instagram.com/rent_avto_kavkaz"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                @rent_avto_kavkaz
                            </a>
                        </li>
                        <li>
                            Телефон / WhatsApp:
                            <a
                                className="text-blue-400 underline"
                                href="tel:+79280908527"
                            >
                                +7 (928) 090-85-27
                            </a>
                        </li>
                    </ul>
                </div>
            </section>

            {/* ВНУТРЕННЯЯ ПЕРЕЛИНКОВКА */}
            <section className="px-4 pb-16">
                <div className="max-w-4xl mx-auto text-sm text-zinc-400">
                    Полезные ссылки:
                    <Link href="/avto/all" className="text-blue-400 underline">
                        список авто
                    </Link>
                    ·
                    <Link href="/sdat" className="text-blue-400 underline">
                        условия сдачи
                    </Link>
                    ·
                    <Link href="/cherny-spisok" className="text-blue-400 underline">
                        чёрный список
                    </Link>
                    .
                </div>
            </section>
        </main>
    );
}
