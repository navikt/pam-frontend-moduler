const path = require('path')

module.exports = {
    addons: ['@storybook/addon-knobs'],
    stories: [
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    webpackFinal: (config) => {

        config.module.rules.push({
            test: /\.less$/i,
            use: [
                {
                    loader: "style-loader"
                },
                {
                    loader: "css-loader"
                },
                {
                    loader: "less-loader"
                },
            ]
        })

        return config
    }
}
