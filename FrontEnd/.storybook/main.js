const path = require("path")

webpackFinal: async (config) => { 
      config.module.rules.push({ 
        test: /\,css&/, 
        use: [ 
            { 
            loader: "postcss-loader",
            options: { 
            ident: "postcss", 
            plugins: [require("tailwindcss"), require("autoprefixer")], 
            }, 
        }, 
        ], 
      include: path.resolve(__dirname, "../"), 
      }); 
      return config; 
    }, 

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: '@storybook/addon-postcss',
      options: {
      postcssLoaderOptions: {
      implementation: require('postcss'),
      },
      },
    },
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
}