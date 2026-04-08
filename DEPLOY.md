# Деплой на Vercel

## Шаг 1: Подготовка

1. Зарегистрируйся на [vercel.com](https://vercel.com)
2. Установи Vercel CLI (опционально):
   ```bash
   npm i -g vercel
   ```

## Шаг 2: Подключение GitHub

1. Запуш код в GitHub репозиторий:
   ```bash
   git add .
   git commit -m "Add Vercel backend"
   git push
   ```

2. На vercel.com нажми "Add New Project"
3. Выбери свой GitHub репозиторий
4. Vercel автоматически определит настройки

## Шаг 3: Настройка переменных окружения

1. В настройках проекта на Vercel найди "Environment Variables"
2. Добавь две переменные:
   - `BOT_TOKEN` = твой токен бота (из @BotFather)
   - `CHAT_ID` = chat_id беседы с менеджером

## Шаг 4: Деплой

1. Нажми "Deploy"
2. Vercel задеплоит проект и даст тебе URL типа `https://твой-проект.vercel.app`

## Готово!

Теперь когда пользователь оформляет заказ:
- Запрос идёт на `/api/send-order`
- Бэкенд отправляет сообщение в телегу
- Токен бота скрыт и безопасен

## Локальное тестирование

Если хочешь протестировать локально:

1. Создай файл `.env`:
   ```
   BOT_TOKEN=твой_токен
   CHAT_ID=твой_chat_id
   ```

2. Установи Vercel CLI и запусти:
   ```bash
   vercel dev
   ```

3. Открой `http://localhost:3000`
