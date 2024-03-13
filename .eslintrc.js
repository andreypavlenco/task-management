module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': 'error',
    
  //   "sort-imports": ["error", {
  //     "ignoreCase": false,
  //     "ignoreDeclarationSort": false,
  //     "ignoreMemberSort": false,
  //     "memberSyntaxSortOrder": [ 'single', 'all', 'multiple', 'none'],
  //     "allowSeparatedGroups": true
  // }]
    


  },

  
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dist/'],
};
