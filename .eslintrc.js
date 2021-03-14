'use strict';
const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  plugins: ['import', 'react', 'prettier', 'jsx-a11y', 'only-warn'],
  rules: {
    'prettier/prettier': ERROR, // prettier拡張
    'no-var': ERROR, // var禁止
    'object-shorthand': [ERROR, 'always'], // オブジェクト定義時にショートハンド利用
    'prefer-arrow-callback': ERROR, // コールバックにはアロー関数を利用
    'prefer-const': [ERROR, { destructuring: 'all' }], // 再代入を行わない変数はconstを利用
    'import/extensions': OFF,
    'import/no-unresolved': OFF, // 絶対パスでインポートする
    'import/prefer-default-export': OFF, // デフォルトエクスポートを優先して使用する
    'no-undef': [ERROR, { typeof: true }], // 未定義の変数は利用しない
    'no-unused-vars': [
      // 未使用の定義(変数、関数)は削除する
      ERROR,
      { argsIgnorePattern: '^_+$', ignoreRestSiblings: true },
    ],
    'operator-assignment': [ERROR, 'always'], // ショートハンドが使える場合はショートハンドで記載する

    'react/no-danger': OFF, // 危険なJSXプロパティの使用を禁止する
    'react/no-string-refs': OFF, // refsに文字列を渡すことを禁止する
    'react/forbid-prop-types': OFF, // 特定のpropTypeを禁止
    'react/display-name': OFF, // 一時的にOFF functional componentには必ず関数名をつける
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],

    'jsx-a11y/label-has-for': OFF, // labelタグに対してhtmlForを設定すること
    'jsx-a11y/click-events-have-key-events': OFF, // TODO: remove 非対話型コンテンツにclickイベントを設定を禁止する
    'jsx-a11y/label-has-associated-control': OFF, // ラベルタグにテキストラベルと関連するコントロールがあることを強制する
    'jsx-a11y/media-has-caption': OFF,
    'jsx-a11y/no-static-element-interactions': OFF, // TODO: remove アクセシビリティレイヤー意外にインタラクティブなイベントの付与を強制する
  },
  settings: {
    react: { version: '16.8.1' },
    typescript: {
      project: './tsconfig.json',
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      plugins: ['@typescript-eslint', 'react-hooks', 'css-modules'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/promise-function-async': [
          'error',
          {
            allowedPromiseNames: [],
            checkArrowFunctions: false,
            checkFunctionDeclarations: true,
            checkFunctionExpressions: false,
            checkMethodDeclarations: false,
          },
        ],
      },
    },
  ],
};
