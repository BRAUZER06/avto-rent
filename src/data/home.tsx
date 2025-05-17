import { CarouselCard } from "@src/components/pages/HomePage/sections/InfiniteCarousel/InfiniteCarousel";
import { AboutProps } from "@src/components/pages/HomePage/sections/About/About";

export const BANNER = {
    label: "Высокотехнологичный ритейл",
    imageSrc: "/assets/images/home/banner/banner-alternative.svg",
    mobImageSrc: "/assets/images/home/banner/banner-mobile.svg",
    icon: "/assets/images/home/banner/icon.svg",
};

export const INFINITE_CAROUSEL: CarouselCard[] = [
    {
        type: "image-text-bottom",
        image: "/assets/images/home/inf-carousel/raccoon.svg",
        title: "А еще мы очень любим енотов!",
        background: "#C4B4FF",
    },
    {
        type: "image",
        image: "/assets/images/home/inf-carousel/item-1.png",
    },
    {
        type: "image-text-top",
        image: "/assets/images/home/inf-carousel/item-2.png",
        title: "8 из 10",
        descriptor: "сотрудников — мидлы и синьоры",
    },
    {
        type: "image-circle",
        image: "/assets/images/home/inf-carousel/item-3.png",
    },
    {
        type: "image-multiple",
        title: "85%",
        descriptor: "сотрудников выбирают удаленную работу",
        images: [
            "/assets/images/home/inf-carousel/multiple-1.png",
            "/assets/images/home/inf-carousel/multiple-2.png",
            "/assets/images/home/inf-carousel/multiple-3.png",
        ],
    },
    {
        type: "image",
        image: "/assets/images/home/inf-carousel/item-5.png",
    },
];

export const ABOUT: AboutProps = {
    title: (
        <>
            X5 Tech — это IT-компания и основной цифровой партнер X5 Group. Мы
            разрабатываем решения, которые помогают <span>372 тысячам сотрудников</span>{" "}
            группы работать с максимальным технологическим комфортом. А главное, что{" "}
            <span>миллионы покупателей</span> могут быстро и удобно покупать свежие
            продукты — благодаря нашей работе.
        </>
    ),
    description:
        "X5 Group — российская розничная торговая компания, которая управляет продуктовыми торговыми сетями «Пятёрочка», «Перекрёсток» и «Чижик», а также цифровыми сервисами: Vprok.ru, «Перекрёсток», 5Post, «Много лосося».",
    items: [
        {
            id: 1,
            content: {
                type: "text",
                title: "4 300+",
                descriptor: "специалистов всех направлений",
            },
            sibling: {
                mode: "vertical",
                content: {
                    type: "image",
                    image: "/assets/images/home/about/item-1.svg",
                },
            },
        },
        {
            id: 2,
            content: {
                type: "image",
                image: "/assets/images/home/about/item-2.svg",
            },
            sibling: {
                content: {
                    type: "text",
                    title: "30+",
                    descriptor: "цифровых продуктов: от небольших до крупных",
                },
            },
        },
        {
            id: 3,
            content: {
                type: "image",
                image: "/assets/images/home/about/item-3.svg",
            },
            sibling: {
                content: {
                    type: "text",
                    title: "400+",
                    descriptor: "проектов в работе прямо сейчас",
                },
            },
        },
        {
            id: 4,
            content: {
                type: "text",
                smallTitle: true,
                title: "10 000 Тб",
                descriptor: "объем хранения кластера больших данных",
                badge: {
                    type: "icon",
                    icon: "/assets/images/home/about/badge-1-icon.svg",
                    label: "85%",
                    text: "сотрудников выбирают удаленную работу",
                },
            },
            sibling: {
                mode: "vertical",
                content: {
                    type: "image",
                    image: "/assets/images/home/about/item-4.svg",
                },
            },
        },
        {
            id: 5,
            content: {
                type: "image",
                image: "/assets/images/home/about/item-5.svg",
            },
        },
        {
            id: 6,
            content: {
                type: "text",
                title: "324",
                descriptor: "информационных системы в эксплуатации",
            },
            sibling: {
                mode: "vertical",
                content: {
                    type: "image",
                    image: "/assets/images/home/about/item-6.svg",
                    badge: {
                        type: "left-text",
                        leftText: "55%+",
                        text: "сотрудников ежегодно проходят обучающие программы",
                    },
                },
            },
        },
        {
            id: 7,
            content: {
                type: "image",
                image: "/assets/images/home/about/item-7.svg",
            },
        },
        {
            id: 8,
            content: {
                type: "image",
                image: "/assets/images/home/about/item-8.svg",
            },
        },
        {
            id: 9,
            content: {
                type: "text",
                title: "1400",
                descriptor: "физических серверов",
            },
        },
    ],
};

export const WHAT_WE_DO = {
    title: "Что мы делаем?",
    descriptor: "Решения для бесперебойной работы более 20 000 магазинов",
    items: [
        {
            id: 1,
            title: "X5 Транспорт",
            text: "Масштабный продукт автоматизации грузоперевозок. Включает в себя несколько веб-приложений, мобильные приложения, API для интеграции с партнерами, обработку телеметрии. К системе подключено более 4 тыс. грузовиков.",
            image: "/assets/images/home/what-we-do/item-1.png",
            footerIcons: [
                "/assets/images/home/what-we-do/icons/icon-q.svg",
                "/assets/images/home/what-we-do/icons/icon-sharp.svg",
            ],
        },
        {
            id: 2,
            title: "Customer Value Management",
            text: "Обеспечивает подбор индивидуальных предложений для покупателя, учитывая индивидуальные предпочтения покупателя.",
            image: "/assets/images/home/what-we-do/item-2.png",
            footerIcons: [
                "/assets/images/home/what-we-do/icons/swift.svg",
                "/assets/images/home/what-we-do/icons/ts.svg",
                "/assets/images/home/what-we-do/icons/docker.svg",
                "/assets/images/home/what-we-do/icons/vue.svg",
            ],
        },
        {
            id: 3,
            title: "Обратная связь",
            text: "Cистема сбора обратной связи от покупателей, которая помогает подразделениям быстро инициировать изменения и улучшения.<br/><br/>Обратную связь предоставляют более 3 миллионов покупателей каждый месяц.",
            image: "/assets/images/home/what-we-do/item-3.png",
            footerIcons: [
                "/assets/images/home/what-we-do/icons/swift.svg",
                "/assets/images/home/what-we-do/icons/1c.svg",
            ],
        },
        {
            id: 4,
            title: "X5 Транспорт",
            text: "Масштабный продукт автоматизации грузоперевозок. Включает в себя несколько веб-приложений, мобильные приложения, API для интеграции с партнерами, обработку телеметрии. К системе подключено более 4 тыс. грузовиков.",
            image: "/assets/images/home/what-we-do/item-1.png",
            footerIcons: [
                "/assets/images/home/what-we-do/icons/icon-q.svg",
                "/assets/images/home/what-we-do/icons/icon-sharp.svg",
            ],
        },
        {
            id: 5,
            title: "Customer Value Management",
            text: "Обеспечивает подбор индивидуальных предложений для покупателя, учитывая индивидуальные предпочтения покупателя.",
            image: "/assets/images/home/what-we-do/item-2.png",
            footerIcons: [
                "/assets/images/home/what-we-do/icons/swift.svg",
                "/assets/images/home/what-we-do/icons/ts.svg",
                "/assets/images/home/what-we-do/icons/docker.svg",
                "/assets/images/home/what-we-do/icons/vue.svg",
            ],
        },
        {
            id: 6,
            title: "Обратная связь",
            text: "Cистема сбора обратной связи от покупателей, которая помогает подразделениям быстро инициировать изменения и улучшения.<br/><br/>Обратную связь предоставляют более 3 миллионов покупателей каждый месяц.",
            image: "/assets/images/home/what-we-do/item-3.png",
            footerIcons: [
                "/assets/images/home/what-we-do/icons/swift.svg",
                "/assets/images/home/what-we-do/icons/1c.svg",
            ],
        },
    ],
};

export const WHY_US = {
    title: "Почему у нас круто",
    items: [
        {
            id: 1,
            image: "/assets/images/home/why-us/item-1.png",
            name: "Х5 — это стабильная компания с большим будущем",
            text: "У нас есть ресурсы для развития и новых амбициозных проектов. С нами — спокойно и уверенно.",
        },
        {
            id: 2,
            image: "/assets/images/home/why-us/item-2.png",
            name: "Нашими решениями пользуются тысячи коллег и миллионы клиентов",
            text: "Мы развиваем технологии, которыми пользуются миллионы человек — это очень приятно. Ради этого чувства хочется ходить на работу каждый день. Нам повезло: результат нашей работы можно увидеть на полке, потрогать.",
        },
        {
            id: 3,
            image: "/assets/images/home/why-us/item-3.png",
            name: "Сообщества экспертов: можно общаться и обмениваться опытом.",
            text: "Мы нанимаем лучших специалистов — людей, у которых есть чему поучиться. Активно ходим митапы и конференции (внутри и снаружи). Коллеги из разных подразделений устраивают демо-дни и показывают, чем занимаются — это помогает быть в курсе и быстро находить ответы на важные вопросы.",
        },
        {
            id: 4,
            image: "/assets/images/home/why-us/item-4.png",
            name: "В Х5 много проектов и направлений, между которыми можно перемещаться",
            text: "Поддерживаем ротацию внутри компании. Попробуйте себя в разных проектах и найдите свой. Компания приветствует такие горизонтальные перемещения. Приходите в X5 и не бойтесь «не попасть» с первого раза — в компании есть много разносторонних задач.",
        },
        {
            id: 5,
            image: "/assets/images/home/why-us/item-5.png",
            name: "Мы поможем развиваться",
            text: "Есть всё для развития: коллеги, которые делятся опытом, платформы для обучения, внутренние и внешние курсы. А еще — сложные проекты и новые технологии. При этом мы не заставляем учиться. Но создаем среду, в которой это хочется и приятно делать.",
        },
        {
            id: 6,
            image: "/assets/images/home/why-us/item-6.png",
            name: "Гибкий формат работы",
            text: "В X5 можно работать в офисе, дома или совмещать — как комфортнее для себя и команды. Мы оцениваем сотрудников по результату, а не по количеству проведенных в офисе часов. Удаленным сотрудникам мы доставляем на дом все необходимое оборудование. А еще мы реорганизовали офис, чтобы в нём было еще удобнее.",
        },
    ],
};

export const VACANCY_SECTIONS = {
    title: "Наши команды",
    mobTitle: "Кого мы ищем?",
    items: [
        {
            url: "#1",
            quantity: 12,
            name: "Front-end",
            description:
                "По пятницам играем в Hearthstone<br/><br/>По пятницам играем в Hearthstone",
        },
        {
            url: "#2",
            quantity: 12,
            name: "Back-end",
            description: "Дадим крутые мышки <br/><br/>По пятницам играем в Hearthstone",
        },
        {
            url: "#3",
            quantity: 12,
            name: "DevOps",
            description: "Дадим крутые мышки <br/><br/>По пятницам играем в Hearthstone",
        },
        {
            url: "#4",
            quantity: 12,
            name: "Дизайн",
            description: "Дадим крутые мышки <br/><br/>По пятницам играем в Hearthstone",
        },
        {
            url: "#5",
            quantity: 12,
            name: "Мобильные приложения",
            description: "Дадим крутые мышки <br/><br/>По пятницам играем в Hearthstone",
        },
        {
            url: "#6",
            quantity: 12,
            name: "Сетевая безопасность",
            description: "Дадим крутые мышки <br/><br/>По пятницам играем в Hearthstone",
        },
        {
            url: "#7",
            quantity: 12,
            name: "Тестирование",
            description: "Дадим крутые мышки <br/><br/>По пятницам играем в Hearthstone",
        },
        {
            url: "#8",
            quantity: 12,
            name: "QA",
            description: "Дадим крутые мышки <br/><br/>По пятницам играем в Hearthstone",
        },
        {
            url: "#9",
            quantity: 12,
            name: "Менеджмент",
            description: "Дадим крутые мышки <br/><br/>По пятницам играем в Hearthstone",
        },
        {
            url: "#10",
            quantity: 12,
            name: "Поддержка",
            description: "Дадим крутые мышки <br/><br/>По пятницам играем в Hearthstone",
        },
        {
            url: "#11",
            quantity: 12,
            name: "Big Data",
            description: "Дадим крутые мышки <br/><br/>По пятницам играем в Hearthstone",
        },
        {
            url: "#12",
            quantity: 12,
            name: "Аналитика",
            description: "Дадим крутые мышки <br/><br/>По пятницам играем в Hearthstone",
        },
    ],
};

export const FOOTER = {
    icon: "/assets/images/home/footer/raccoon.svg",
    title: "Давай к нам в X5 Tech!",
    items: [
        {
            image: "/assets/images/home/footer/item-1.png",
            name: "С любовью к технологиям",
        },
        {
            image: "/assets/images/home/footer/item-2.png",
            name: "Работаем с удовольствием!",
        },
        {
            image: "/assets/images/home/footer/item-3.png",
            name: "У нас классно!",
        },
        {
            image: "/assets/images/home/footer/item-4.png",
            name: "Мы поможем развиваться",
        },
    ],
};

export const STACK = {
    title: "Работаем на передовых технологиях",
    badges: [
        {
            title: "Vue.js",
            image: "/assets/images/home/stack/vue.svg",
        },
        {
            title: "TypeScript",
            image: "/assets/images/home/stack/ts.svg",
        },
        {
            title: "GO",
            image: "/assets/images/home/stack/go.svg",
        },
        {
            title: "k8s",
            image: "/assets/images/home/stack/kuber.svg",
        },
        {
            title: "Python",
            image: "/assets/images/home/stack/python.svg",
        },
        {
            title: "Docker",
            image: "/assets/images/home/stack/docker.svg",
        },
        {
            title: "1C",
            image: "/assets/images/home/stack/1c.svg",
        },
        {
            title: "Allure",
            image: "/assets/images/home/stack/allure.svg",
        },
        {
            title: "JSX",
            image: "/assets/images/home/stack/jsx.svg",
        },
        {
            title: "Kotlin",
            image: "/assets/images/home/stack/kotlin.svg",
        },
        {
            title: "C#",
            image: "/assets/images/home/stack/csharp.svg",
        },
        {
            title: "Java",
            image: "/assets/images/home/stack/java.svg",
        },
    ],
};
