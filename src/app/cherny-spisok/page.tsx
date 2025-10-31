// app/cherny-spisok/page.tsx
import Link from "next/link";
import Script from "next/script";

// ===== Настройки ISR =====
export const revalidate = 30;

// ===== Регионы (упорядоченные) =====
// Файлы флагов положи в /public/flags/<slug>.svg
const REGIONS = [
    { slug: "dagestan", name: "Дагестан" },
    { slug: "chechnya", name: "Чечня" },
    { slug: "ingushetia", name: "Ингушетия" },
    { slug: "kabardino-balkaria", name: "Кабардино-Балкария" },
    { slug: "karachay-cherkessia", name: "Карачаево-Черкесия" },
    { slug: "north-ossetia", name: "Северная Осетия" },
    { slug: "stavropol", name: "Ставропольский край" },
];

// ===== SEO =====
export async function generateMetadata() {
    const title = "Чёрный список арендаторов — защита владельцев и компаний";
    const description =
        "Закрытая база людей, которые не заплатили, “кинули” с оплатой, повредили автомобиль и не компенсировали ущерб. Доступ только зарегистрированным и верифицированным компаниям. Проверка бесплатна.";
    const path = "/cherny-spisok";

    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: { title, description, url: path, type: "website", locale: "ru_RU" },
        twitter: { card: "summary_large_image", title, description },
    };
}

// ===== JSON-LD =====
function SeoJsonLd() {
    const webPageLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Чёрный список арендаторов",
        url: "/cherny-spisok",
        isAccessibleForFree: false,
        about: REGIONS.map(r => ({ "@type": "AdministrativeArea", name: r.name })),
    };

    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Кто имеет доступ к чёрному списку?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Только зарегистрированные и верифицированные компании по аренде. Чтобы пройти верификацию, напишите на rentavtokavkaz@gmail.com. Это бесплатно.",
                },
            },
            {
                "@type": "Question",
                name: "Кто попадает в чёрный список?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Люди, которые не заплатили за аренду (“кинули” с оплатой), повредили автомобиль и не компенсировали ущерб, предоставили поддельные данные или систематически нарушали условия договора — при наличии подтверждений.",
                },
            },
            {
                "@type": "Question",
                name: "Что происходит, если человек попал в базу?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Компании по всему СКФО (и за его пределами) видят его в базе и не сдают ему автомобили. Это снижает риски и защищает автопарки.",
                },
            },
            {
                "@type": "Question",
                name: "Сколько стоит проверка?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Проверка и верификация компании бесплатны. Никаких скрытых платежей.",
                },
            },
        ],
    };

    return (
        <>
            <Script
                id="ld-blacklist-webpage"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
            />
            <Script
                id="ld-blacklist-faq"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />
        </>
    );
}

// ===== Auth-заглушки =====
async function getCurrentAccount() {
    return null;
}
function isVerifiedCompany(acc: any): boolean {
    return Boolean(acc?.type === "company" && acc?.verified === true);
}

// ===== Виджеты =====
function BigWarningBadge() {
    return (
        <div className="mx-auto max-w-5xl mt-6">
            <div className="relative rounded-2xl border border-red-500/40 bg-gradient-to-r from-[#2a0d0f] via-[#140b0e] to-[#0c0b10] p-[2px]">
                <div className="rounded-2xl bg-[#110f12] px-5 py-4">
                    <p className="text-center leading-snug">
                        <span className="inline-block align-middle text-base md:text-lg font-semibold text-red-400 tracking-wide">
                            ВНИМАНИЕ:
                        </span>{" "}
                        <span className="inline-block align-middle text-sm md:text-base text-gray-200">
                            Если человек попал в эту базу,{" "}
                            <span className="font-semibold text-white">
                                ему не сдадут автомобиль по всему СКФО — и не только
                            </span>
                            . Компании видят такие записи и отказывают в выдаче.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

function FreeCheckBadge() {
    return (
        <div className="mx-auto max-w-4xl">
            <div className="rounded-xl bg-emerald-900/20 border border-emerald-600/40 px-4 py-3 text-center">
                <span className="font-semibold text-emerald-300">
                    Проверка — бесплатно.
                </span>{" "}
                Верификация компании и доступ к базе не требуют ни копейки.
            </div>
        </div>
    );
}

// ===== Основная страница =====
export default async function BlacklistPage() {
    const account = await getCurrentAccount();
    const canAccess = isVerifiedCompany(account);

    return (
        <main className="bg-[#0b0c0f] text-white">
            <SeoJsonLd />

            {/* HERO */}
            <section className="bg-gradient-to-b from-[#0b0c0f] to-[#0b1933] py-16 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                    Чёрный список арендаторов
                </h1>
                <p className="text-gray-200/90 max-w-3xl mx-auto text-lg md:text-xl">
                    Закрытая база людей, которые{" "}
                    <span className="font-semibold text-white">
                        не заплатили, “кинули” с оплатой, повредили автомобиль и не
                        компенсировали ущерб
                    </span>
                    . Доступна только зарегистрированным и верифицированным компаниям.
                </p>
                <BigWarningBadge />
                <div className="mt-6 flex gap-3 justify-center flex-wrap">
                    <Link href="/auth">
                        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 transition rounded-full font-semibold shadow-md shadow-blue-900/30">
                            Войти / Зарегистрироваться
                        </button>
                    </Link>
                    <a
                        className="px-6 py-3 rounded-full border border-gray-600 hover:bg-blue-800/40 transition"
                        href="/profile/blacklist"
                    >
                        Запросить верификацию (бесплатно)
                    </a>
                </div>
                <div className="mt-4">
                    <FreeCheckBadge />
                </div>
            </section>

            {/* Преимущества */}
            <section className="py-14 px-4 bg-[#121318]">
                <h2 className="text-3xl font-bold text-center mb-10">
                    Почему это выгодно компаниям
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                        {
                            title: "Меньше проблемных выдач",
                            desc: "Отсеивайте риск ещё на этапе заявки: проверка фамилии и данных по единой базе.",
                        },
                        {
                            title: "Сетевой эффект защиты",
                            desc: "Если кто-то испортил машину в одном городе, его увидят партнёры по всему СКФО и дальше.",
                        },
                        {
                            title: "Простые правила, нулевая стоимость",
                            desc: "Верификация и проверка бесплатны. Никаких скрытых платежей или подписок.",
                        },
                    ].map((x, i) => (
                        <div
                            key={i}
                            className="bg-[#171922] p-6 rounded-2xl border border-[#24283a] hover:border-[#3b3f56] transition"
                        >
                            <h3 className="text-xl font-semibold mb-2">{x.title}</h3>
                            <p className="text-sm text-gray-300">{x.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Регионы — с флагами */}
            <section className="py-12 px-4">
                <h2 className="text-2xl font-bold text-center mb-3">Покрытие регионов</h2>
                <p className="text-gray-400 text-center max-w-3xl mx-auto mb-8">
                    База охватывает регионы Северного Кавказа и расширяется на другие
                    субъекты России. Все участники сети видят одну и ту же историю
                    нарушений.
                </p>
                <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                    {REGIONS.map(r => (
                        <div
                            key={r.slug}
                            className="group bg-[#13151b] p-4 rounded-2xl border border-[#222636] hover:border-[#3b4260] transition"
                            title={r.name}
                        >
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-14 h-14 rounded-full overflow-hidden border border-[#313753]">
                                    <img
                                        src={`/flags/${r.slug}.svg`}
                                        alt={r.name}
                                        className="w-full h-full object-cover"
                                        
                                    />
                                </div>
                                <div className="text-sm text-gray-200 text-center">
                                    {r.name}
                                </div>
                                <div className="text-[10px] uppercase tracking-wider text-gray-500">
                                    доступ только компаниям
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Доступ / Загрузка */}
            {!canAccess ? (
                <section className="py-16 px-4 text-center">
                    <div className="max-w-2xl mx-auto p-8 rounded-2xl border border-[#24283a] bg-[#14161a]">
                        <div className="text-5xl mb-3">🔒</div>
                        <h3 className="text-2xl font-semibold mb-2">
                            Доступ только для компаний
                        </h3>
                        <p className="text-gray-300">
                            Просмотр и добавление записей доступны только
                            зарегистрированным и{" "}
                            <span className="font-semibold">
                                верифицированным компаниям
                            </span>
                            . Публично мы не показываем данные нарушителей.
                        </p>
                        <div className="mt-6 flex gap-3 justify-center">
                            <Link href="/auth">
                                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 transition rounded-full font-semibold">
                                    Войти
                                </button>
                            </Link>
                            <a
                                className="px-6 py-3 rounded-full border border-gray-600 hover:bg-blue-800/40 transition"
                                href="/profile/blacklist"
                            >
                                Запросить верификацию (бесплатно)
                            </a>
                        </div>
                        <div className="mt-8 text-left text-sm text-gray-400">
                            После верификации вы сможете:
                            <ul className="list-disc ml-5 mt-2 space-y-1">
                                <li>проверять заявки по общей базе;</li>
                                <li>добавлять нарушителей с доказательствами;</li>
                                <li>
                                    видеть статусы и подтверждения от других компаний;
                                </li>
                                <li>защищать парк от повторных инцидентов.</li>
                            </ul>
                        </div>
                    </div>
                </section>
            ) : (
                <CompanyArea />
            )}
        </main>
    );
}

// ===== Зона компаний (для верифицированных) =====
async function CompanyArea() {
    return (
        <section className="py-12 px-4 bg-[#0f1117] border-t border-[#1b1d2a]">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
                    <div>
                        <h2 className="text-2xl font-bold">Зона компаний</h2>
                        <p className="text-gray-300 text-sm">
                            Просмотр и добавление записей чёрного списка. Все действия
                            фиксируются.
                        </p>
                    </div>
                </div>
                {/* остальная часть CompanyArea из предыдущей версии */}
            </div>
        </section>
    );
}
