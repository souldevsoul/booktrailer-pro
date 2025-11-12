/**
 * ESLint Plugin: Product Quality - FIXED VERSION
 * Only checks actual color values, not utility classes
 */

const fs = require('node:fs');
const path = require('node:path');

// List of Tailwind utility prefixes that are NOT colors
const NON_COLOR_UTILITIES = [
  'text-xs',
  'text-sm',
  'text-base',
  'text-lg',
  'text-xl',
  'text-2xl',
  'text-3xl',
  'text-4xl',
  'text-left',
  'text-center',
  'text-right',
  'text-justify',
  'text-opacity-',
  'text-ellipsis',
  'text-clip',
  'text-wrap',
  'bg-opacity-',
  'bg-none',
  'bg-gradient-',
  'bg-fixed',
  'bg-local',
  'bg-scroll',
  'bg-clip-',
  'bg-origin-',
  'bg-contain',
  'bg-cover',
  'bg-auto',
  'border-',
  'border-solid',
  'border-dashed',
  'border-dotted',
  'border-double',
  'border-none',
  'border-0',
  'border-2',
  'border-4',
  'border-8',
  'border-t',
  'border-r',
  'border-b',
  'border-l',
  'border-x',
  'border-y',
  'border-t-',
  'border-r-',
  'border-b-',
  'border-l-',
  'border-opacity-',
];

function isColorClass(className) {
  // Check if it's a non-color utility
  if (NON_COLOR_UTILITIES.some(util => className.startsWith(util))) {
    return false;
  }

  // Check if it's an actual color class
  const colorPrefixes = ['text-', 'bg-', 'border-'];
  if (!colorPrefixes.some(prefix => className.startsWith(prefix))) {
    return false;
  }

  // Must have a color name after the prefix
  const parts = className.split('-');
  if (parts.length < 2) {
    return false;
  }

  // Check if second part is a color name (not a utility)
  const colorNames = [
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'black',
    'white',
    'transparent',
    'current',
    'inherit',
  ];

  return colorNames.some(color => parts[1] === color || parts[1].startsWith(color));
}

module.exports = {
  rules: {
    'no-broken-internal-links': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Ensure all internal links point to existing pages',
          category: 'Product Quality',
          recommended: true,
        },
        messages: {
          brokenLink: 'Internal link "{{href}}" points to non-existent page. This will cause a 404 error.',
        },
      },
      create(context) {
        return {
          JSXAttribute(node) {
            if (node.name.name === 'href' && node.value?.type === 'Literal') {
              const href = node.value.value;

              if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) {
                const cleanPath = href.split('#')[0].split('?')[0];
                const baseDir = path.join(context.getCwd(), 'src', 'app');
                const possibleFiles = [
                  path.join(baseDir, cleanPath, 'page.tsx'),
                  path.join(baseDir, cleanPath, 'page.jsx'),
                ];

                const fileExists = possibleFiles.some(file => fs.existsSync(file));

                if (!fileExists && cleanPath !== '/' && cleanPath !== '') {
                  context.report({
                    node,
                    messageId: 'brokenLink',
                    data: { href },
                  });
                }
              }
            }
          },
        };
      },
    },

    'use-styleguide-colors-only': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Only use colors defined in the style guide',
          category: 'Brand Consistency',
          recommended: true,
        },
        messages: {
          unauthorizedColor: 'Color "{{color}}" is not in the approved style guide. Use one of: {{approved}}',
          arbitraryColor: 'Avoid arbitrary color values like "{{color}}". Use Tailwind utility classes from the style guide.',
        },
        schema: [
          {
            type: 'object',
            properties: {
              allowedColors: {
                type: 'array',
                items: { type: 'string' },
              },
            },
          },
        ],
      },
      create(context) {
        const options = context.options[0] || {};
        const allowedColors = options.allowedColors || ['black', 'white', 'gray-'];

        return {
          JSXAttribute(node) {
            if (node.name.name === 'className' && node.value?.value) {
              const classes = node.value.value.split(' ');

              classes.forEach((className) => {
                // Only check if it's actually a color class
                if (!isColorClass(className)) {
                  return;
                }

                const color = className.split('-').slice(1).join('-');
                const isAllowed = allowedColors.some(allowed => color.startsWith(allowed));

                if (!isAllowed && !color.includes('[') && !color.includes('inherit') && !color.includes('transparent')) {
                  context.report({
                    node,
                    messageId: 'unauthorizedColor',
                    data: {
                      color: className,
                      approved: allowedColors.join(', '),
                    },
                  });
                }

                // Check for arbitrary values like bg-[#FF0000]
                if (className.includes('[#') || className.includes('[rgb')) {
                  context.report({
                    node,
                    messageId: 'arbitraryColor',
                    data: { color: className },
                  });
                }
              });
            }
          },
        };
      },
    },

    'consistent-company-info': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Ensure company information (address, phone, email) is consistent',
          category: 'Content Consistency',
          recommended: true,
        },
        messages: {
          inconsistentEmail: 'Email "{{found}}" doesn\'t match configured email "{{configured}}"',
        },
        schema: [
          {
            type: 'object',
            properties: {
              companyName: { type: 'string' },
              email: { type: 'string' },
            },
          },
        ],
      },
      create(context) {
        const options = context.options[0] || {};

        return {
          Literal(node) {
            if (typeof node.value === 'string' && options.email) {
              const emailMatch = node.value.match(/\b[\w.%+-]+@[A-Z0-9.-]+\.[A-Z|]{2,}\b/i);
              if (emailMatch && emailMatch[0] !== options.email && !emailMatch[0].includes('example.com')) {
                context.report({
                  node,
                  messageId: 'inconsistentEmail',
                  data: {
                    found: emailMatch[0],
                    configured: options.email,
                  },
                });
              }
            }
          },
        };
      },
    },

    'consistent-payment-providers': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Ensure payment provider mentions are consistent',
          category: 'Content Consistency',
          recommended: true,
        },
        messages: {
          inconsistentProvider: 'Payment provider "{{provider}}" used here, but config specifies "{{configured}}". Keep consistent.',
        },
        schema: [
          {
            type: 'object',
            properties: {
              provider: {
                type: 'string',
                enum: ['stripe', 'ecommpay', 'paypal', 'square'],
              },
            },
          },
        ],
      },
      create(context) {
        const options = context.options[0] || {};
        const configuredProvider = options.provider || 'stripe';

        const providerPatterns = {
          stripe: /\bstripe\b/i,
          ecommpay: /\becommpay\b/i,
          paypal: /\bpaypal\b/i,
          square: /\bsquare\b/i,
        };

        return {
          Literal(node) {
            if (typeof node.value === 'string') {
              Object.entries(providerPatterns).forEach(([provider, pattern]) => {
                if (pattern.test(node.value) && provider !== configuredProvider) {
                  context.report({
                    node,
                    messageId: 'inconsistentProvider',
                    data: { provider, configured: configuredProvider },
                  });
                }
              });
            }
          },
        };
      },
    },
  },
};
