import Link from "next/link";

export const metadata = {
    title: "Сдать машину в аренду — Условия, Доход и Преимущества",
    description:
        "Сдавайте автомобиль в аренду и зарабатывайте от 35 000 ₽ в месяц. Простой процесс, надёжная поддержка, индивидуальные условия и защита.",
    keywords:
        "сдать машину в аренду, аренда авто, заработок на автомобиле, пассивный доход, Уфа, Назрань, Ингушетия, сдача авто частнику",
    openGraph: {
        title: "Сдайте автомобиль в аренду — до 660 000 ₽ в год",
        description:
            "На нашей платформе вы можете сдавать авто в аренду с гибкими условиями, полным сопровождением и стабильным доходом.",
        type: "website",
        locale: "ru_RU",
    },
};

export default function CarRentalPage() {
    return (
        <main className="bg-[#191919] text-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#191919] to-blue-950 py-16 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Сдавайте свою машину в аренду в{" "}
                    <span className="text-blue-400">Вашем городе</span>
                </h1>
                <p className="text-2xl text-blue-300 font-semibold mb-6">
                    и зарабатывайте от <span className="text-3xl">35 000 ₽/мес.</span>
                </p>
                <p className="text-gray-300">
                    Занимайтесь личными делами, пока{" "}
                    <span className="font-semibold">
                        ваш автомобиль зарабатывает деньги
                    </span>
                </p>
            </section>

            <section className="py-16 px-4 text-center">
                <h2 className="text-3xl font-bold mb-12">Сколько вы заработаете?</h2>

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
                    <div className="p-4 rounded-xl border border-gray-700 bg-[#1e1e1e] text-left">
                        <div className="font-bold text-lg mb-1">
                            Toyota Camry <span className="text-gray-400">2020</span>
                        </div>
                        <div className="text-xl font-semibold">
                            65 000 ₽{" "}
                            <span className="text-sm text-gray-400">в месяц</span>
                        </div>
                        <div className="text-blue-400 font-bold mt-2">
                            780 000 ₽ <span className="text-sm">в год</span>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-700 bg-[#1e1e1e] text-left">
                        <div className="font-bold text-lg mb-1">
                            Kia K5 <span className="text-gray-400">2021</span>
                        </div>
                        <div className="text-xl font-semibold">
                            60 000 ₽{" "}
                            <span className="text-sm text-gray-400">в месяц</span>
                        </div>
                        <div className="text-blue-400 font-bold mt-2">
                            720 000 ₽ <span className="text-sm">в год</span>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-700 bg-[#1e1e1e] text-left">
                        <div className="font-bold text-lg mb-1">
                            Hyundai Sonata <span className="text-gray-400">2019</span>
                        </div>
                        <div className="text-xl font-semibold">
                            55 000 ₽{" "}
                            <span className="text-sm text-gray-400">в месяц</span>
                        </div>
                        <div className="text-blue-400 font-bold mt-2">
                            660 000 ₽ <span className="text-sm">в год</span>
                        </div>
                    </div>
                </div>

                {/* Отечественные */}
                <h3 className="text-2xl font-semibold mb-6 text-left">Отечественные</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-4 rounded-xl border border-gray-700 bg-[#1e1e1e] text-left">
                        <div className="font-bold text-lg mb-1">
                            Lada Vesta <span className="text-gray-400">2022</span>
                        </div>
                        <div className="text-xl font-semibold">
                            40 000 ₽{" "}
                            <span className="text-sm text-gray-400">в месяц</span>
                        </div>
                        <div className="text-blue-400 font-bold mt-2">
                            480 000 ₽ <span className="text-sm">в год</span>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-700 bg-[#1e1e1e] text-left">
                        <div className="font-bold text-lg mb-1">
                            Lada Granta <span className="text-gray-400">2021</span>
                        </div>
                        <div className="text-xl font-semibold">
                            35 000 ₽{" "}
                            <span className="text-sm text-gray-400">в месяц</span>
                        </div>
                        <div className="text-blue-400 font-bold mt-2">
                            420 000 ₽ <span className="text-sm">в год</span>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-700 bg-[#1e1e1e] text-left">
                        <div className="font-bold text-lg mb-1">
                            Lada Priora <span className="text-gray-400">2023</span>
                        </div>
                        <div className="text-xl font-semibold">
                            38 000 ₽{" "}
                            <span className="text-sm text-gray-400">в месяц</span>
                        </div>
                        <div className="text-blue-400 font-bold mt-2">
                            456 000 ₽ <span className="text-sm">в год</span>
                        </div>
                    </div>
                </div>

                {/* Премиум */}
                <h3 className="text-2xl font-semibold mb-6 text-left">Премиум</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-4 rounded-xl border border-gray-700 bg-[#1e1e1e] text-left">
                        <div className="font-bold text-lg mb-1">
                            Mercedes E-Class <span className="text-gray-400">2021</span>
                        </div>
                        <div className="text-xl font-semibold">
                            80 000 ₽{" "}
                            <span className="text-sm text-gray-400">в месяц</span>
                        </div>
                        <div className="text-blue-400 font-bold mt-2">
                            960 000 ₽ <span className="text-sm">в год</span>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-700 bg-[#1e1e1e] text-left">
                        <div className="font-bold text-lg mb-1">
                            BMW 5 Series <span className="text-gray-400">2020</span>
                        </div>
                        <div className="text-xl font-semibold">
                            78 000 ₽{" "}
                            <span className="text-sm text-gray-400">в месяц</span>
                        </div>
                        <div className="text-blue-400 font-bold mt-2">
                            936 000 ₽ <span className="text-sm">в год</span>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-700 bg-[#1e1e1e] text-left">
                        <div className="font-bold text-lg mb-1">
                            Mercedes W223 <span className="text-gray-400">2021</span>
                        </div>
                        <div className="text-xl font-semibold">
                            95 000 ₽{" "}
                            <span className="text-sm text-gray-400">в месяц</span>
                        </div>
                        <div className="text-blue-400 font-bold mt-2">
                            1 140 000 ₽ <span className="text-sm">в год</span>
                        </div>
                    </div>
                </div>

                <p className="mt-6 text-sm text-gray-400">
                    Доход зависит от состояния автомобиля, пробега и региона.
                </p>
            </section>

            {/* How it works Section */}
            <section className="py-16 px-4 text-center bg-[#202020]">
                <h2 className="text-3xl font-bold mb-10">Как это работает?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {[
                        {
                            step: "1",
                            title: "Заполняете условия",
                            desc: "Фотографии, стоимость, депозит и другое описание.",
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
                <Link href="/auth">
                    <button className="mt-10 px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold">
                        Зарегистрироватья
                    </button>
                </Link>
            </section>
            {/* Advantages Section */}
            <section className="bg-[#1a1a1a] text-white py-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-10">
                    Наши преимущества
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {[
                        {
                            title: "Минимальная стоимость размещения",
                            desc: "Самые низкие цены в России за публикацию авто на нашей площадке.",
                        },
                        {
                            title: "Честная конкуренция",
                            desc: "Мы не продвигаем никого индивидуально — всё зависит от качества профиля и подхода.",
                        },
                        {
                            title: "Никакого такси",
                            desc: "Запрещена сдача автомобиля в такси и другие коммерческие перевозки.",
                        },
                        {
                            title: "Проверка арендаторов",
                            desc: "Каждый пользователь проходит ручную и автоматическую службу проверки.",
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
            {/* Personalization Section */}
            <section className="bg-[#202020] py-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-10">
                    Индивидуальный подход
                </h2>
                <div className="max-w-4xl mx-auto grid gap-6">
                    {[
                        {
                            title: "Ваше авто — вам решать",
                            desc: "Вы сами задаёте тарифы, депозит, место передачи.",
                        },
                        {
                            title: "Продвижение через качество",
                            desc: "Заполняйте профиль и поднимайтесь в выдаче — всё зависит от вас.",
                        },
                        {
                            title: "Гибкость условий аренды",
                            desc: "Выбирайте, кому сдавать и на каких условиях. Всё под вашим контролем.",
                        },
                        {
                            title: "Прозрачная статистика",
                            desc: "Следите за откликами и просмотрами вашего авто в личном кабинете.",
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
            {/* Renter Types Section */}
            <section className="py-16 px-4 text-center">
                <h2 className="text-3xl font-bold mb-10">Кто будет вашим арендатором?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                        {
                            title: "Семьи или друзья",
                            desc: "Берут авто, чтобы съездить на дачу или в дом отдыха.",
                            img: "/sdam_page/famaly.png",
                        },
                        {
                            title: "Деловые люди",
                            desc: "Часто командировки и рабочие поездки.",
                            img: "/sdam_page/buss.png",
                        },
                        {
                            title: "Путешественники",
                            desc: "Аренда для поездок в другие города.",
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
        </main>
    );
}
