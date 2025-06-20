"use client";

import { Line, Column, Area } from "@ant-design/charts";
import { useEffect, useState } from "react";

type ViewData = { car: string; count: number };
type ClickData = { date: string; clicks: number };
type InteractionData = { date: string; phoneClicks: number; messageClicks: number };

function generateTrendData(length: number, start: number, step: number, jitter: number) {
    let value = start;
    return Array.from({ length }, (_, i) => {
        value += step + (Math.random() - 0.5) * jitter;
        return {
            date: new Date(Date.now() - (length - 1 - i) * 86400000)
                .toISOString()
                .split("T")[0],
            clicks: Math.round(value),
        };
    });
}

function generateInteractionData(length: number, startPhone: number, startMsg: number) {
    let phone = startPhone;
    let msg = startMsg;
    return Array.from({ length }, (_, i) => {
        phone += 1 + (Math.random() - 0.5) * 2;
        msg += 1 + (Math.random() - 0.5) * 1.5;
        const date = new Date(Date.now() - (length - 1 - i) * 86400000)
            .toISOString()
            .split("T")[0];
        return {
            date,
            phoneClicks: Math.round(phone),
            messageClicks: Math.round(msg),
        };
    });
}

export default function CarAnalyticsPage() {
    const [chartData, setChartData] = useState<{
        views: ViewData[];
        clicks: ClickData[];
        interactions: InteractionData[];
    }>({ views: [], clicks: [], interactions: [] });

    useEffect(() => {
        const clicks = generateTrendData(30, 10, 3, 5);
        const interactions = generateInteractionData(30, 10, 5);
        const views = [
            "BMW X5",
            "Toyota Camry",
            "Hyundai Solaris",
            "Kia Rio",
            "Lada Vesta",
            "Mercedes GLE",
            "Audi A4",
            "Skoda Octavia",
            "Volkswagen Polo",
            "Renault Logan",
            "Mazda 6",
            "Nissan X-Trail",
            "Chevrolet Niva",
            "Ford Focus",
            "Haval Jolion",
        ].map((car, i) => ({
            car,
            count: 60 + i * 10 + Math.floor(Math.random() * 20),
        }));

        setChartData({ views, clicks, interactions });
    }, []);

    const viewsConfig = {
        data: chartData.views,
        xField: "car",
        yField: "count",
        label: {
            position: "middle",
            style: { fill: "#000000", opacity: 0.8 },
        },
        xAxis: {
            label: {
                rotate: 30,
                autoHide: false,
                autoRotate: false,
                style: { fill: "#000" },
            },
        },
        yAxis: {
            label: { style: { fill: "#000" } },
        },
        meta: {
            car: { alias: "Модель авто" },
            count: { alias: "Пользователей просмотрело" },
        },
        color: "#69c0ff",
        autoFit: true,
        height: 300,
    };

    const clicksConfig = {
        data: chartData.clicks,
        xField: "date",
        yField: "clicks",
        smooth: true,
        xAxis: {
            label: { style: { fill: "#000" } },
        },
        yAxis: {
            label: { style: { fill: "#000" } },
        },
        meta: {
            date: { alias: "Дата" },
            clicks: { alias: "Просмотры карточки и описания" },
        },
        color: "#73d13d",
        autoFit: true,
        height: 300,
    };

    const interactionAreaConfig = {
        data: chartData.interactions.flatMap(item => [
            { date: item.date, type: "Клики по номеру", value: item.phoneClicks },
            { date: item.date, type: "Клики на 'написать'", value: item.messageClicks },
        ]),
        xField: "date",
        yField: "value",
        seriesField: "type",
        isStack: false,
        color: ["#ff7875", "#9254de"],
        xAxis: {
            label: { style: { fill: "#000" } },
        },
        yAxis: {
            label: { style: { fill: "#000" } },
        },
        meta: {
            date: { alias: "Дата" },
            value: { alias: "Количество" },
            type: { alias: "Тип" },
        },
        autoFit: true,
        height: 300,
    };

    return (
        <div className="p-4 space-y-10 w-full overflow-x-auto bg-white">
            <div className="min-w-[600px]">
                <h2 className="text-lg font-semibold mb-2 text-black">
                    Количество людей, просмотревших автомобиль
                </h2>
                <Column {...viewsConfig} />
            </div>

            <div className="min-w-[600px]">
                <h2 className="text-lg font-semibold mb-2 text-black">
                    Количество людей, просмотревших карточку и описание
                </h2>
                <Line {...clicksConfig} />
            </div>

            <div className="min-w-[600px]">
                <h2 className="text-lg font-semibold mb-2 text-black">
                    Взаимодействия: номер vs. написать
                </h2>
                <Line {...interactionAreaConfig} />
            </div>
        </div>
    );
}
