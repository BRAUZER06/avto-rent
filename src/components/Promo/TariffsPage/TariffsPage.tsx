"use client";

import OptionCheckbox from "@src/components/ui/OptionCheckbox/OptionCheckbox";
import { useState } from "react";

const tariffs = [
    { name: "Пакет 1", limit: "до 3 авто", base: 1200 },
    { name: "Пакет 2", limit: "до 10 авто", base: 2840 },
    { name: "Пакет 3", limit: "до 17 авто", base: 4870 },
    { name: "Пакет 4", limit: "до 40 авто", base: 9730 },
];

const categoryLegend = {
    mid: "авто среднего класса",
    russian: "отечественные авто",
    jeep: "внедорожники",
    cabrio: "кабриолеты",
    sport: "спорткары",
    premium: "авто премиум-класса",
    electric: "электрокары",
    minivan: "минивэны",
    bike: "мотоциклы",
};

export default function TariffsPage() {
    const [selectedOptions, setSelectedOptions] = useState({});

    const handleCheckboxChange = (packageName, id) => {
        setSelectedOptions(prev => {
            const prevPackage = prev[packageName] || { special: false, premium: false };
            const updatedPackage = { ...prevPackage };
            if (id === "special") updatedPackage.special = !updatedPackage.special;
            if (id === "premium") updatedPackage.premium = !updatedPackage.premium;
            return { ...prev, [packageName]: updatedPackage };
        });
    };

    const calculatePrice = tariff => {
        const options = selectedOptions[tariff.name] || {
            special: false,
            premium: false,
        };
        let multiplier = 1;
        if (options.special && options.premium) multiplier = 1.18;
        else if (options.special) multiplier = 1.08;
        else if (options.premium) multiplier = 1.1;
        return Math.round(tariff.base * multiplier);
    };

    return (
        <main className="min-h-screen w-full bg-[var(--background-black)] text-[var(--white-color)]">
            <section className="text-center py-10">
                <h1 className="text-4xl font-bold mb-4 text-[var(--green-main)]">
                    Тарифы размещения
                </h1>
                <p className="text-[var(--grey-text)] text-lg max-w-2xl mx-auto">
                    Выберите пакет и дополнительные категории. Итоговая цена пересчитается
                    автоматически.
                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 pb-10">
                {tariffs.map(tariff => {
                    const options = selectedOptions[tariff.name] || {
                        special: false,
                        premium: false,
                    };
                    return (
                        <div
                            key={tariff.name}
                            className="border border-[var(--grey-bg-hover-dark)] bg-[var(--grey-bg)] text-white rounded-2xl p-6 flex flex-col justify-between hover:scale-105 transition-transform duration-[var(--transition-duration)] shadow-lg hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                        >
                            <div>
                                <h2 className="text-2xl font-bold mb-1 text-[var(--green-main-hover)]">
                                    {tariff.name}
                                </h2>
                                <p className="text-[var(--grey-text-new)] text-sm mb-4">
                                    {tariff.limit}
                                </p>

                                <div className="space-y-4">
                                    <div className="bg-[var(--grey-bg-hover-light)] rounded-xl p-3">
                                        <p className="text-[var(--peach-label-bg)] text-xs uppercase font-semibold">
                                            Базовые
                                        </p>
                                        <p className="text-2xl font-bold text-[var(--green-main)]">
                                            {tariff.base} ₽
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 space-y-2">
                                    <OptionCheckbox.MobileVersionTwo
                                        id="special"
                                        title="+ Базовые"
                                        checked={true}
                                        handleCheckboxChange={() => {}}
                                        tooltip="Электрокары, кабриолеты, спорткары"
                                    />
                                    <OptionCheckbox.MobileVersionTwo
                                        id="special"
                                        title="+ Специальные"
                                        checked={options.special}
                                        handleCheckboxChange={() =>
                                            handleCheckboxChange(tariff.name, "special")
                                        }
                                        tooltip="Электрокары, кабриолеты, спорткары"
                                    />

                                    <OptionCheckbox.MobileVersionTwo
                                        id="premium"
                                        title="+ Премиум"
                                        checked={options.premium}
                                        handleCheckboxChange={() =>
                                            handleCheckboxChange(tariff.name, "premium")
                                        }
                                        tooltip="Авто премиум-класса"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <p className="text-lg font-bold mb-2">
                                    Итоговая цена: {calculatePrice(tariff)} ₽
                                </p>
                                <button className="w-full py-3 bg-[var(--green-main-hover)] text-black rounded-xl font-bold hover:bg-[var(--green-main-hover-bright)] transition-colors duration-[var(--transition-duration)]">
                                    Выбрать пакет
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <section className="mt-8 mx-auto text-[var(--grey-text)] pb-10 px-6">
                <h2 className=" text-center text-2xl font-bold mb-4 text-[var(--green-main)]">
                    Категории авто
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-[var(--grey-bg)] p-4 rounded-xl">
                        <h3 className="font-bold text-[var(--green-main)] mb-2">
                            Базовые
                        </h3>
                        <ul className="list-disc list-inside text-[var(--grey-text)]">
                            <li> авто среднего класса</li>
                            <li> отечественные авто</li>
                            <li> внедорожники</li>
                            <li> минивэны</li>
                            <li>мотоциклы</li>
                        </ul>
                    </div>
                    <div className="bg-[var(--grey-bg)] p-4 rounded-xl">
                        <h3 className="font-bold text-[var(--purple-label-bg)] mb-2">
                            Специальные
                        </h3>
                        <ul className="list-disc list-inside text-[var(--grey-text)]">
                            <li> кабриолеты</li>
                            <li> спорткары</li>
                            <li> электрокары</li>
                        </ul>
                    </div>
                    <div className="bg-[var(--grey-bg)] p-4 rounded-xl">
                        <h3 className="font-bold text-[var(--yellow-label-bg)] mb-2">
                            Премиум
                        </h3>
                        <ul className="list-disc list-inside text-[var(--grey-text)]">
                            <li> авто премиум-класса</li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
}
