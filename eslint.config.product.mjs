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
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      '.vercel/**',
      'out/**',
    ],
  },
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
      // Disabled: Not implemented in plugin yet
      // 'product-quality/no-button-without-handler': 'warn',
      // 'product-quality/no-form-without-submit': 'error',
      // 'product-quality/no-missing-alt-text': 'error',
      // 'product-quality/no-generic-placeholders': 'warn',
      // 'product-quality/require-loading-state-on-async-button': 'warn',
      // 'product-quality/require-aria-label-on-icon-buttons': 'warn',

      // ========================================
      // ERROR HANDLING & QUALITY
      // ========================================
      // Disabled: Not implemented in plugin yet
      // 'product-quality/require-try-catch-fetch': 'warn',
      // 'product-quality/require-empty-state': 'warn',

      // ========================================
      // PERFORMANCE
      // ========================================
      // Disabled: Not implemented in plugin yet
      // 'product-quality/require-image-optimization': 'warn',
    },
  },
];
