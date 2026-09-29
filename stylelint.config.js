export default {
  extends: ['stylelint-config-standard', 'stylelint-config-html/astro'],
  ignoreFiles: ['dist/**', 'dev/**', 'build/**', 'public/**'],
  rules: {
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    // Fluid type steps are named --step--1, --step-0, ...
    'custom-property-pattern': null,
    'custom-property-empty-line-before': null,
    // Newer than the linter's feature data
    'selector-type-no-unknown': [true, { ignoreTypes: ['left', 'right'] }],
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'target-current', 'interest-source', 'interest-target'] }],
  },
};
