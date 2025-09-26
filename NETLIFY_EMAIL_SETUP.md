# 📧 Netlify Email Setup - VAHAN PHOTOS

## ✅ Что уже сделано:

1. **Создана Netlify Function** (`netlify/functions/send-email.js`)
2. **Обновлен JavaScript** для работы с Netlify Functions
3. **Обновлен netlify.toml** для поддержки функций
4. **Обновлен package.json** с зависимостями

## 🚀 Что нужно сделать ВАМ:

### 1. Настройте Gmail (если еще не сделали):

1. **Включите 2-факторную аутентификацию** в Google аккаунте
2. **Создайте пароль приложения**:
   - Перейдите в [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Выберите "Mail" и "Other (Custom name)"
   - Введите "VAHAN PHOTOS Netlify"
   - Скопируйте сгенерированный пароль

### 2. Настройте переменные окружения в Netlify:

1. **Зайдите в Netlify Dashboard** → ваш сайт
2. **Site settings** → **Environment variables**
3. **Добавьте переменные**:
   - `EMAIL_USER` = ваш email (например: `your-email@gmail.com`)
   - `EMAIL_PASS` = пароль приложения (16 символов)

### 3. Деплой:

1. **Закоммитьте изменения**:
   ```bash
   git add .
   git commit -m "Add Netlify email functionality"
   git push
   ```

2. **Netlify автоматически пересоберет сайт** с новой функцией

### 4. Тестирование:

1. **Откройте ваш сайт** на Netlify
2. **Заполните форму контактов**
3. **Нажмите "Send Message"**
4. **Проверьте почту** info@vahanphotos.com

## 🔧 Troubleshooting:

### Если email не отправляется:

1. **Проверьте переменные окружения** в Netlify Dashboard
2. **Проверьте логи** в Netlify Functions:
   - Site settings → Functions → View logs
3. **Убедитесь, что email info@vahanphotos.com существует**

### Если функция не работает:

1. **Проверьте, что папка `netlify/functions/` создана**
2. **Проверьте, что файл `send-email.js` существует**
3. **Проверьте, что `netlify.toml` обновлен**

## 📧 Что происходит при отправке:

1. **Клиент заполняет форму** → данные отправляются на `/netlify/functions/send-email`
2. **Netlify Function обрабатывает запрос** → создает красивое HTML письмо
3. **Email отправляется** на info@vahanphotos.com через Gmail
4. **Клиент получает уведомление** об успехе/ошибке

## 🎨 Email содержит:

- ✅ Имя клиента
- ✅ Email для ответа  
- ✅ Сообщение/описание проекта
- ✅ Время отправки
- ✅ Красивое оформление в стиле VAHAN PHOTOS

---

**Готово!** После настройки переменных окружения форма будет работать на Netlify! 🎉
