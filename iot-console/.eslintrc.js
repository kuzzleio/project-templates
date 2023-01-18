require('@rushstack/eslint-patch/modern-module-resolution');

// Assign path aliases to correct group to sort imports
const pathGroupsImports = [
  {
    pattern: '@/**',
    group: 'parent',
  },
];

module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/standard', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/order': ['error', { pathGroups: pathGroupsImports }],
    'prefer-arrow-callback': 'error',
    'arrow-body-style': ['error', 'as-needed'],
  },
  overrides: [
    {
      // Apply vue and typescript rules only on Vue SFC and typescript files
      files: ['src/**/*.{vue,ts}'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      extends: [
        '@vue/typescript/recommended',
        // Need to repeat prettier here to keep rules priority over previous rulesset
        '@vue/prettier',
      ],
      rules: {
        // Normalize eqeqeq rules in template like in script
        'vue/eqeqeq': ['error', 'always'],
        // Force self-closing to improve readability of templates
        'vue/html-self-closing': [
          'error',
          {
            html: {
              void: 'any',
              normal: 'always',
              component: 'always',
            },
            svg: 'always',
            math: 'always',
          },
        ],
        // Normalize methode signature style
        '@typescript-eslint/method-signature-style': 'error',
        // ? Not applicable, need rename components
        'vue/multi-word-component-names': 'off',
        // Allow js script in SFC
        'vue/block-lang': ['error', { script: { lang: ['ts', 'js'] } }],
      },
    },
  ],
};
