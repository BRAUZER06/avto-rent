"use client";

import { useState } from "react";

interface SingleCarCalculatorProps {
    promo?: {
        freePeriod: string; // "первый месяц бесплатно"
        buttonText: string; // "получить бесплатно"
    };
}

export default function SingleCarCalculator({ promo }: SingleCarCalculatorProps) {
    const pricePerCar = 227; // цена за одно авто
    const [numCars, setNumCars] = useState(1); // количество авто

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumCars(parseInt(e.target.value));
    };

    const totalPrice = numCars * pricePerCar;
    const hasPromo = Boolean(promo);

    return (
        <main className="">
            <section className="max-w-md w-full bg-[var(--grey-bg)] p-5 rounded-2xl shadow-lg relative">
                {/* Промо-бейдж */}
                {hasPromo && (
                    <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                        {promo.freePeriod}
                    </div>
                )}

                <h1 className="text-3xl font-bold text-[var(--green-main)] mb-4 text-center">
                    Калькулятор тарифа за авто
                </h1>
                <p className="text-[var(--grey-text)] mb-6 text-center">
                    Рассчитайте стоимость размещения вашего автопарка.
                </p>

                <div className="mb-6">
                    <label className="block mb-2 font-semibold text-[var(--grey-text-new)]">
                        Количество автомобилей: {numCars}
                    </label>
                    <input
                        type="range"
                        min={1}
                        max={50}
                        value={numCars}
                        onChange={handleSliderChange}
                        className="w-full h-2 bg-[var(--grey-bg-hover-light)] rounded-lg accent-[var(--green-main-hover)] cursor-pointer"
                    />
                </div>

                <div className="mb-6 p-4 bg-[var(--grey-bg-hover-dark)] rounded-xl text-center">
                    <p className="text-[var(--grey-text-new)] mb-1">
                        Цена за один автомобиль
                    </p>
                    <p className="text-2xl font-bold text-[var(--green-main)]">
                        {pricePerCar} ₽
                    </p>
                    <p className="text-sm text-[var(--grey-text)] mt-1">
                        после пробного периода
                    </p>
                </div>

                <div className="mb-6 p-4 bg-[var(--grey-bg-hover-light)] rounded-xl text-center">
                    <p className="text-[var(--grey-text-new)] mb-1">
                        {hasPromo ? "Цена после пробного периода" : "Итоговая цена"}
                    </p>
                    <p className="text-3xl font-bold text-[var(--green-main-hover)]">
                        {totalPrice} ₽
                    </p>
                    {hasPromo && (
                        <p className="text-green-400 text-sm mt-1">Первый месяц: 0 ₽</p>
                    )}
                </div>

                <button className="w-full py-3 bg-[var(--green-main-hover)] text-black rounded-xl font-bold hover:bg-[var(--green-main-hover-bright)] transition-colors">
                    {hasPromo ? promo.buttonText : "Выбрать и оплатить"}
                </button>

                {hasPromo && (
                    <p className="text-xs text-[var(--grey-text)] text-center mt-3">
                        *Стоимость со второго месяца: {totalPrice} ₽/месяц
                    </p>
                )}
            </section>
        </main>
    );
}
