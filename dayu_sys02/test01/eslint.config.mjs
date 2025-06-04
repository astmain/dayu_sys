// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['eslint.config.mjs'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            sourceType: 'commonjs',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },

    {
        plugins:{
            prettier
        },
        rules: {
            // 启用 prettier 插件作为 ESLint 规则
            'prettier/prettier': 'error'
        }

    },

    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            // '@typescript-eslint/no-floating-promises': 'warn',
            // '@typescript-eslint/no-unsafe-argument': 'warn',
            //   自定义
            // '@typescript-eslint/indent': 'off', // 关闭 TypeScript 的缩进检查
            '@typescript-eslint/no-unused-vars': 'off', // 关闭 TS 的未使用变量检查
            'max-len': ['warn', {
                code: 200,           // 每行最多 200 个字符
                ignoreUrls: true,    // 忽略超长的 URL
                ignoreStrings: true, // 忽略字符串中的超长内容
                ignoreTemplateLiterals: true, // 忽略模板字符串
                ignoreRegExpLiterals: true    // 忽略正则表达式
            }],


            'indent': ['warn', 4], // 警告：用 4 个空格缩进
            '@typescript-eslint/indent': ['warn', 2], // 针对 TypeScript 的缩进


            // 'semi': 'off', // 彻底关闭分号检查
            // '@typescript-eslint/semi': 'off' // 如果你用的是 TypeScript，也关闭 TS 的分号规则

            'semi': ['error', 'never'], // 不允许写分号
            '@typescript-eslint/semi': ['error', 'never'] // 对 TypeScript 也启用相同规则
        },
    },
);