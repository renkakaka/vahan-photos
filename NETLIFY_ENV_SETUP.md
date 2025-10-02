# 🔧 Netlify Environment Variables Setup

## Проблема
Админ панель не работает через Netlify, потому что не настроены Environment Variables для Supabase.

## ✅ Решение

### 1. Зайдите в Netlify Dashboard
1. Откройте ваш сайт в Netlify
2. Перейдите в **Site settings**
3. Найдите раздел **Environment variables**

### 2. Добавьте следующие переменные:

```
SUPABASE_URL = https://fzqtdybnvctvgkqqyhkl.supabase.co
SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6cXRkeWJudmN0dmdrcXF5aGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MDE2MjMsImV4cCI6MjA3NDM3NzYyM30.F5JH4i8w8I8TeHrXgfqLr0swYCgjHA6VvL53n6PrQR0
```

### 3. Как добавить переменные:

1. **В Netlify Dashboard:**
   - Site settings → Environment variables
   - Нажмите "Add variable"
   - Key: `SUPABASE_URL`
   - Value: `https://fzqtdybnvctvgkqqyhkl.supabase.co`
   - Нажмите "Save"

2. **Добавьте вторую переменную:**
   - Key: `SUPABASE_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6cXRkeWJudmN0dmdrcXF5aGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MDE2MjMsImV4cCI6MjA3NDM3NzYyM30.F5JH4i8w8I8TeHrXgfqLr0swYCgjHA6VvL53n6PrQR0`
   - Нажмите "Save"

### 4. Перезапустите деплой
После добавления переменных:
1. Перейдите в **Deploys**
2. Нажмите **Trigger deploy** → **Deploy site**

## 🔍 Проверка

### После деплоя проверьте:
1. **Главная страница**: http://your-site.netlify.app
2. **Страница видео**: http://your-site.netlify.app/video.html
3. **Админ панель**: http://your-site.netlify.app/admin.html

### Тест админ панели:
1. Откройте админ панель
2. Попробуйте войти с вашими учетными данными
3. Если не работает, проверьте консоль браузера (F12) на ошибки

## 🚨 Возможные проблемы

### 1. Ошибка аутентификации
- Убедитесь, что пользователь создан в Supabase
- Проверьте, что RLS политики настроены правильно

### 2. Ошибка CORS
- Supabase должен быть настроен для работы с вашим доменом
- Проверьте настройки в Supabase Dashboard → Settings → API

### 3. Переменные не загружаются
- Убедитесь, что переменные добавлены в Netlify
- Перезапустите деплой после добавления переменных

## 📋 Checklist

- [ ] SUPABASE_URL добавлена в Netlify Environment Variables
- [ ] SUPABASE_KEY добавлена в Netlify Environment Variables
- [ ] Сайт перезапущен после добавления переменных
- [ ] Админ панель открывается без ошибок
- [ ] Логин работает корректно
- [ ] Загрузка фото работает
- [ ] Загрузка видео работает

## 🔧 Дополнительные настройки

### Если нужны дополнительные переменные:
```
EMAIL_USER = your-email@gmail.com
EMAIL_PASS = your-app-password
```

### Для production:
- Используйте production Supabase URL и ключи
- Настройте правильные домены в Supabase
- Включите SSL/TLS

---

**Важно**: После добавления Environment Variables обязательно перезапустите деплой в Netlify!
