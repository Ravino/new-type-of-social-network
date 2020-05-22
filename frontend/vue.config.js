/**
 * @link https://cli.vuejs.org/ru/config/#гnобаnьная-конфигурация-cli
 */
module.exports = {
    pluginOptions: {
        sourceDir: 'src'
    },
    chainWebpack: config => {
        config.plugin("define").tap(args => {
            let _base = args[0]["process.env"];
            args[0]["process.env"] = {
                ..._base,
                "API_URL": JSON.stringify(process.env.URL),
            };
            return args;
        });
    }
    // First prop for ngrok, second enable https protocol.
    // devServer: {
    //     disableHostCheck: true,
    //     https: true,
    // },
};
