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
        priceKey: "redline",
        description: "Моновкусы, средняя крепость, для тех, кто знаком с кальяном, но курит не регулярно.",
        image: "images/red-line.webp",
        services: [
            {
                id: 101,
                name: "Ананас",
                description: "Хороший, вкусный, кисло-сладкий ананас.",
                username: "user101",
                image: "images/redline/red-1.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 102,
                name: "Арбуз",
                description: "Летний освежающий вкус арбуза без корочки, больше напоминает арбузный сок.",
                username: "user102",
                image: "images/redline/red-2.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 103,
                name: "Банан в шоколаде",
                description: "Десертный банан с бархатистой сладостью, политый сиропом из темного шоколада для приятного контраста во вкусе.",
                username: "user103",
                image: "images/redline/red-3.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 104,
                name: "Голубика",
                description: "Аромат натуральной голубики со всей полнотой ягодного вкуса на вдохе и выдохе.",
                username: "user104",
                image: "images/redline/red-4.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 105,
                name: "Гранатовый чай",
                description: "Крепкий зеленый чай с кусочками терпкого граната, выразительный и яркий вкус.",
                username: "user105",
                image: "images/redline/red-5.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 106,
                name: "Гуава",
                description: "Густой, сладкий и травянистый вкус натуральной гуавы, отлично дополняющий фруктовые и коктейльные миксы.",
                username: "user106",
                image: "images/redline/red-6.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 107,
                name: "Дачная смородина",
                description: "Роскошный аромат зеленых листьев смородинного куста и спелой налитой ягоды.",
                username: "user107",
                image: "images/redline/red-7.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 108,
                name: "Домашний пирог",
                description: "Сладкая сдобная выпечка со сливочным ароматом, напоминающим начинку из сгущенки.",
                username: "user108",
                image: "images/redline/red-8.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 109,
                name: "Дыня с корицей",
                description: "Сладкая спелая дыня и пряные обволакивающие ноты корицы на выдохе – превосходный дуэт.",
                username: "user109",
                image: "images/redline/red-9.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 110,
                name: "Зеленый виноград",
                description: "Молодой зеленый виноград с легким оттенком тростниковой мяты.",
                username: "user110",
                image: "images/redline/red-10.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 111,
                name: "Зефир с орехами",
                description: "Выраженные сливочные ноты воздушного зефира, дополненные ароматом фундука.",
                username: "user111",
                image: "images/redline/red-11.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 112,
                name: "Индийский перец",
                description: "Многогранный пряный вкус с нотами ванили и четырех видов специй.",
                username: "user112",
                image: "images/redline/red-12.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 113,
                name: "Киви",
                description: "Насыщенный вкус натурального киви с будоражащей рецепторы кислинкой на выдохе.",
                username: "user113",
                image: "images/redline/red-13.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 114,
                name: "Клубника",
                description: "Сладкий и завораживающий вкус спелой ягоды, созревшей под нежным июньским солнышком. Влюбляет в себя с первых затяжек.",
                username: "user114",
                image: "images/redline/red-14.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 115,
                name: "Кола",
                description: "Сбалансированный в меру сладкий вкус колы, знакомый тебе по мармеладкам Haribo.",
                
                username: "user115",
                image: "images/redline/red-15.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 116,
                name: "Лёд",
                description: "Идеальный бустер для любителей миксов с выраженным охлаждающим эффектом.",
                username: "user116",
                image: "images/redline/red-16.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 117,
                name: "Ледяное яблоко",
                description: "Отсылка к «двойному яблоку», кисло-холодящие освежающие ноты зеленых яблок.",
                username: "user117",
                image: "images/redline/red-17.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 118,
                name: "Личи",
                description: "Сочный и нежный вкус личи — экзотическая тропическая ягода со сладко-цветочным ароматом и лёгкой кислинкой.",
                username: "user118",
                image: "images/redline/red-18.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 119,
                name: "Малина",
                description: "Просто хорошая малина, которую мы постарались сделать максимально похожей на натуральную.",
                username: "user119",
                image: "images/redline/red-19.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 120,
                name: "Манго шейк",
                description: "Нежный коктейль из взбитых сливок и пюре желтого манго.",
                username: "user120",
                image: "images/redline/red-20.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 121,
                name: "Манго",
                description: "Яркое травянистое манго, очень близкое по вкусу к настоящему тайскому манго.",
                username: "user121",
                image: "images/redline/red-21.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 122,
                name: "Коктейль Маргарита",
                description: "Лаймово-алкогольный вкус коктейля Маргарита, употребляйте в соло или используйте для коктейльных миксов с цитрусами.",
                username: "user122",
                image: "images/redline/red-22.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 123,
                name: "Мороженое",
                description: "",
                username: "user123",
                image: "images/redline/red-23.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 124,
                name: "Мята",
                description: "Свежий мятный аромат на балансе между тростниковой и перечной мятой.",
                username: "user124",
                image: "images/redline/red-24.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 125,
                name: "Оливка",
                description: "Самый необычный вкус - консервированная оливка, с изумительным подкопченым послевкусием. Для гурманов.",
                username: "user125",
                image: "images/redline/red-25.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 126,
                name: "Персик",
                description: "Сладкий и слегка терпкий микс двух не похожих друг на друга сортов персика",
                username: "user126",
                image: "images/redline/red-26.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 127,
                name: "Персиковый чай",
                description: "Прохладительный напиток на основе черного чая с добавлением кусочков свежего персика.",
                username: "user127",
                image: "images/redline/red-27.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 128,
                name: "Пряный чай",
                description: "Крепкий черный чай с ассорти из турецких пряностей, необычный и притягательный вкус.",
                username: "user128",
                image: "images/redline/red-28.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 129,
                name: "Тархун",
                description: "Тот самый лимонад со вкусом сладкого эстрагона – травянисто, освежающе.",
                username: "user129",
                image: "images/redline/red-29.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 130,
                name: "Фейхоа",
                description: "Яркий фейхоа с характерными сладко-травянистым тропическим вкусом",
                username: "user130",
                image: "images/redline/red-30.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 131,
                name: "Фруктовый микс",
                description: "Нестандартное тропическое сочетание с ведущими нотами спелого ананаса, послевкусием кокосовой мякоти и свежего абрикосового желе.",
                username: "user131",
                image: "images/redline/red-31.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 132,
                name: "Цветочный мёд",
                description: "Свежий густой сладкий мед, только что собранный с цветущих весенних лугов.",
                username: "user132",
                image: "images/redline/red-32.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 133,
                name: "Чай с молоком",
                description: "Классический черный чай с молоком",
                username: "user133",
                image: "images/redline/red-33.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 134,
                name: "Ягодный джем",
                description: "Очень вкусный ягодный десерт из ассорти лесных и садовых ягод.",
                username: "user134",
                image: "images/redline/red-34.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            },
            {
                id: 135,
                name: "Ягодный микс",
                description: "Сладкая клубника, кислая малина и терпкая черная смородина в потрясающем ягодном тандеме.",
                username: "user135",
                image: "images/redline/red-35.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40 }, { grams: 100 }, { grams: 200 }]
            }
        ]
    },
    {
        id: 2,
        name: "Black Line",
        priceKey: "blackline",
        description: "Моновкусы, крепость выше средней, для более опытных курильщиков.",
        image: "images/black-line.webp",
        services: [
            {
                id: 201,
                name: "Апельсин",
                description: "Классический апельсин во всей многогранности натурального вкуса: сочная мякоть с легкой кислинкой и едва терпкой цитрусовой цедрой.",
                username: "user201",
                image: "images/blackline/black-1.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
            {
                id: 202,
                name: "Арбуз",
                description: "Летний освежающий вкус арбуза без корочки, больше напоминает арбузный сок.",
                username: "user202",
                image: "images/blackline/black-2.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
            {
                id: 203,
                name: "Голубика",
                description: "Аромат натуральной голубики со всей полнотой ягодного вкуса на вдохе и выдохе.",
                username: "user203",
                image: "images/blackline/black-3.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
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
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
            {
                id: 205,
                name: "Дынный чизкейк",
                description: "Легкий вкусный тортик, украшенный сверху дынными дольками – безупречный фруктово-десертный тандем.",
                username: "user205",
                image: "images/blackline/black-5.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
            {
                id: 206,
                name: "Кактус",
                description: "Растительный вкус, сладкий и освежающий, с долгим травянистым послевкусием – так мы представляем себе кактус",
                username: "user206",
                image: "images/blackline/black-6.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
            {
                id: 207,
                name: "Кислая малина",
                description: "Натуральная кислинка свежей малины с характерным ягодным ароматом и легкой вяжущей ноткой.",
                username: "user207",
                image: "images/blackline/black-7.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
            {
                id: 208,
                name: "Кислая маракуйя",
                description: "Не такая, как все… яркая кислая маракуйя с насыщенным натуральным тропическим вкусом.",
                username: "user208",
                image: "images/blackline/black-8.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
            {
                id: 209,
                name: "Клубничный лимонад",
                description: "Газированный напиток с клубничным сиропом и цитрусовыми лимонадными нотами на послевкусии.",
                username: "user209",
                image: "images/blackline/black-9.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
            {
                id: 210,
                name: "Красный виноград",
                description: "Сладкий, терпкий, насыщенный вкус спелого красного винограда с отдаленной кислинкой на послевкусии.",
                username: "user210",
                image: "images/blackline/black-10.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
            {
                id: 211,
                name: "Крыжовник",
                description: "Яркий и сочный аромат с мягкой кислинкой, напоминает о теплом лете и ягодах, только что сорванных с куста.",
                username: "user211",
                image: "images/blackline/black-11.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
            {
                id: 212,
                name: "Лимонад",
                description: "Базовый цитрусовый лимонад, уверенная классика и ничего лишнего",
                username: "user212",
                image: "images/blackline/black-12.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
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
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
            {
                id: 214,
                name: "Лимонные конфеты",
                description: "Классические лимонные леденцы – сладкий конфетный цитрусовый вкус.",
                username: "user214",
                image: "images/blackline/black-14.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
            {
                id: 215,
                name: "Малиновая гранита",
                description: "Холодный итальянский десерт, наподобие сорбета, из свежих ягод малины.",
                username: "user215",
                image: "images/blackline/black-15.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
            {
                id: 216,
                name: "Манго шейк",
                description: "Нежный коктейль из взбитых сливок и пюре желтого манго.",
                username: "user216",
                image: "images/blackline/black-16.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
            {
                id: 217,
                name: "Коктейль «Маргарита»",
                description: "Лаймово-алкогольный вкус коктейля Маргарита, употребляйте в соло или используйте для коктейльных миксов с цитрусами.",
                username: "user217",
                image: "images/blackline/black-17.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
            {
                id: 218,
                name: "Мята",
                description: "Свежий мятный аромат на балансе между тростниковой и перечной мятой.",
                username: "user218",
                image: "images/blackline/black-18.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
            {
                id: 219,
                name: "Черничный шейк",
                description: "Нежный коктейль на основе молочных сливок с добавлением цельных ягод натуральной черники с характерной приятной вяжущей ноткой.",
                username: "user219",
                image: "images/blackline/black-19.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
            {
                id: 220,
                name: "Черный чай",
                description: "Глубокий вкус листового черного чая с теплым танинным послевкусием и легкой приятной горчинкой.",
                username: "user220",
                image: "images/blackline/black-20.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
            {
                id: 221,
                name: "Ягодный микс",
                description: "Сладкая клубника, кислая малина и терпкая черная смородина в потрясающем ягодном тандеме.",
                username: "user221",
                image: "images/blackline/black-21.webp",
                imagePosition: "center 35%",
                weights: [
                    { grams: 40 },
                    { grams: 100 },
                    { grams: 200 }
                ]
            },
        ]
    },
    {
        id: 3,
        name: "Mix Line",
        priceKey: "mixline",
        description: "Готовые миксы, собранные на основе моновкусов линеек Red и Black, отличный вариант для быстрого, удобного, бюджетного покура.",
        image: "images/mix-line.webp",
        services: [
            {
                id: 301,
                name: "Арбуз, Манго, Молочный коктейль",
                description: "Вкус, отдаленно напоминающий «Мажитель». Сладкие фрукты собавлением молока и небольшой холодинкой мякоти арбуза.",
                image: "images/mixline/mix-1.webp",
                imagePosition: "center 40%",
                weights: [
                { grams: 25 }
                ]
            },
            {
                id: 302,
                name: "Киви, Фейхоа, Гуава",
                description: "",
                username: "user302",
                image: "images/mixline/mix-2.png",
                imagePosition: "center 40%",
                weights: [
                { grams: 25 }
                ]
            },
            {
                id: 303,
                name: "Персиковый чай, Дыня, Мёд ",
                description: "Сбалансированный вкус чая с медом и нежными деликатными нотами дыни и персика. Сладкий.",
                username: "user303",
                image: "images/mixline/mix-3.webp",
                imagePosition: "center 40%",
                weights: [
                { grams: 25 }
                ]
            },
            {
                id: 304,
                name: "Клубника, Банан, Сливки",
                description: "Микс с ароматом банана, сливок и клубники",
                username: "user304",
                image: "images/mixline/mix-4.webp",
                imagePosition: "center 40%",
                weights: [
                { grams: 25 }
                ]
            },
            {
                id: 305,
                name: "Груша, Маргарита, Кактус",
                description: "Сочная груша, свежий вкус кактуса и оригинальный коктейль Маргарита создают интересный и необычный микс вкусов.",
                username: "user305",
                image: "images/mixline/mix-5.webp",
                imagePosition: "center 40%",
                weights: [
                { grams: 25 }
                ]
            },
            {
                id: 306,
                name: "Кола, Ананас, Смородина",
                description: "Напиточный микс на основе колы с кислинкой ананаса и сластинкой смородины.",
                username: "user306",
                image: "images/mixline/mix-6.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25 }
                ]
            },
            {
                id: 307,
                name: "Манго, Зелёный виноград",
                description: "Сладкое тропическое сочетание с ведущим манго, идеальное в качестве премикса и ненавязчивое в соло.",
                username: "user307",
                image: "images/mixline/mix-7.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25 }
                ]
            },
            {
                id: 308,
                name: "Смородина, Зелёный виноград, Мята",
                description: "Сладкие дачные ягоды с травянистой нотой, поддержанной зеленым виноградом и сладкой мятой.",
                username: "user308",
                image: "images/mixline/mix-8.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25 }
                ]
            },
            {
                id: 309,
                name: "Кокосовое молоко, Малина, Сливки",
                description: "",
                username: "user309",
                image: "images/mixline/mix-9.png",
                imagePosition: "center 35%",
                weights: [
                { grams: 25 }
                ]
            },
            {
                id: 310,
                name: "Манго, маракуйя, личи",
                description: "Классический сладкий микс: манго, маракуйя, личи. ",
                username: "user310",
                image: "images/mixline/mix-10.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25 }
                ]
            },
            {
                id: 311,
                name: "Кола, Апельсин, Кашмир",
                description: "Кола, апельсин, кашмир.",
                username: "user311",
                image: "images/mixline/mix-11.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25 }
                ]
            },
            {
                id: 312,
                name: "Черника, Голубика, Смородина",
                description: "",
                username: "user312",
                image: "images/mixline/mix-12.png",
                imagePosition: "center 35%",
                weights: [
                { grams: 25 }
                ]
            },
            {
                id: 313,
                name: "Яблоко, Тархун, Фейхоа",
                description: "Яблоко, тархун, фейхоа.",
                username: "user313",
                image: "images/mixline/mix-13.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25 }
                ]
            },
            {
                id: 314,
                name: "Газировка, Цитрусы, Ананас",
                description: "",
                username: "user314",
                image: "images/mixline/mix-14.webp",
                imagePosition: "center 35%",
                weights: [
                { grams: 25 }
                ]
            },
        ]
    },
    {
        id: 4,
        name: "Special",
        priceKey: "special",
        description: "Интересная безароматика и бустеры для тех, кто предпочитает что-то аутентичное и особенное.",
        image: "images/special-line.webp",
        services: [
            {
                id: 401,
                name: "Hustla",
                description: "Безароматический бленд крепостью выше-средней.",
                username: "user405",
                image: "images/specialline/special-1.png",
                imagePosition: "center 35%",
                weights: [
                { grams: 40 },
                { grams: 100 },
                { grams: 200 }
                ]
            },
            {
                id: 402,
                name: "John Wick",
                description: "Крепкая безаромка с нотками чернослива.",
                username: "user406",
                image: "images/specialline/special-2.png",
                imagePosition: "center 35%",
                weights: [
                { grams: 40 },
                { grams: 100 },
                { grams: 200 }
                ]
            },
            {
                id: 403,
                name: "Pimp",
                description: "Безароматический бленд средней крепости.",
                username: "user407",
                image: "images/specialline/special-3.png",
                imagePosition: "center 35%",
                weights: [
                { grams: 40 },
                { grams: 100 },
                { grams: 200 }
                ]
            }
        ]
    },
    {
        id: 5,
        name: "Special Alco",
        priceKey: "specialalco",
        description: "Алкогольные вкусы",
        image: "images/specialalco-line.webp",
        services: [
            {
                id: 501,
                name: "Vulin",
                description: "Безароматика, полученная по технологии холодной ферментации табака на алкоголе – шотландском виски 16-летней выдержки",
                username: "user401",
                image: "images/specialalcoline/specialalco-1.png",
                imagePosition: "center 35%",
                weights: [
                { grams: 25 },
                { grams: 200 }
                ]
            },
            {
                id: 502,
                name: "Cardi",
                description: "Новый вкус в коллекции special. Холодная ферментация на алкоголе ноты: кубинский ром, дым, пряности, дуб, сладкие специи.",
                username: "user402",
                image: "images/specialalcoline/specialalco-2.png",
                imagePosition: "center 35%",
                weights: [
                { grams: 25 },
                { grams: 200 }
                ]
            },
            {
                id: 503,
                name: "Froig",
                description: "Безароматика, полученная по технологии холодной ферментации табака на алкоголе – шотландском виски 10-летней выдержки.",
                username: "user403",
                image: "images/specialalcoline/specialalco-3.png",
                imagePosition: "center 35%",
                weights: [
                { grams: 25 },
                { grams: 200 }
                ]
            },
            {
                id: 504,
                name: "Jaku",
                description: "Безароматика, полученная по технологии холодной ферментации табака на алкоголе – японском джине.",
                username: "user404",
                image: "images/specialalcoline/specialalco-4.png",
                imagePosition: "center 35%",
                weights: [
                { grams: 25 },
                { grams: 200 }
                ]
            }
        ]
    },
    {
        id: 6,
        name: "Double",
        priceKey: "double",
        description: "Идеальный выбор для тех, кто любит разнообразие и ценит удобство. В каждой пачке — два отдельных пакетика с разными вкусами из существующих линеек. Ты берёшь одну упаковку, а получаешь сразу два полноценных аромата, которые можно курить по отдельности или сочетать между собой. Это отличный способ попробовать новые вкусы и экспериментировать с миксами.",
        image: "images/double-line.png",
        services: [
            {
                id: 601,
                name: "Малина / Ягодный микс",
                description: "",
                username: "user601",
                image: "images/doubleline/double-1.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40, label: "2х20" }]
            },
            {
                id: 602,
                name: "Маргарита / Кола",
                description: "",
                username: "user602",
                image: "images/doubleline/double-2.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40, label: "2х20" }]
            },
            {
                id: 603,
                name: "Фруктовый микс / Ананас",
                description: "",
                username: "user603",
                image: "images/doubleline/double-3.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40, label: "2х20" }]
            },
            {
                id: 604,
                name: "Киви / Персик",
                description: "",
                username: "user604",
                image: "images/doubleline/double-4.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40, label: "2х20" }]
            },
            {
                id: 605,
                name: "Маргарита / Малиновая гранита",
                description: "",
                username: "user605",
                image: "images/doubleline/double-5.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40, label: "2х20" }]
            },
            {
                id: 606,
                name: "Ягодный микс / Голубика",
                description: "",
                username: "user606",
                image: "images/doubleline/double-6.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40, label: "2х20" }]
            },
            {
                id: 607,
                name: "Клубничный лимонад / Дынный чизкейк",
                description: "",
                username: "user607",
                image: "images/doubleline/double-7.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40, label: "2х20" }]
            },
            {
                id: 608,
                name: "Груша / Лимонные конфеты",
                description: "",
                username: "user608",
                image: "images/doubleline/double-8.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40, label: "2х20" }]
            },
            {
                id: 609,
                name: "Апельсин / Кислая маракуйя",
                description: "",
                username: "user609",
                image: "images/doubleline/double-9.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40, label: "2х20" }]
            },
            {
                id: 610,
                name: "Манго шейк / Лимонное суфле",
                description: "",
                username: "user610",
                image: "images/doubleline/double-10.png",
                imagePosition: "center 35%",
                weights: [{ grams: 40, label: "2х20" }]
            }
        ]
    }
];