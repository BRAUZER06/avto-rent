"use client";

import { Line, Gauge, Liquid } from "@ant-design/charts";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./CarTelematicsPage.module.scss";

type TelemetryData = {
    fuel: number;
    engineTemp: number;
    battery: number;
    mileage: number;
    rpm: number;
    tirePressure: number;
};

export default function CarTelematicsPage() {
    const [telemetry, setTelemetry] = useState<TelemetryData>({
        fuel: 72.3,
        engineTemp: 85.5,
        battery: 12.4,
        mileage: 15324.7,
        rpm: 2100,
        tirePressure: 2.3,
    });
    const [speedData, setSpeedData] = useState<Array<{ time: number; speed: number }>>(
        []
    );
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        // Инициализация данных скорости
        const initialSpeedData = Array.from({ length: 20 }, (_, i) => ({
            time: i * 5,
            speed: 40 + Math.random() * 60,
        }));
        setSpeedData(initialSpeedData);

        // Имитация обновления телеметрии
        const interval = setInterval(() => {
            setTelemetry(prev => ({
                fuel: parseFloat(
                    Math.max(
                        5,
                        Math.min(100, prev.fuel + (Math.random() - 0.45) * 0.3).toFixed(1)
                    )
                ),
                engineTemp: parseFloat((80 + Math.random() * 20).toFixed(1)),
                battery: parseFloat((12 + Math.random() * 0.5).toFixed(1)),
                mileage: parseFloat((prev.mileage + Math.random() * 0.2).toFixed(1)),
                rpm: Math.floor(1500 + Math.random() * 2000),
                tirePressure: parseFloat((2.1 + Math.random() * 0.4).toFixed(1)),
            }));

            // Обновление данных скорости
            setSpeedData(prev => {
                const newData = [
                    ...prev.slice(1),
                    {
                        time: prev[prev.length - 1].time + 5,
                        speed: 40 + Math.random() * 60,
                    },
                ];
                return newData;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Конфигурации графиков
    const speedConfig = isClient
        ? {
              data: speedData,
              xField: "time",
              yField: "speed",
              xAxis: { title: { text: "Время (сек)" } },
              yAxis: { title: { text: "Скорость (км/ч)" } },
              color: "#ff4d4f",
              height: 300,
              smooth: true,
          }
        : null;

    const fuelConfig = isClient
        ? {
              percent: telemetry.fuel / 100,
              range: { color: "#faad14" },
              indicator: false,
              statistic: {
                  content: {
                      formatter: () => `${telemetry.fuel}%`,
                      style: { fontSize: "24px" },
                  },
              },
              height: 150,
          }
        : null;

    const rpmConfig = isClient
        ? {
              percent: telemetry.rpm / 4000,
              range: { color: "#13c2c2" },
              statistic: {
                  content: {
                      formatter: () => `${telemetry.rpm} RPM`,
                      style: { fontSize: "20px" },
                  },
              },
              height: 150,
          }
        : null;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Телематика автомобиля</h1>

            {/* Верхний блок: карта и основные датчики */}
            <div className={styles.topSection}>
                {/* Заблюренная карта */}
                <div className={styles.mapContainer}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/telematics/mapBluer.png"
                            alt="Карта маршрута"
                            fill
                            className={styles.mapImage}
                            priority
                        />
                        <div className={styles.mapOverlay}>
                            <p>Текущая позиция: 55.7°N, 37.6°E</p>
                        </div>
                    </div>
                </div>

                {/* Блок с топливом и оборотами */}
                <div className={styles.primaryGauges}>
                    <div className={styles.gaugeCard}>
                        <h3>Уровень топлива</h3>
                        {fuelConfig && <Liquid {...fuelConfig} />}
                    </div>

                    <div className={styles.gaugeCard}>
                        <h3>Обороты двигателя</h3>
                        {rpmConfig && <Gauge {...rpmConfig} />}
                    </div>
                </div>
            </div>

            {/* Средний блок: дополнительные показатели */}
            <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                    <h3>Температура</h3>
                    <div className={styles.metricValue}>{telemetry.engineTemp}°C</div>
                </div>

                <div className={styles.metricCard}>
                    <h3>Пробег</h3>
                    <div className={styles.metricValue}>
                        {telemetry.mileage} <span>км</span>
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <h3>Давление</h3>
                    <div className={styles.metricValue}>
                        {telemetry.tirePressure} <span>атм</span>
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <h3>Напряжение</h3>
                    <div className={styles.metricValue}>
                        {telemetry.battery} <span>V</span>
                    </div>
                </div>
            </div>

            {/* Нижний блок: график скорости */}
            <div className={styles.speedSection}>
                <h2>График скорости</h2>
                {speedConfig && <Line {...speedConfig} />}
            </div>
        </div>
    );
}
