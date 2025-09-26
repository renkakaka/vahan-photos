# 📧 Email Setup Instructions

## Настройка отправки email для VAHAN PHOTOS

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка Gmail (рекомендуется)

1. **Включите 2-факторную аутентификацию** в вашем Google аккаунте
2. **Создайте пароль приложения**:
   - Перейдите в [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Выберите "Mail" и "Other (Custom name)"
   - Введите "VAHAN PHOTOS Server"
   - Скопируйте сгенерированный пароль

### 3. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
PORT=3000
```

### 4. Альтернативные email сервисы

Если не хотите использовать Gmail, можете настроить другие сервисы в `server.js`:

#### Outlook/Hotmail:
```javascript
const transporter = nodemailer.createTransporter({
    service: 'hotmail',
    auth: {
        user: 'your-email@outlook.com',
        pass: 'your-password'
    }
});
```

#### Yahoo:
```javascript
const transporter = nodemailer.createTransporter({
    service: 'yahoo',
    auth: {
        user: 'your-email@yahoo.com',
        pass: 'your-app-password'
    }
});
```

#### Custom SMTP:
```javascript
const transporter = nodemailer.createTransporter({
    host: 'smtp.your-provider.com',
    port: 587,
    secure: false,
    auth: {
        user: 'your-email@domain.com',
        pass: 'your-password'
    }
});
```

### 5. Запуск сервера

```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 6. Тестирование

1. Откройте http://localhost:3000
2. Заполните форму контактов
3. Нажмите "Send Message"
4. Проверьте почту info@vahanphotos.com

### 7. Деплой на сервер

Для продакшена используйте переменные окружения вашего хостинга:

```bash
# Heroku
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASS=your-app-password

# Vercel
vercel env add EMAIL_USER
vercel env add EMAIL_PASS

# Netlify Functions
# Добавьте переменные в настройках Netlify
```

### 8. Безопасность

- ✅ Никогда не коммитьте файл `.env` в git
- ✅ Используйте пароли приложений, а не основные пароли
- ✅ Регулярно обновляйте пароли
- ✅ Используйте HTTPS в продакшене

### 9. Troubleshooting

**Ошибка "Invalid login":**
- Проверьте правильность email и пароля
- Убедитесь, что включена 2FA и используется пароль приложения

**Ошибка "Connection timeout":**
- Проверьте интернет соединение
- Попробуйте другой email сервис

**Email не доставляется:**
- Проверьте папку "Спам"
- Убедитесь, что email info@vahanphotos.com существует

### 10. Мониторинг

Сервер выводит логи в консоль:
- ✅ Успешная отправка: "Email sent successfully"
- ❌ Ошибки: "Error sending email: [details]"

---

**Готово!** Теперь форма контактов будет отправлять красиво оформленные email на info@vahanphotos.com
