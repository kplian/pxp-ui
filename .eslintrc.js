module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true
  },
  parser: "babel-eslint",
  extends: ["airbnb", "prettier", "prettier/react", "eslint:recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/forbid-prop-types": [0, { forbid: ["any"] }],
    "react/prop-types": 0,
    "react/jsx-props-no-spreading": "off",
  },
  env: {
    jest: true,
    browser: true,
    node: true
  }
};
