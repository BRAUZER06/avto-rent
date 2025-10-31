// app/[[region]]/sdat/page.tsx
import Link from "next/link";
import Script from "next/script";
import { redirect } from "next/navigation";
import { regionsFull } from "@src/data/regions";

// --- Настройки ISR (обновление метаданных/OG раз в N сек) ---
export const revalidate = 20;

// Валидные регионы из справочника
const VALID_REGIONS = new Set(
    regionsFull.filter(r => r.name && r.name.trim() !== "").map(r => r.name)
);

// Для SSG: страницы без региона и с каждым регионом
export async function generateStaticParams() {
    const withRegion = regionsFull
        .map(r => r.name)
        .filter(Boolean)
        .map(region => ({ region }));
    return [{}, ...withRegion]; // {} — маршрут без региона: /sdat
}

// Названия регионов (И.п.) и формы «в …» (П.п.)
const REGION_RU: Record<string, string> = {
    ingushetia: "Ингушетия",
    chechnya: "Чечня",
    dagestan: "Дагестан",
    "north-ossetia": "Северная Осетия",
    "kabardino-balkaria": "Кабардино-Балкария",
    "karachay-cherkessia": "Карачаево-Черкесия",
    stavropol: "Ставрополь",
};
const REGION_PREP: Record<string, string> = {
    ingushetia: "Ингушетии",
    chechnya: "Чечне",
    dagestan: "Дагестане",
    "north-ossetia": "Северной Осетии",
    "kabardino-balkaria": "Кабардино-Балкарии",
    "karachay-cherkessia": "Карачаево-Черкесии",
    stavropol: "Ставрополье",
};

// Динамические метаданные (title, description, og, canonical)
export async function generateMetadata({
    params,
    searchParams,
}: {
    params: { region?: string };
    searchParams: Record<string, string | string[] | undefined>;
}) {
    const region = params?.region;
    const hasSearch = Boolean(
        Object.keys(searchParams || {}).length && (searchParams as any).search
    );

    let title = "Сдать машину в аренду — условия, доход и преимущества";
    let description =
        "Сдавайте автомобиль в аренду и зарабатывайте от 35 000 ₽ в месяц. Простой процесс, поддержка, индивидуальные условия и защита.";
    let path = "/sdat";

    if (region) {
        if (!VALID_REGIONS.has(region)) {
            // если прилетел неизвестный регион — канонизируем на общую
            return {
                title,
                description,
                alternates: { canonical: "/sdat" },
                robots: hasSearch ? { index: false, follow: true } : undefined,
                openGraph: {
                    title,
                    description,
                    url: "/sdat",
                    type: "website",
                    locale: "ru_RU",
                },
            };
        }
        const rPrep = REGION_PREP[region] ?? region;
        const rNom = REGION_RU[region] ?? region;
        title = `Сдать авто в аренду в ${rNom} — условия и доход`;
        description = `Разместите автомобиль и сдавайте его в ${rPrep}: от 35 000 ₽ в месяц, понятные условия, проверка арендаторов и поддержка.`;
        path = `/${region}/sdat`;
    }

    return {
        title,
        description,
        keywords:
            "сдать машину в аренду, сдать авто в аренду, сдача авто частнику, пассивный доход, аренда авто платформа, чёрный список арендаторов",
        alternates: { canonical: path },
        robots: hasSearch ? { index: false, follow: true } : undefined,
        openGraph: {
            title,
            description,
            url: path,
            type: "website",
            locale: "ru_RU",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

// JSON-LD: Услуга «Сдать авто», FAQ, Хлебные крошки
function SeoJsonLd({ region }: { region?: string }) {
    const path = region ? `/${region}/sdat` : "/sdat";
    const rPrep = region ? REGION_PREP[region] ?? region : undefined;
    const rNom = region ? REGION_RU[region] ?? region : undefined;

    const serviceLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Сдать автомобиль в аренду",
        serviceType: "Car rental listing",
        url: path,
        areaServed: rNom ? [{ "@type": "AdministrativeArea", name: rNom }] : undefined,
        provider: {
            "@type": "Organization",
            name: "RentAvtoKavkaz",
            url: "/",
        },
        offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "RUB",
        },
    };

    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Сколько можно заработать, сдавая авто в аренду?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "В среднем от 35 000 до 80 000 ₽ в месяц — зависит от класса авто, состояния и спроса в регионе.",
                },
            },
            {
                "@type": "Question",
                name: "Как происходит проверка арендаторов?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Мы используем ручную и автоматическую проверку с учётом истории, документов и риска использования в такси.",
                },
            },
            {
                "@type": "Question",
                name: "Можно ли сдавать авто в такси?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Нет, коммерческие перевозки и работа в такси запрещены правилами площадки.",
                },
            },
            {
                "@type": "Question",
                name: "Какие условия я могу задавать сам?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Вы сами определяете тарифы, депозит, пробег, условия передачи и возврата, а также можете отклонять заявки.",
                },
            },
            // ✚ Вопрос про чёрный список
            {
                "@type": "Question",
                name: "Есть ли у вас чёрный список арендаторов?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Да. Проверка по чёрному списку бесплатна. Просмотр и добавление доступно только авторизованным и верифицированным аккаунтам. Подробнее — на странице /blacklist.",
                },
            },
        ],
    };

    const crumbs = [
        { "@type": "ListItem", position: 1, name: "Главная", item: "/" },
        region
            ? {
                  "@type": "ListItem",
                  position: 2,
                  name: `Сдать авто (${rNom})`,
                  item: path,
              }
            : { "@type": "ListItem", position: 2, name: "Сдать авто", item: path },
    ].filter(Boolean);

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs,
    };

    return (
        <>
            <Script
                id="ld-service-sdat"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
            />
            <Script
                id="ld-faq-sdat"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />
            <Script
                id="ld-breadcrumbs-sdat"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
        </>
    );
}

export default function CarRentalPage({ params }: { params: { region?: string } }) {
    const region = params?.region;

    // Если передан невалидный регион — редиректим на общую /sdat
    if (region && !VALID_REGIONS.has(region)) {
        redirect("/sdat");
    }

    const rPrep = region ? REGION_PREP[region] ?? region : null; // «в Ингушетии»
    const cityText = rPrep ? `в ${rPrep}` : "в вашем городе";

    return (
        <main className="bg-[#191919] text-white">
            <SeoJsonLd region={region} />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#191919] to-blue-950 py-16 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Сдавайте свою машину в аренду{" "}
                    <span className="text-blue-400">{cityText}</span>
                </h1>
                <p className="text-2xl text-blue-300 font-semibold mb-6">
                    и зарабатывайте от <span className="text-3xl">35 000 ₽/мес.</span>
                </p>
                <p className="text-gray-300 mb-6">
                    Занимайтесь личными делами, пока{" "}
                    <span className="font-semibold">
                        ваш автомобиль зарабатывает деньги
                    </span>
                </p>

                <div className="flex items-center justify-center gap-3 flex-wrap">
                    {/* ЯВНЫЙ CTA → /profile */}
                    <Link href="/profile" aria-label="Сдать свой автомобиль">
                        <button
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 transition rounded-full text-lg font-semibold shadow-md shadow-blue-900/30"
                            title="Перейти в профиль, чтобы сдать авто"
                        >
                            Сдать свой автомобиль
                        </button>
                    </Link>

                    {/* Вторичный CTA → к доходам */}
                    <a
                        href="#earnings"
                        className="px-6 py-3 rounded-full border border-gray-600 hover:bg-blue-800/30 transition text-lg"
                    >
                        Узнать про доход
                    </a>
                </div>

                {/* ✚ Короткий блок про чёрный список */}
                {/* <div className="mt-6 flex items-center justify-center gap-3 text-sm">
                    <span className="text-emerald-300">
                        Проверка арендаторов — бесплатно.
                    </span>
                    <Link href="/cherny-spisok" className="text-blue-300 underline">
                        Что такое чёрный список?
                    </Link>
                    <span className="text-zinc-500">•</span>
                    <Link href="/profile/blacklist" className="text-blue-300 underline">
                        Запросить верификацию для доступа
                    </Link>
                </div> */}
            </section>

            {/* Earnings Section */}
            <section id="earnings" className="py-16 px-4 text-center">
                <h2 className="text-3xl font-bold mb-12">
                    Сколько вы заработаете {rPrep ? `в ${rPrep}` : ""}?
                </h2>

                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    {["Средний класс", "Отечественные", "Премиум"].map(type => (
                        <button
                            key={type}
                            className="px-6 py-2 rounded-full border border-gray-600 hover:bg-blue-800 text-white"
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {/* Средний класс */}
                <h3 className="text-2xl font-semibold mb-6 text-left">Средний класс</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <CardEarning
                        model="Toyota Camry"
                        year="2020"
                        month="65 000 ₽"
                        yearTotal="780 000 ₽"
                    />
                    <CardEarning
                        model="Kia K5"
                        year="2021"
                        month="60 000 ₽"
                        yearTotal="720 000 ₽"
                    />
                    <CardEarning
                        model="Hyundai Sonata"
                        year="2019"
                        month="55 000 ₽"
                        yearTotal="660 000 ₽"
                    />
                </div>

                {/* Отечественные */}
                <h3 className="text-2xl font-semibold mb-6 text-left">Отечественные</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <CardEarning
                        model="Lada Vesta"
                        year="2022"
                        month="40 000 ₽"
                        yearTotal="480 000 ₽"
                    />
                    <CardEarning
                        model="Lada Granta"
                        year="2021"
                        month="35 000 ₽"
                        yearTotal="420 000 ₽"
                    />
                    <CardEarning
                        model="Lada Priora"
                        year="2018"
                        month="32 000 ₽"
                        yearTotal="384 000 ₽"
                    />
                </div>

                {/* Премиум */}
                <h3 className="text-2xl font-semibold mb-6 text-left">Премиум</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <CardEarning
                        model="Mercedes E-Class"
                        year="2021"
                        month="80 000 ₽"
                        yearTotal="960 000 ₽"
                    />
                    <CardEarning
                        model="BMW 5 Series"
                        year="2020"
                        month="78 000 ₽"
                        yearTotal="936 000 ₽"
                    />
                    <CardEarning
                        model="Mercedes W223"
                        year="2021"
                        month="95 000 ₽"
                        yearTotal="1 140 000 ₽"
                    />
                </div>

                <p className="mt-6 text-sm text-gray-400">
                    Доход зависит от состояния автомобиля, пробега и спроса{" "}
                    {rPrep ? `в ${rPrep}` : "в регионе"}.
                </p>
            </section>

            {/* CTA Banner */}
            <section className="px-4 mb-4">
                <div className="max-w-5xl mx-auto bg-[#1a1f2e] border border-blue-900/50 rounded-2xl p-6 text-center">
                    <h3 className="text-2xl font-bold">
                        Готовы сдавать авто и получать доход?
                    </h3>
                    <p className="text-zinc-300 mt-2">
                        Оформите профиль, добавьте автомобиль и начните принимать заявки
                        уже сегодня.
                    </p>
                    <div className="mt-4">
                        <Link
                            href="/profile"
                            aria-label="Перейти в профиль для сдачи авто"
                        >
                            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 transition rounded-full text-lg font-semibold shadow-md shadow-blue-900/30">
                                Сдать автомобиль через профиль
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ✚ Блок «Чёрный список — ваша защита» */}
            <section className="px-4 py-10 bg-[#202020]">
                <div className="max-w-5xl mx-auto rounded-2xl border border-zinc-700 bg-[#1c1c1c] p-6">
                    <h3 className="text-2xl font-bold">
                        Чёрный список — ваша защита при сдаче авто
                    </h3>
                    <p className="text-zinc-300 mt-2">
                        Перед выдачей автомобиля проверьте потенциального арендатора:
                        поиск по чёрному списку бесплатный. Просмотр записей и добавление
                        нарушителей доступны только
                        <b>авторизованным и верифицированным</b> аккаунтам.
                    </p>
                    <ul className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-zinc-200">
                        <li className="border border-zinc-700 rounded-lg p-3 bg-[#222]">
                            🔎 Проверка по ФИО, году рождения или номеру ВУ
                        </li>
                        <li className="border border-zinc-700 rounded-lg p-3 bg-[#222]">
                            🛑 Добавление нарушителей — чтобы им не сдавали авто по всему
                            СКФО и дальше
                        </li>
                        <li className="border border-zinc-700 rounded-lg p-3 bg-[#222]">
                            ✅ Бесплатно. Доступ по верификации
                        </li>
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link href="/cherny-spisok">
                            <button className="px-5 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-500">
                                Подробнее о чёрном списке
                            </button>
                        </Link>
                        <Link href="/profile/blacklist">
                            <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold">
                                Запросить верификацию
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-16 px-4 text-center bg-[#202020]">
                <h2 className="text-3xl font-bold mb-10">Как это работает?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {[
                        {
                            step: "1",
                            title: "Заполняете условия",
                            desc: "Фотографии, стоимость, депозит и описание.",
                        },
                        {
                            step: "2",
                            title: "Получаете заявки",
                            desc: "Вы соглашаетесь или отказываетесь.",
                        },
                        {
                            step: "3",
                            title: "Зарабатываете деньги",
                            desc: "Авто в аренде — деньги на счёт.",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="p-6 border border-gray-700 rounded-xl bg-[#2a2a2a]"
                        >
                            <div className="text-5xl font-bold text-blue-400 mb-2">
                                {item.step}
                            </div>
                            <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
                <Link href="/profile">
                    <button className="mt-10 px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold">
                        Сдать автомобиль
                    </button>
                </Link>
            </section>

            {/* Advantages */}
            <section className="bg-[#1a1a1a] text-white py-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-10">
                    Наши преимущества
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {[
                        {
                            title: "Минимальная стоимость размещения",
                            desc: "Самые низкие цены в России за публикацию авто.",
                        },
                        {
                            title: "Честная конкуренция",
                            desc: "Не продвигаем никого индивидуально — всё решает качество профиля.",
                        },
                        {
                            title: "Никакого такси",
                            desc: "Запрещены коммерческие перевозки, включая такси.",
                        },
                        {
                            title: "Проверка арендаторов",
                            desc: "Ручная и автоматическая проверка для снижения рисков.",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-[#2a2a2a] p-6 rounded-xl border border-gray-700"
                        >
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Personalization */}
            <section className="bg-[#202020] py-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-10">
                    Индивидуальный подход
                </h2>
                <div className="max-w-4xl mx-auto grid gap-6">
                    {[
                        {
                            title: "Ваше авто — вам решать",
                            desc: "Вы задаёте тарифы, депозит, место передачи.",
                        },
                        {
                            title: "Продвижение через качество",
                            desc: "Заполняйте профиль и поднимайтесь в выдаче.",
                        },
                        {
                            title: "Гибкость условий аренды",
                            desc: "Выбирайте, кому сдавать и на каких условиях.",
                        },
                        {
                            title: "Прозрачная статистика",
                            desc: "Отклики и просмотры видны в личном кабинете.",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-[#2a2a2a] p-6 rounded-xl border border-gray-700"
                        >
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Renters */}
            <section className="py-16 px-4 text-center">
                <h2 className="text-3xl font-bold mb-10">Кто будет вашим арендатором?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                        {
                            title: "Семьи или друзья",
                            desc: "Поездки на дачу, в дом отдыха и по делам.",
                            img: "/sdam_page/famaly.png",
                        },
                        {
                            title: "Деловые люди",
                            desc: "Командировки и рабочие поездки.",
                            img: "/sdam_page/buss.png",
                        },
                        {
                            title: "Путешественники",
                            desc: "Поездки в другие города и регионы.",
                            img: "/sdam_page/travel.png",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="rounded-xl overflow-hidden border border-gray-700 bg-[#1e1e1e]"
                        >
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-48 object-scale-down"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-400">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Внутренняя перелинковка */}
            <section className="pb-16 px-4 text-center">
                <div className="text-sm text-gray-400">
                    Посмотрите также:{" "}
                    <Link href="/avto/all" className="text-blue-400 underline">
                        аренда авто
                    </Link>
                    {region && (
                        <>
                            {" "}
                            в{" "}
                            <Link
                                href={`/${region}/avto/all`}
                                className="text-blue-400 underline"
                            >
                                {REGION_PREP[region] ?? region}
                            </Link>
                        </>
                    )}
                    .
                </div>
            </section>
        </main>
    );
}

// Вспомогательная карточка дохода (UI)
function CardEarning({
    model,
    year,
    month,
    yearTotal,
}: {
    model: string;
    year: string;
    month: string;
    yearTotal: string;
}) {
    return (
        <div className="p-4 rounded-xl border border-gray-700 bg-[#1e1e1e] text-left">
            <div className="font-bold text-lg mb-1">
                {model} <span className="text-gray-400">{year}</span>
            </div>
            <div className="text-xl font-semibold">
                {month} <span className="text-sm text-gray-400">в месяц</span>
            </div>
            <div className="text-blue-400 font-bold mt-2">
                {yearTotal} <span className="text-sm">в год</span>
            </div>
        </div>
    );
}
