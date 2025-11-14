# Replicate AI Integration для BookTrailer Pro

## Обзор

BookTrailer Pro использует Replicate API для генерации видео-трейлеров из текстовых описаний книг.

## Модель

**Текущая модель**: `minimax/video-01`

### Характеристики:
- **Тип**: Text-to-video generation
- **Длительность**: ~6 секунд базового видео
- **Качество**: High-quality cinematic output
- **Стоимость**: ~$0.50 за генерацию

### Почему MiniMax Video-01?

1. ✅ **Текст-в-видео** - генерирует видео напрямую из промптов
2. ✅ **Кинематографическое качество** - профессиональный вид
3. ✅ **Стабильная модель** - доступна на Replicate
4. ✅ **Быстрая генерация** - 2-5 минут

### Альтернативные модели:

- `stability-ai/stable-video-diffusion` - требует входное изображение (image-to-video)
- `lucataco/animate-diff` - для анимации статических изображений
- Luma Ray - не доступна публично через Replicate API

## API Usage

### Базовый вызов:

```typescript
const output = await replicate.run(
  'minimax/video-01',
  {
    input: {
      prompt: "Cinematic book trailer with dramatic lighting...",
      prompt_optimizer: true, // Улучшает промпт автоматически
    },
  }
)
```

### Параметры:

- `prompt` (string, required): Описание желаемого видео
- `prompt_optimizer` (boolean): Автоматическая оптимизация промпта

### Response:

```typescript
// Output - URL видео файла
const videoUrl = Array.isArray(output) ? output[0] : output
```

## Промпт-инжиниринг

### Структура промпта для книжных трейлеров:

```
A cinematic book trailer: "{title}" by {author}.

Visual Style: {detailed style description}

Scene Elements: {genre-specific visual elements}

Story Essence: {brief synopsis}

Cinematic Techniques: Professional filmmaking, smooth camera work...
```

### Стили визуализации:

1. **Dramatic** 🎭
   - High contrast lighting
   - Deep shadows, dramatic angles
   - Moody color grading
   - Dynamic camera movements

2. **Epic** ⚔️
   - Grand scale, wide shots
   - Golden hour lighting
   - Aerial views, sweeping landscapes
   - Heroic atmosphere

3. **Intimate** 💫
   - Shallow depth of field
   - Soft natural lighting
   - Close-up emotional moments
   - Warm color palette

4. **Suspenseful** 🔍
   - Low-key lighting
   - Shadows and silhouettes
   - Tense pacing, slow reveals
   - Cool desaturated colors

5. **Whimsical** ✨
   - Bright vibrant colors
   - Soft glowing lights
   - Playful camera movements
   - Magical ethereal atmosphere

### Жанровые элементы:

- **Thriller**: Dark urban settings, rain-slicked streets, mysterious figures
- **Romance**: Intimate moments, soft candlelight, beautiful natural settings
- **Sci-Fi**: Futuristic technology, space vistas, holographic displays
- **Fantasy**: Magical forests, ancient castles, mystical creatures
- **Mystery**: Foggy streets, dim-lit libraries, hidden clues
- **Literary**: Artistic cinematography, symbolic imagery
- **Horror**: Eerie abandoned places, flickering lights, shadows
- **Historical**: Period-accurate settings, rich textures, authentic costumes

## Rate Limits

### Текущие лимиты (с балансом < $5):

- **6 запросов в минуту**
- **Burst: 1 запрос**
- **Throttle: ~9 секунд между запросами**

### Рекомендации:

1. Использовать асинхронную обработку
2. Обрабатывать 429 ошибки с retry logic
3. Показывать пользователю статус "processing"
4. Polling каждые 5 секунд для статуса

## Стоимость

### Оценочная стоимость:

| Длительность | Стоимость | Примечание |
|--------------|-----------|------------|
| 6 сек (базовое) | $0.50 | Одна генерация MiniMax |
| 30 сек трейлер | $2.50 | 5 сегментов по 6 сек |
| 60 сек трейлер | $5.00 | 10 сегментов |
| 120 сек трейлер | $10.00 | 20 сегментов |

**Примечание**: Для длинных трейлеров потребуется склеивание нескольких видео.

## Обработка ошибок

### Типичные ошибки:

```typescript
try {
  const output = await replicate.run(...)
} catch (error) {
  if (error.status === 429) {
    // Rate limit - повторить через 10 секунд
  } else if (error.status === 422) {
    // Невалидный промпт или модель
  } else if (error.status === 500) {
    // Ошибка генерации - попробовать другой промпт
  }
}
```

### Retry Strategy:

```typescript
async function generateWithRetry(prompt: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await replicate.run('minimax/video-01', { input: { prompt } })
    } catch (error) {
      if (error.status === 429 && i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 10000))
        continue
      }
      throw error
    }
  }
}
```

## Оптимизация

### Best Practices:

1. **Короткие промпты** (200-300 слов)
   - Модель лучше работает с конкретными, короткими описаниями

2. **Визуальный фокус**
   - Описывайте что видно, а не что происходит
   - "Dark rain-slicked streets" вместо "It's raining"

3. **Кинематографические термины**
   - "Close-up shot", "Wide angle", "Shallow depth of field"
   - Помогает модели понять композицию

4. **Цвета и освещение**
   - "Golden hour lighting", "High contrast shadows"
   - Определяет настроение

5. **Избегать**:
   - Текст в промпте (он не появится на видео)
   - Слишком много деталей (упрощайте)
   - Абстрактные концепции (фокус на визуале)

## Мониторинг

### Логирование:

```typescript
await prisma.usageLog.create({
  data: {
    userId: user.id,
    action: 'generate_trailer',
    trailerId,
    cost: 0.5,
    metadata: {
      model: 'minimax-video-01',
      duration: 6,
      style: 'dramatic',
      processingTime: 180, // секунды
    },
  },
})
```

### Метрики для отслеживания:

- Время генерации (в секундах)
- Успешность генерации (%)
- Стоимость на трейлер
- Популярные стили
- Частые ошибки

## Будущие улучшения

### Планируется:

1. **Склеивание видео** - для трейлеров > 6 секунд
2. **Post-processing** - добавление музыки, титров
3. **Thumbnail generation** - из первого кадра видео
4. **A/B testing** - тестирование разных промптов
5. **Webhook integration** - реал-тайм уведомления

### Альтернативные подходы:

1. **Image + SVD**: Генерировать изображения с FLUX → анимировать с Stable Video Diffusion
2. **Multi-shot editing**: Генерировать отдельные сцены → склеивать
3. **Template-based**: Использовать предварительные шаблоны для разных жанров

## Troubleshooting

### Проблема: Видео не соответствует промпту

**Решение**:
- Упростите промпт
- Добавьте больше визуальных деталей
- Используйте `prompt_optimizer: true`

### Проблема: Rate limit 429

**Решение**:
- Увеличьте баланс Replicate до $5+
- Добавьте задержки между запросами
- Используйте очередь для генерации

### Проблема: Долгая генерация (>5 мин)

**Решение**:
- Это нормально для video generation
- Используйте webhook вместо polling
- Показывайте progress bar пользователю

## Ссылки

- [Replicate Documentation](https://replicate.com/docs)
- [MiniMax Video-01 Model](https://replicate.com/minimax/video-01)
- [Replicate Node.js Client](https://github.com/replicate/replicate-javascript)

---

**Последнее обновление**: 2025-11-14
