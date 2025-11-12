import tsParser from '@typescript-eslint/parser';

import productQuality from './eslint-plugin-product-quality/index.js';

/**
 * Product Quality ESLint Config for BookTrailer Pro
 * Flat config format (ESLint 9+) with TypeScript support
 *
 * Enforces BookTrailer Pro brand standards:
 * - purple/pink/amber color palette (creative/literary theme)
 * - Company name: BookTrailer Pro
 * - Email: support@booktrailer.pro
 * - Payment provider: stripe
 */
export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'product-quality': productQuality,
    },
    rules: {
      // ========================================
      // LINK VALIDATION (Critical for UX)
      // ========================================
      'product-quality/no-broken-internal-links': 'warn',

      // ========================================
      // BRAND CONSISTENCY - BookTrailer Pro ONLY
      // ========================================
      'product-quality/use-styleguide-colors-only': ['warn', {
        allowedColors: [
          // Base colors (always allowed)
          'black',
          'white',
          'transparent',
          'current',
          'inherit',
          // Grayscale (always allowed)
          'gray-',
          'slate-',
          'zinc-',
          'neutral-',
          // BookTrailer Pro brand colors (purple/pink/amber - creative/literary theme)
          'purple-',
          'violet-',
          'pink-',
          'fuchsia-',
          'amber-',
          'yellow-',
          // Utility colors (always allowed)
          'red-',       // For errors
          'green-',     // For success
        ],
      }],

      // ========================================
      // CONTENT CONSISTENCY - BookTrailer Pro
      // ========================================
      'product-quality/consistent-payment-providers': ['warn', {
        provider: 'stripe',
      }],
      'product-quality/consistent-company-info': ['warn', {
        companyName: 'BookTrailer Pro',
        email: 'support@booktrailer.pro',
      }],

      // ========================================
      // UX CONSISTENCY RULES
      // ========================================
      'product-quality/no-button-without-handler': 'warn',
      'product-quality/no-form-without-submit': 'error',
      'product-quality/no-missing-alt-text': 'error',
      'product-quality/no-generic-placeholders': 'warn',
      'product-quality/require-loading-state-on-async-button': 'warn',
      // Disabled: Too many false positives, needs refinement
      // 'product-quality/require-aria-label-on-icon-buttons': 'warn',

      // ========================================
      // ERROR HANDLING & QUALITY
      // ========================================
      'product-quality/require-try-catch-fetch': 'warn',
      // Disabled: Too noisy for API routes, more useful for UI components
      // 'product-quality/require-empty-state': 'warn',

      // ========================================
      // PERFORMANCE
      // ========================================
      'product-quality/require-image-optimization': 'warn',
    },
  },
];
