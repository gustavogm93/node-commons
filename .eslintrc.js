module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
        "plugin:react/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        "semi": ['error', 'never'],
        "react/jsx-filename-extension": [0, {
            "extensions": [".js", ".jsx"]
        }],
        "curly": ["error", "all"],
        "spaced-comment": [2, "always"],
        "no-use-before-define": 0,
        "import/no-extraneous-dependencies": 0,
        "one-var": [2, {
            "uninitialized": "always",
            "initialized": "never"
        }],
        "import/prefer-default-export": "off",
        "babel/new-cap": 1,
        "object-curly-newline": 0,
        "operator-linebreak": 0,
        "one-var-declaration-per-line": 0,
        "prefer-destructuring": [0, {
            "object": true,
            "array": false
        }],
        "padding-line-between-statements": [
            "error",
            {
                "blankLine": "always",
                "prev": "*",
                "next": "return"
            },
            {
                "blankLine": "always",
                "prev": "*",
                "next": "function"
            },
            {
                "blankLine": "always",
                "prev": "import",
                "next": "*"
            },
            {
                "blankLine": "any",
                "prev": "import",
                "next": "import"
            }
        ],
        "no-console": "error",
        "no-empty-function": 0,
        "@typescript-eslint/indent": 0,
        "no-useless-constructor": 0,
        "@typescript-eslint/no-parameter-properties": 0,
        "@typescript-eslint/explicit-member-accessibility": 0,
        "@typescript-eslint/member-delimiter-style": 0,
        "react/state-in-constructor": 0,
        "indent": ["error", 4]
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    },
    "env": {
        "jest": true,
        "browser": true,
        "node": true
    },
    plugins: ["babel", "prettier"],
    overrides: [{
            "files": "*.spec.ts",
            "rules": {
                "@typescript-eslint/explicit-function-return-type": 0
            }
        },
        {
            "files": "*.entity.ts",
            "rules": {
                "@typescript-eslint/explicit-function-return-type": 0
            }
        }
    ]
};