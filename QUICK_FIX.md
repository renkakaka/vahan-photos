# 🚨 Quick Fix: Netlify + Supabase Setup

## Проблема
Админ панель не работает через Netlify, потому что не настроены Environment Variables.

## ✅ Быстрое решение

### 1. Добавьте Environment Variables в Netlify

**В Netlify Dashboard:**
1. Site settings → Environment variables
2. Добавьте эти переменные:

```
SUPABASE_URL = https://fzqtdybnvctvgkqqyhkl.supabase.co
SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6cXRkeWJudmN0dmdrcXF5aGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MDE2MjMsImV4cCI6MjA3NDM3NzYyM30.F5JH4i8w8I8TeHrXgfqLr0swYCgjHA6VvL53n6PrQR0
```

### 2. Перезапустите деплой
После добавления переменных:
- Deploys → Trigger deploy → Deploy site

### 3. Проверьте Supabase настройки

**В Supabase Dashboard:**
1. SQL Editor → выполните `setup-supabase-complete.sql`
2. Authentication → Users → создайте пользователя для админки
3. Settings → API → проверьте URL и ключи

### 4. Тестирование

**Откройте:** `http://your-site.netlify.app/test-supabase.html`

Этот файл покажет:
- ✅ Подключение к Supabase
- ✅ Доступ к таблицам
- ✅ Аутентификацию
- ✅ Storage

### 5. Создайте пользователя для админки

**В Supabase Dashboard:**
1. Authentication → Users
2. Add user
3. Email: `admin@vahanphotos.com`
4. Password: `adminpassword123`
5. Confirm email

### 6. Проверьте админку

**Откройте:** `http://your-site.netlify.app/admin.html`
- Войдите с созданными учетными данными
- Проверьте загрузку фото/видео

## 🔧 Если не работает

### Проверьте консоль браузера (F12):
- Ошибки подключения к Supabase
- Проблемы с CORS
- Ошибки аутентификации

### Проверьте Netlify:
- Environment Variables добавлены
- Деплой перезапущен
- Нет ошибок в логах

### Проверьте Supabase:
- Таблицы созданы
- RLS политики настроены
- Storage buckets созданы
- Пользователь создан

## 📋 Checklist

- [ ] Environment Variables добавлены в Netlify
- [ ] Деплой перезапущен
- [ ] SQL скрипт выполнен в Supabase
- [ ] Пользователь создан в Supabase
- [ ] Админка открывается
- [ ] Логин работает
- [ ] Загрузка файлов работает

---

**Важно**: После каждого изменения в Netlify Environment Variables нужно перезапустить деплой!
