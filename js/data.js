// Варианты значений imagePosition для настройки позиции фото:
// "center 20%" - центр по горизонтали, 20% сверху
// "center top" - показывает верх фото
// "center center" - по центру (по умолчанию)
// "center bottom" - показывает низ
// "center 30%", "center 40%" и т.д. - точная позиция в процентах

const categories = [
    {
        id: 1,
        name: "Red Line",
        description: "Моновкусы, средняя крепость, для тех, кто знаком с кальяном, но курит не регулярно.",
        image: "images/red-line.webp",
        services: [
            {
                id: 101,
                name: "Абрикос",
                description: "Абрикос - бархатистая классика в самом сочном исполнении. Густой, почти джемовый профиль спелого плода со сливочным послевкусием. Вкус, который разливается мягким фруктовым нектаром и оставляет ощущение бесконечного лета",
                username: "user1",
                image: "images/redline/red-1.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 102,
                name: "Банан в шоколаде",
                description: "Десертный банан с бархатистой сладостью, политый сиропом из темного шоколада для приятного контраста во вкусе.",
                username: "user2",
                image: "images/redline/red-2.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 103,
                name: "Персиковый чай",
                description: "Прохладительный напиток на основе черного чая с добавлением кусочков свежего персика.",
                username: "user3",
                image: "images/redline/red-3.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 104,
                name: "Кола",
                description: "Сбалансированный в меру сладкий вкус колы, знакомый тебе по мармеладкам Haribo.",
                username: "user4",
                image: "images/redline/red-4.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 105,
                name: "Малина",
                description: "Просто хорошая малина, которую мы постарались сделать максимально похожей на натуральную.",
                username: "user5",
                image: "images/redline/red-5.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 106,
                name: "Манго шейк",
                description: "Нежный коктейль из взбитых сливок и пюре желтого манго.",
                username: "user6",
                image: "images/redline/red-6.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 107,
                name: "Индийский перец",
                description: "Многогранный пряный вкус с нотами ванили и четырех видов специй.",
                username: "user7",
                image: "images/redline/red-7.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 108,
                name: "Ледяное яблоко",
                description: "Отсылка к «двойному яблоку», кисло-холодящие освежающие ноты зеленых яблок.",
                username: "user8",
                image: "images/redline/red-8.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 109,
                name: "Мороженное",
                description: "Вкус мороженого.",
                username: "user9",
                image: "images/redline/red-9.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 110,
                name: "Суперперец",
                description: "Special for JohnCalliano",
                username: "user10",
                image: "images/redline/red-10.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 111,
                name: "Зефир с орехами",
                description: "Выраженные сливочные ноты воздушного зефира, дополненные ароматом фундука.",
                username: "user11",
                image: "images/redline/red-11.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 112,
                name: "Коктейль Маргарита",
                description: "Лаймово-алкогольный вкус коктейля Маргарита, употребляйте в соло или используйте для коктейльных миксов с цитрусами.",
                username: "user12",
                image: "images/redline/red-12.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 113,
                name: "Киви",
                description: "Насыщенный вкус натурального киви с будоражащей рецепторы кислинкой на выдохе.",
                username: "user13",
                image: "images/redline/red-13.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 114,
                name: "Клубника",
                description: "Сладкий и завораживающий вкус спелой ягоды, созревшей под нежным июньским солнышком. Влюбляет в себя с первых затяжек.",
                username: "user14",
                image: "images/redline/red-14.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 115,
                name: "Голубика",
                description: "Аромат натуральной голубики со всей полнотой ягодного вкуса на вдохе и выдохе.",
                username: "user15",
                image: "images/redline/red-15.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 116,
                name: "Ягодный микс",
                description: "Сладкая клубника, кислая малина и терпкая черная смородина в потрясающем ягодном тандеме.",
                username: "user16",
                image: "images/redline/red-16.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 117,
                name: "Тархун",
                description: "Тот самый лимонад со вкусом сладкого эстрагона – травянисто, освежающе.",
                username: "user17",
                image: "images/redline/red-17.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 118,
                name: "Оливка",
                description: "Самый необычный вкус - консервированная оливка, с изумительным подкопченым послевкусием. Для гурманов.",
                username: "user18",
                image: "images/redline/red-18.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 119,
                name: "Чай с молоком",
                description: "Классический черный чай с молоком",
                username: "user19",
                image: "images/redline/red-19.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 120,
                name: "Лед",
                description: "Идеальный бустер для любителей миксов с выраженным охлаждающим эффектом.",
                username: "user20",
                image: "images/redline/red-20.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 121,
                name: "Гранатовый чай",
                description: "Крепкий зеленый чай с кусочками терпкого граната, выразительный и яркий вкус.",
                username: "user21",
                image: "images/redline/red-21.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 122,
                name: "Арбуз",
                description: "Летний освежающий вкус арбуза без корочки, больше напоминает арбузный сок.",
                username: "user22",
                image: "images/redline/red-22.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 123,
                name: "Персик",
                description: "Сладкий и слегка терпкий микс двух не похожих друг на друга сортов персика",
                username: "user23",
                image: "images/redline/red-23.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 124,
                name: "Зеленый виноград",
                description: "Молодой зеленый виноград с легким оттенком тростниковой мяты.",
                username: "user24",
                image: "images/redline/red-24.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 125,
                name: "Цветочный мед",
                description: "Свежий густой сладкий мед, только что собранный с цветущих весенних лугов.",
                username: "user25",
                image: "images/redline/red-25.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 126,
                name: "Мята",
                description: "Свежий мятный аромат на балансе между тростниковой и перечной мятой.",
                username: "user26",
                image: "images/redline/red-26.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 127,
                name: "Дачная смородина",
                description: "Роскошный аромат зеленых листьев смородинного куста и спелой налитой ягоды.",
                username: "user27",
                image: "images/redline/red-27.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 128,
                name: "Пряный чай",
                description: "Крепкий черный чай с ассорти из турецких пряностей, необычный и притягательный вкус.",
                username: "user28",
                image: "images/redline/red-28.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 129,
                name: "Дыня с корицей",
                description: "Сладкая спелая дыня и пряные обволакивающие ноты корицы на выдохе – превосходный дуэт.",
                username: "user29",
                image: "images/redline/red-29.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 130,
                name: "Ягодный джем",
                description: "Очень вкусный ягодный десерт из ассорти лесных и садовых ягод.",
                username: "user30",
                image: "images/redline/red-30.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 131,
                name: "Домашний пирог",
                description: "Сладкая сдобная выпечка со сливочным ароматом, напоминающим начинку из сгущенки.",
                username: "user31",
                image: "images/redline/red-31.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 132,
                name: "Груша",
                description: "Вкус натуральной сладкой груши.",
                username: "user32",
                image: "images/redline/red-32.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 133,
                name: "Фруктовый микс",
                description: "Нестандартное тропическое сочетание с ведущими нотами спелого ананаса, послевкусием кокосовой мякоти и свежего абрикосового желе.",
                username: "user33",
                image: "images/redline/red-33.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 134,
                name: "Ананас",
                description: "Хороший, вкусный, кисло-сладкий ананас.",
                username: "user34",
                image: "images/redline/red-34.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 135,
                name: "Фейхоа",
                description: "Яркий фейхоа с характерными сладко-травянистым тропическим вкусом",
                username: "user35",
                image: "images/redline/red-35.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 136,
                name: "Гуава",
                description: "Густой, сладкий и травянистый вкус натуральной гуавы, отлично дополняющий фруктовые и коктейльные миксы.",
                username: "user36",
                image: "images/redline/red-36.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 137,
                name: "Манго",
                description: "Яркое травянистое манго, очень близкое по вкусу к настоящему тайскому манго.",
                username: "user37",
                image: "images/redline/red-37.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Black Line",
        description: "Моновкусы, крепость выше средней, для более опытных курильщиков.",
        image: "images/black-line.webp",
        services: [
            {
                id: 201,
                name: "Черный чай",
                description: "Насыщенный и глубокий вкус классического чая с тонкой терпкостью и легкой цитрусовой нотой бергамота в линейке Black Line (повышенной крепости). Здесь гармонично сочетается мягкая сладость, благородная горчинка и приятная свежесть, что делает вкус универсальным как для соло-забивок, так и для миксов с фруктами и ягодами.",
                username: "user201",
                image: "images/blackline/black-1.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 202,
                name: "Лимонная конфета",
                description: "Классические лимонные леденцы, сладкий конфетный цитрусовый вкус.",
                username: "user202",
                image: "images/blackline/black-2.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 203,
                name: "Маргарита",
                description: "Лаймово-алкогольный вкус коктейля Маргарита, употребляйте в соло или используйте для коктейльных миксов с цитрусами.",
                username: "user203",
                image: "images/blackline/black-3.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 204,
                name: "Груша",
                description: "Вкус сладкой натуральной груши.",
                username: "user204",
                image: "images/blackline/black-4.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 205,
                name: "Клубничный лимонад",
                description: "Газированный напиток с клубничным сиропом и цитрусовыми лимонадными нотами на послевкусии",
                username: "user205",
                image: "images/blackline/black-5.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 206,
                name: "Кислая малина",
                description: "Мы все ждем лета. Как оно прекрасно, дивно. \nНе за горами его зной, веселье, смех. \nА если свежести захочется - есть Кислая малина, \nНовый вкус Hypreme для каждого и всех!",
                username: "user206",
                image: "images/blackline/black-6.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 207,
                name: "Манго шейк",
                description: "Нежный коктейль из взбитых сливок и пюре желтого манго.",
                username: "user207",
                image: "images/blackline/black-7.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 208,
                name: "Лимонад",
                description: "Базовый цитрусовый лимонад, уверенная классика и ничего лишнего.",
                username: "user208",
                image: "images/blackline/black-8.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 209,
                name: "Черничный шейк",
                description: "Нежный коктейль на основе молочных сливок с добавлением цельных ягод натуральной черники с характерной приятной вяжущей ноткой.",
                username: "user209",
                image: "images/blackline/black-9.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 210,
                name: "Малиновая гранита",
                description: "Холодный итальянский десерт, наподобие сорбета, из свежих ягод малины.",
                username: "user210",
                image: "images/blackline/black-10.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 211,
                name: "Кислая маракуйя",
                description: "Не такая, как все… Яркая кислая маракуйя с насыщенным натуральным тропическим вкусом.",
                username: "user211",
                image: "images/blackline/black-11.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 212,
                name: "Апельсин",
                description: "Вкус апельсина",
                username: "user212",
                image: "images/blackline/black-12.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 213,
                name: "Лимонное суфле",
                description: "Воздушная десертная выпечка с добавлением ароматной лимонной цедры.",
                username: "user213",
                image: "images/blackline/black-13.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 214,
                name: "Кактус",
                description: "Растительный вкус, сладкий и освежающий, с долгим травянистым послевкусием – так мы представляем себе кактус.",
                username: "user214",
                image: "images/blackline/black-14.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 215,
                name: "Крыжовник",
                description: "Яркий и сочный аромат крыжовника с мягкой кислинкой.",
                username: "user215",
                image: "images/blackline/black-15.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 216,
                name: "Дынный чизкейк",
                description: "Легкий вкусный тортик, украшенный сверху дынными дольками – безупречный фруктово-десертный тандем.",
                username: "user216",
                image: "images/blackline/black-16.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 217,
                name: "Арбуз",
                description: "Летний освежающий вкус арбуза без корочки, больше напоминает арбузный сок.",
                username: "user217",
                image: "images/blackline/black-17.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 218,
                name: "Ягодный микс",
                description: "Сладкая клубника, кислая малина и терпкая черная смородина в потрясающем ягодном тандеме.",
                username: "user218",
                image: "images/blackline/black-18.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 219,
                name: "Голубика",
                description: "Вкус голубики",
                username: "user219",
                image: "images/blackline/black-19.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 220,
                name: "Красный виноград",
                description: "Сладкий, терпкий, насыщенный вкус спелого красного винограда с отдаленной кислинкой на послевкусии.",
                username: "user220",
                image: "images/blackline/black-20.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
            {
                id: 221,
                name: "Мята",
                description: "Свежий мятный аромат на балансе между тростниковой и перечной мятой.",
                username: "user221",
                image: "images/blackline/black-21.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40, price: 240 },
                    { grams: 100, price: 590 },
                    { grams: 200, price: 1040 }
                ]
            },
        ]
    },
    {
        id: 3,
        name: "Mix Line",
        description: "Готовые миксы, собранные на основе моновкусов линеек Red и Black, отличный вариант для быстрого, удобного, бюджетного покура.",
        image: "images/mix-line.webp",
        services: [
            {
                id: 301,
                name: "Пломбир, арбуз, дыня",
                description: "Нежный аромат сливочного пломбира переплетается с сочностью арбуза и сладостью дыни, создавая мягкий и свежий микс",
                username: "user301",
                image: "images/mixline/mix-1.webp",
                imagePosition: "center 40%",
                weights: [
                { grams: 25, price: 150 }
                ]
            },
            {
                id: 302,
                name: "Груша, кактус, маргарита",
                description: "Сочная груша, свежий вкус кактуса и оригинальный коктейль Маргарита создают интересный и необычный микс вкусов",
                username: "user302",
                image: "images/mixline/mix-2.webp",
                imagePosition: "center 40%",
                weights: [
                { grams: 25, price: 150 }
                ]
            },
            {
                id: 303,
                name: "Манго, маракуйя, личи ",
                description: "Классический сладкий микс: манго, маракуйя, личи. ",
                username: "user303",
                image: "images/mixline/mix-3.webp",
                imagePosition: "center 40%",
                weights: [
                { grams: 25, price: 150 }
                ]
            },
            {
                id: 304,
                name: "Арбуз, манго, молочный коктейль",
                description: "Вкус, отдаленно напоминающий «Мажитель». Сладкие фрукты собавлением молока и небольшой холодинкой мякоти арбуза.",
                username: "user304",
                image: "images/mixline/mix-4.webp",
                imagePosition: "center 40%",
                weights: [
                { grams: 25, price: 150 }
                ]
            },
            {
                id: 305,
                name: "Манго, зелёный виноград",
                description: "Сладкое тропическое сочетание с ведущим манго, идеальное в качестве премикса и ненавязчивое в соло",
                username: "user305",
                image: "images/mixline/mix-5.webp",
                imagePosition: "center 40%",
                weights: [
                { grams: 25, price: 150 }
                ]
            },
            {
                id: 306,
                name: "Мёд, дыня, персиковый чай",
                description: "Сбалансированный вкус чая с медом и нежными деликатными нотами дыни и персика. Сладкий.",
                username: "user306",
                image: "images/mixline/mix-6.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25, price: 150 }
                ]
            },
            {
                id: 307,
                name: "Малина, сливки, кокосовое молоко",
                description: "Малина, сливки, кокосовое молоко",
                username: "user307",
                image: "images/mixline/mix-7.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25, price: 150 }
                ]
            },
            {
                id: 308,
                name: "Кола, ананас, смородина",
                description: "Напиточный микс на основе колы с кислинкой ананаса и сластинкой смородины.",
                username: "user308",
                image: "images/mixline/mix-8.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25, price: 150 }
                ]
            },
            {
                id: 309,
                name: "Яблоко, тархун, фейхоа",
                description: "Яблоко, тархун, фейхоа",
                username: "user309",
                image: "images/mixline/mix-9.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25, price: 150 }
                ]
            },
            {
                id: 310,
                name: "Мармелад, ягодный мусс",
                description: "Сочетание сладкого мармелада с нежным ягодным муссом дарит взрыв вкуса: сладость встречается с лёгкой кислинкой, создавая мягкий и запоминающийся микс",
                username: "user310",
                image: "images/mixline/mix-10.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25, price: 150 }
                ]
            },
            {
                id: 311,
                name: "Кола, апельсин, кашмир",
                description: "Кола, апельсин, кашмир.",
                username: "user311",
                image: "images/mixline/mix-11.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25, price: 150 }
                ]
            },
            {
                id: 312,
                name: "Газировка, цитрусы, ананас",
                description: "Газировка, цитрусы, ананас",
                username: "user312",
                image: "images/mixline/mix-12.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25, price: 150 }
                ]
            },
            {
                id: 313,
                name: "Банан, сливки, клубника",
                description: "Микс с ароматом банана, сливок и клубники",
                username: "user313",
                image: "images/mixline/mix-13.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25, price: 150 }
                ]
            },
            {
                id: 314,
                name: "Кислая вишня, малина, крыжовник",
                description: "Яркая кислинка вишни сочетается с сочной малиной и терпким крыжовником, создавая насыщенный и освежающий микс с глубоким ароматом",
                username: "user314",
                image: "images/mixline/mix-14.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25, price: 150 }
                ]
            },
            {
                id: 315,
                name: "Мята, смородина,зеленый виноград",
                description: "Сладкие дачные ягоды с травянистой нотой, поддержанной зеленым виноградом и сладкой мятой.",
                username: "user315",
                image: "images/mixline/mix-15.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25, price: 150 }
                ]
            },
        ]
    },
    {
        id: 4,
        name: "Special",
        description: "Интересная безароматика и бустеры для тех, кто предпочитает что-то аутентичное и особенное.",
        image: "images/special-line.webp",
        services: [
            {
                id: 401,
                name: "Hustla",
                description: "Безароматический бленд крепостью выше-средней.",
                username: "user405",
                image: "images/specialline/special-1.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 40, price: 240 },
                { grams: 100, price: 590 },
                { grams: 200, price: 1040 }
                ]
            },
            {
                id: 402,
                name: "John Wick",
                description: "Крепкая безаромка с нотками чернослива.",
                username: "user406",
                image: "images/specialline/special-2.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 40, price: 240 },
                { grams: 100, price: 590 },
                { grams: 200, price: 1040 }
                ]
            },
            {
                id: 403,
                name: "Баба Яга",
                description: "Дескрипторы: терпкие болотные травы, землистые коренья и древесная кора, дополненные густым ароматом печного дыма и влажной почвы.",
                username: "user407",
                image: "images/specialline/special-3.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 40, price: 240 },
                { grams: 100, price: 590 },
                { grams: 200, price: 1040 }
                ]
            },
            {
                id: 404,
                name: "Pimp",
                description: "Безароматический бленд средней крепости.",
                username: "user408",
                image: "images/specialline/special-4.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 40, price: 240 },
                { grams: 100, price: 590 },
                { grams: 200, price: 1040 }
                ]
            }
        ]
    },
    {
        id: 5,
        name: "Special Alco",
        description: "Алкогольные вкусы",
        image: "images/specialalco-line.webp",
        services: [
            {
                id: 501,
                name: "Vulin",
                description: "Безароматика, полученная по технологии холодной ферментации табака на алкоголе – шотландском виски 16-летней выдержки",
                username: "user401",
                image: "images/specialalcoline/specialalco-1.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25, price: 240 },
                { grams: 200, price: 1800 }
                ]
            },
            {
                id: 502,
                name: "Cardi",
                description: "Новый вкус в коллекции special. Холодная ферментация на алкоголе ноты: кубинский ром, дым, пряности, дуб, сладкие специи.",
                username: "user402",
                image: "images/specialalcoline/specialalco-2.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25, price: 240 },
                { grams: 200, price: 1800 }
                ]
            },
            {
                id: 503,
                name: "Froig",
                description: "Безароматика, полученная по технологии холодной ферментации табака на алкоголе – шотландском виски 10-летней выдержки.",
                username: "user403",
                image: "images/specialalcoline/specialalco-3.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25, price: 240 },
                { grams: 200, price: 1800 }
                ]
            },
            {
                id: 504,
                name: "Jaku",
                description: "Безароматика, полученная по технологии холодной ферментации табака на алкоголе – японском джине.",
                username: "user404",
                image: "images/specialalcoline/specialalco-4.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25, price: 240 },
                { grams: 200, price: 1800 }
                ]
            }
        ]
    }
];