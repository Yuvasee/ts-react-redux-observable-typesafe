module.exports = function override(config, _env) {
    // Readable names for styled components in React DevTools
    config.module.rules[2].oneOf[1].options.plugins.push(['babel-plugin-styled-components']);
    return config;
};
