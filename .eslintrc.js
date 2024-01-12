module.exports = {
    parser: 'espree',
    extends: ['eslint:recommended'],
    env: {
        browser: false,
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    rules: {
        "no-trailing-spaces": ["error"],
        "no-multiple-empty-lines": ["error", { "max": 1 }],
    }
};
