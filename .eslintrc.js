module.exports = {
    extends: ['airbnb-base', 'plugin:react/recommended'],
    parser: 'babel-eslint',
    rules: {
        indent: 'off',
    },
    globals: {
        localStorage: true,
        fetch: true,
        window: true,
        document: true,
    },
};
