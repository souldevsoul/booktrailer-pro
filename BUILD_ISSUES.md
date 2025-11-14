# Build Issues - BookTrailer Pro

Анализ проблем из проекта Toonify и текущего состояния BookTrailer Pro.

## ✅ Проблемы из Toonify, которые УЖЕ РЕШЕНЫ

### 1. Slash Command Conflicts ✅
**Статус:** РЕШЕНО в BookTrailer Pro
**Проблема в Toonify:** Конфликты с встроенными командами Claude Code
**Решение:** Команды переименованы:
- `/bug` → `/fixbug`
- `/feature` → `/addfeature`
- `/review` → `/codereview`
- `/test` → `/runtest`

**Проверка в BookTrailer Pro:**
```bash
ls .claude/commands/
# Результат: addfeature.md, codereview.md, fixbug.md, runtest.md ✅
```

---

## ⚠️ КРИТИЧЕСКИЕ ПРОБЛЕМЫ

### 1. TypeScript Compilation Errors (90+ ошибок)
**Причина:** API роуты используют старые модели VoiceCraft, которых нет в новой схеме BookTrailer

**Отсутствующие модели:**
- `prisma.voice` - используется в `/api/voices/*`
- `prisma.audio` - используется в `/api/audios/*`
- `prisma.project` - используется в `/api/projects/*`
- `prisma.voiceGeneration` - используется в `/api/voices/generate`
- `prisma.projectAudio` - используется в `/api/projects/[id]/audios/*`
- `prisma.expertProfile` - используется в `/api/projects/[id]/assign`

**Файлы с ошибками:**
- `app/api/audios/**/*.ts` (12 файлов)
- `app/api/voices/**/*.ts` (5 файлов)
- `app/api/projects/**/*.ts` (13 файлов)

**Решение:** Удалить старые VoiceCraft API роуты или адаптировать под BookTrailer модели

---

### 2. Missing Dependencies (8 ошибок)
**Проблема:** Отсутствуют пакеты NextAuth

```
Cannot find module 'next-auth'
Cannot find module 'next-auth/providers/credentials'
Cannot find module 'next-auth/providers/google'
Cannot find module 'next-auth/providers/github'
Cannot find module '@auth/prisma-adapter'
Cannot find module 'bcryptjs'
```

**Файлы:**
- `lib/auth.ts`
- `lib/get-current-user.ts`

**Решение:** Установить пакеты:
```bash
npm install next-auth @auth/prisma-adapter bcryptjs
npm install -D @types/bcryptjs
```

---

### 3. Card Component Type Errors (4 ошибки)
**Проблема:** Тип `"primary"` не существует в Card компоненте

```typescript
// Ошибка: Type '"primary"' is not assignable to type '"default" | "elevated" | "gradient"'
<Card variant="primary">
```

**Файлы:**
- `components/marketing/cards/blog-card.tsx:21`
- `components/marketing/cards/feature-card.tsx:19`
- `components/project/specialist-project-card.tsx:74`
- `components/voicecraft/voice-clone-uploader.tsx:149`

**Решение:** Изменить `variant="primary"` на допустимое значение или добавить тип

---

## ⚡ ESLint Issues (163 проблемы)

### 1. React Apostrophes/Quotes (45 errors)
**Проблема:** Незаэкранированные символы `'` и `"` в JSX

**Пример:**
```tsx
// ❌ Ошибка
<p>Author's book</p>
<p>The "Best" trailer</p>

// ✅ Исправление
<p>Author&apos;s book</p>
<p>The &quot;Best&quot; trailer</p>
```

**Файлы:**
- `app/about/page.tsx` (10 ошибок)
- `app/features/page.tsx`
- `app/privacy/page.tsx`
- `app/terms/page.tsx`
- И другие...

### 2. Unused Imports/Variables (40 warnings)
**Примеры:**
```typescript
import { RiRocketLine } from 'react-icons/ri' // но не используется
const [data, setData] = useState() // data не используется
```

**Решение:** Удалить неиспользуемые импорты и переменные

### 3. TypeScript `any` Types (38 errors)
**Проблема:** Использование `any` вместо точных типов

**Файлы:**
- `app/api/**/*.ts` (большинство API роутов)
- `components/ui/button.tsx`
- `lib/credits.ts`

**Решение:** Заменить `any` на правильные типы

### 4. HTML Links Instead of Next Link (5 errors)
**Проблема:** Использование `<a href="/">` вместо `<Link>`

**Файлы:**
- `app/admin/*/page.tsx` (5 файлов)

**Решение:**
```tsx
// ❌ Ошибка
<a href="/">Home</a>

// ✅ Исправление
import Link from 'next/link'
<Link href="/">Home</Link>
```

### 5. Empty TypeScript Interfaces (1 error)
**Файл:** `components/ui/textarea.tsx:4`

```typescript
// ❌ Ошибка
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// ✅ Исправление: удалить или добавить свойства
```

### 6. React Hooks Issues (2 warnings)
**Проблема:** Отсутствующие зависимости в useEffect

**Примеры:**
- `app/dashboard/transformations/page.tsx:83` - missing `fetchTransformations`
- `components/voicecraft/waveform.tsx:16` - impure function `Math.random()`

---

## 📋 Рекомендации по исправлению

### Приоритет 1 (Критично для билда):
1. ✅ Удалить старые VoiceCraft API роуты: `/api/voices`, `/api/audios`, `/api/projects`
2. ✅ Установить NextAuth пакеты
3. ✅ Исправить Card component variant types

### Приоритет 2 (Важно для продакшена):
4. ✅ Исправить все apostrophe/quote ошибки (автоматически через find/replace)
5. ✅ Удалить неиспользуемые импорты
6. ✅ Заменить `<a>` на `<Link>`

### Приоритет 3 (Code quality):
7. ⚠️ Заменить `any` на типизацию
8. ⚠️ Исправить React Hooks warnings

---

## 🛠 Скрипты для автоматизации

### 1. Удалить старые VoiceCraft роуты
```bash
rm -rf app/api/voices
rm -rf app/api/audios
rm -rf app/api/projects
```

### 2. Установить зависимости
```bash
npm install next-auth @auth/prisma-adapter bcryptjs
npm install -D @types/bcryptjs
```

### 3. Автофикс apostrophes (найти и заменить)
Использовать regex find/replace в VS Code:
- Find: `([^&])'([^s])`
- Replace: `$1&apos;$2`

---

## ✅ Следующие шаги

1. Запустить скрипт удаления старых роутов
2. Установить недостающие пакеты
3. Исправить Card variants
4. Запустить `npm run lint -- --fix` для автоисправления
5. Вручную исправить apostrophes
6. Проверить билд: `npm run build`

---

**Дата анализа:** 2025-11-14
**Источник:** Анализ коммитов Toonify + текущее состояние BookTrailer Pro
