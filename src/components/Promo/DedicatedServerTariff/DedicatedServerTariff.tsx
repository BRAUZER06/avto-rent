"use client";

interface DedicatedServerTariffProps {
    promo?: {
        freePeriod: string; // "2 недели бесплатно"
        buttonText: string; // "попробовать бесплатно"
    };
}
const base = process.env.NEXT_PUBLIC_SITE_URL;

export default function DedicatedServerTariff({ promo }: DedicatedServerTariffProps) {
    const price = 899; // примерная фиксированная цена за месяц
    let dedicatedLink = base + "/secret_key***/brands";
    const hasPromo = Boolean(promo);

    return (
        <main className="">
            <section className="max-w-md w-full bg-gradient-to-br from-[#1a1a1b] to-[#2a2a2c] p-5 rounded-3xl shadow-[0_0_30px_rgba(173,255,47,0.6)] border-2 border-[var(--green-main-hover)] transform hover:scale-102 transition-transform duration-300 relative">
                {/* Промо-бейдж */}
                {hasPromo && (
                    <div className="absolute -top-3 -right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        {promo.freePeriod}
                    </div>
                )}

                <h1 className="text-3xl font-extrabold text-[var(--green-main-hover)] mb-4 text-center">
                    Выделенный сайт
                </h1>

                <p className="text-[var(--grey-text)] mb-6 text-center">
                    Благодаря тарифу{" "}
                    <strong className="text-yellow-400">«Выделенный сайт»</strong> ваши
                    клиенты{" "}
                    <span className="text-[var(--green-main-hover)] font-semibold">
                        видят только вашу компанию и ваши автомобили
                    </span>
                    , если перейдут по вашей индивидуальной ссылке. Помимо аудитории
                    основного сайта, у вас формируется{" "}
                    <strong>собственная аудитория</strong>, которая приходит к вам
                    напрямую и <strong>не уйдет к другим компаниям</strong>.
                </p>

                <div className="mb-6 p-4 bg-[var(--grey-bg-hover-dark)] rounded-xl text-center shadow-md">
                    <p className="text-[var(--grey-text-new)] mb-1 uppercase tracking-wide">
                        {hasPromo ? "Цена после пробного периода" : "Фиксированная цена"}
                    </p>
                    <p className="text-3xl font-bold text-[var(--green-main-hover)]">
                        {price} ₽ / месяц
                    </p>
                    {hasPromo && (
                        <p className="text-green-400 text-sm mt-1">
                            Первые 2 недели: 0 ₽
                        </p>
                    )}
                </div>

                <div className="mb-6 p-4 bg-[var(--grey-bg-hover-light)] rounded-xl text-center shadow-inner">
                    <p className="text-[var(--grey-text-new)] mb-1 uppercase tracking-wide">
                        Ваша индивидуальная ссылка
                    </p>
                    <p className="text-[var(--green-main-hover)] break-all">
                        {dedicatedLink}
                    </p>
                </div>

                <button className="w-full py-3 bg-[var(--green-main-hover)] text-black rounded-xl font-bold hover:bg-[var(--green-main-hover-bright)] transition-colors shadow-lg">
                    {hasPromo ? promo.buttonText : "Купить тариф"}
                </button>

                {hasPromo && (
                    <p className="text-xs text-[var(--grey-text)] text-center mt-3">
                        *Стоимость после пробного периода: {price} ₽/месяц
                    </p>
                )}
            </section>
        </main>
    );
}
