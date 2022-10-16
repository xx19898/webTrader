const path = require('path');
const HTMPWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './index.tsx',
    context: path.join(__dirname, 'src'),
    output:{
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath : '/'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'src/index.html'),
        })
    ],
    resolve: {
      extensions: ['.tsx','.ts','*','.js'],
      modules: ['node_modules', path.resolve(__dirname, 'src')]
    },

    module: {
        rules: [
                {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                },
                {
                  test: /\.html$/i,
                  exclude: /node_modules/,
                  loader: "html-loader",
                },
                {
                    test: /\.tsx?$/,
                    exclude:[
                      path.join(__dirname,'./src/tests/')
                    ],
                    use: [
                      {
                        loader: 'ts-loader',
                        options: {
                          compilerOptions: {noEmit: false},
                        }
                      },
                    ],
                  },
                  {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                  },
                  {        
                    test: /\.css$/i,
                    include: path.resolve(__dirname, 'src'),
                    use: ['style-loader', 'css-loader', 'postcss-loader'],
                  },

               ],
    },
    devServer: {
      historyApiFallback: true,
      liveReload: true,
      watchFiles: path.join(__dirname,"/dist"),
      static: {
        directory: path.join(__dirname,'dist'),
      },
      compress: true,
    },
}