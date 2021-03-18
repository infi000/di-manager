module.exports = {
    root: true,
    env: {
        //指定代码的运行环境
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        //定义文件继承的子规范 目前
        'airbnb',
        "plugin:@typescript-eslint/recommended",
        "react-app",
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: './config-overrides.js',
            },
        },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        //指定ESLint可以解析JSX语法
        ecmaFeatures: {
            jsx: true,
            impliedStrict: true, // 严格模式
        },
        ecmaVersion: 2019,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', "react-hooks",], //定义了该eslint文件所依赖的插件
    overrides: [{
        // 针对ts,tsx的规则
        // enable the rule specifically for TypeScript files
        "files": ["*.ts", "*.tsx"],
        rules: {
            // ================以下为新增================
            // 'import/no-unresolved': ['error', { ignore: ['components', 'utils', 'types', 'service'] }],
            'import/no-unresolved': "off",
            "import/extensions": "off",
            "no-console": "off",
            'no-confusing-arrow': 'off',
            // 单个函数循环复杂度最高20
            // 'complexity': ['warn', { max: 20 }],
            // FormattedMessage这个组件好像必须这么用 警告
            // 'react/jsx-props-no-spreading': 'warn',
            // state定义放入构造函数 好像编辑结果没什么不同
            // 'react/state-in-constructor': 'warn',
            // 400行警告
            'max-lines': [1, 1000],
            // 注释首字母必须大写：没必要
            'capitalized-comments': 'off',
            // 注释里有TODO/FIXME 很常见
            'no-warning-comments': 'off',
            // 异步循环  考虑到重试的可能 警告
            'no-await-in-loop': 'warn',
            // 先定义后使用  考虑table的column 警告
            '@typescript-eslint/no-use-before-define': 'warn',
            // 当没有用state refs的时候 最好用正常函数（不是箭头函数）；而你要用的话 应该写Class 这个暂时警告吧。感觉应该关闭？
            'react/prefer-stateless-function': 'warn',
            //不要求方法都写return type
            '@typescript-eslint/explicit-function-return-type': 'off',
            // 考虑到实际情况 不要去全部驼峰
            '@typescript-eslint/camelcase': 'off',
            // interface命名规范，必须以I开头

            '@typescript-eslint/interface-name-prefix': [2, 'always'],
            '@typescript-eslint/no-unused-vars': 'off',
            // 一条JSX语句独占一行，关闭

            'react/jsx-one-expression-per-line': 'off',

            // jsx推荐使用单括号

            'jsx-quotes': ['warn', 'prefer-single'],

            // ================以下针对airbnb进行修改================

            'react/jsx-filename-extension': 'off',

            // "only-multiline" 当最后一个元素或属性与闭括号 ] 或 } 在 不同的行时，允许（但不要求）使用拖尾逗号；当在 同一行时，禁止使用拖尾逗号。

            "comma-dangle": ["error", {

                "arrays": "only-multiline",

                "objects": "only-multiline",

                "imports": "only-multiline",

                "exports": "only-multiline",

                "functions": "ignore"

            }],
            'object-curly-newline': ['error', {

                // ObjectPattern解构复制、ImportDeclaration（antd 组件）、ExportDeclaration就不起新的一行了吧

                ObjectExpression: {
                    minProperties: 4,
                    multiline: true,
                    consistent: true
                },

                // ObjectPattern: { minProperties: 4, multiline: true, consistent: true },

                // ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },

                // ExportDeclaration: { minProperties: 4, multiline: true, consistent: true },

            }],

            // 修改args:'after-used'必须使用最后一个参数，历史项目经常出现未使用最后一个参数的情况

            'no-unused-vars': ['error', {
                vars: 'all',
                args: 'none',
                ignoreRestSiblings: true
            }],

            // 考虑到columns中render中的函数定义可能在columns之后,关闭variables校验

            'no-use-before-define': ['error', {
                functions: true,
                classes: true,
                variables: false
            }],

            // type文件（后台传输的数据）里全是非驼峰变量

            'camelcase': 'off',

            // 允许逻辑短路，三元逻辑等使用不报错，项目中经常出现

            'no-unused-expressions': 'off',

            // 最大长度由100改为120，原来的值也为120

            'max-len': ['error', 200, 2, {

                ignoreUrls: true,

                ignoreComments: false,

                ignoreRegExpLiterals: true,

                ignoreStrings: true,

                ignoreTemplateLiterals: true,

            }],

            // ==============以下是eslint-config-sofa-react中原有,也是针对airbnb规则进行修改==============

            // 'no-restricted-globals': ['error'].concat(restrictedGlobals),    这个是干嘛的？？？

            'react/destructuring-assignment': "off",

            'react/jsx-closing-tag-location': 'off',

            'react/forbid-prop-types': 'off',

            'react/jsx-first-prop-new-line': ['error', 'multiline'],

            'react/require-default-props': 'off',

            'react/require-extension': 'off',

            'react/self-closing-comp': 'off',

            'react/sort-comp': 'off',

            "import/no-extraneous-dependencies": "off",

            'import/first': 'error',

            'import/no-amd': 'error',

            'import/no-webpack-loader-syntax': 'error',

            // add by lc
            'react/jsx-equals-spacing': 'off',
            'react/jsx-curly-spacing': 'off',
            'react/jsx-curly-newline': 'off',

            // add by xiumin
            // 对 div 等元素绑定 click事件时需要增加role 属性，增加了之后又需要增加焦点处理 so关闭了
            'jsx-a11y/no-static-element-interactions': 'off',
            'jsx-a11y/click-events-have-key-events': 'off',
            'complexity': 'off',
            'jsx-a11y/no-noninteractive-element-interactions': 'off',
            'react/jsx-props-no-spreading': 'off',
            "@typescript-eslint/class-name-casing": "off",
            "@typescript-eslint/camelcase": ["off"],
            "@typescript-eslint/interface-name-prefix": [2, "always"],
            "@typescript-eslint/no-empty-function": ["off"],
            "@typescript-eslint/no-this-alias": "off",
            "@typescript-eslint/explicit-function-return-type": ["off"]
        },

    },
    ],

}
