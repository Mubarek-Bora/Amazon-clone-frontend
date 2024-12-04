// import js from "@eslint/js";






// import globals from "globals";
// import react from "eslint-plugin-react";
// import reactHooks from "eslint-plugin-react-hooks";
// import reactRefresh from "eslint-plugin-react-refresh";

// export default [
//   // Ignore files and directories
//   { ignores: ["dist"] },

//   // Base configuration for JavaScript and JSX
//   {
//     files: ["**/*.{js,jsx}"],
//     languageOptions: {
//       ecmaVersion: "latest",
//       globals: globals.browser,
//       parserOptions: {
//         ecmaFeatures: { jsx: true },
//         sourceType: "module",
//       },
//     },
//     settings: { react: { version: "detect" } },
//     plugins: {
//       react,
//       "react-hooks": reactHooks,
//       "react-refresh": reactRefresh,
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       ...react.configs.recommended.rules,
//       ...react.configs["jsx-runtime"].rules,
//       ...reactHooks.configs.recommended.rules,
//       "react/jsx-no-target-blank": "off",
//       "react-refresh/only-export-components": [
//         "warn",
//         { allowConstantExport: true },
//       ],
//     },
//   },
// ];


//  [
//   {
//     files: ['**/*.js'],
//     languageOptions: {
//       ecmaVersion: 'latest',
//       sourceType: 'commonjs', // For Node.js (uses `require` and `module.exports`)
//     },
//     env: {
//       node: true, // Enable Node.js globals
//       es2020: true, // Allow ES2020 features
//     },
//     rules: {
//       ...js.configs.recommended.rules, // Use recommended ESLint rules
//     },
//   },
// ];























// import js from '@eslint/js'
// import globals from 'globals'
// import react from 'eslint-plugin-react'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'

// export default [
//   { ignores: ['dist'] },
//   {
//     files: ['**/*.{js,jsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         ecmaFeatures: { jsx: true },
//         sourceType: 'module',
//       },
//     },
//     settings: { react: { version: '18.3' } },
//     plugins: {
//       react,
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       ...react.configs.recommended.rules,
//       ...react.configs['jsx-runtime'].rules,
//       ...reactHooks.configs.recommended.rules,
//       'react/jsx-no-target-blank': 'off',
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//     },
//   },
// ]

// {
//   "env"= {
//     "node": true,
//     "es2021": true
//   },
//   "extends"= ["eslint:recommended", "google"],
//   "parserOptions"= {
//     "ecmaVersion"= 12
//   },
//   "rules"= {
//     "no-unused-vars": "warn",
//     "no-undef": "off",
//     "quotes": ["error", "double"]
//   }
// }

import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // Ignore files and directories
  { ignores: ["dist"] },

  // Base configuration for React (JavaScript and JSX files)
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module", // For ES Modules
      },
    },
    settings: { react: { version: "detect" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  // Additional configuration for Node.js files
  {
    files: ["functions/**/*.js"], // Target Node.js files specifically
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs", // Use `require` and `module.exports`
      globals: {
        ...globals.node, // Include Node.js globals like `require`, `process`, `module`
      },
    },
    rules: {
      ...js.configs.recommended.rules, // Use recommended ESLint rules
      "no-unused-vars": "warn", // Warn instead of error for unused variables
      "no-console": "off", // Allow `console.log` for debugging
    },
  },
];
