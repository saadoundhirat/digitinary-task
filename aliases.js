const aliases = (prefix = `src`) => ({
  '@': `${prefix}/`,
  '@history': `${prefix}/@history`,
  '@lodash': `${prefix}/@lodash`,
  '@digitinary': `${prefix}/@digitinary`,
  // '@mock-api': `${prefix}/@mock-api`,
});

module.exports = aliases;
