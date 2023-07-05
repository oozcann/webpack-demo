const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {

  const devMode = options.mode !== 'production';
  const defStyle = [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'];
  console.log(devMode);
  console.log(options.mode);
  return {
      mode: devMode ? 'development' : 'production', // development ya da production olabilir. // dev mode'da çalıştırdığını belirtirsin, ya da prod yaparsın. if koşulu ile olabilir.
      // entry: './src/index.js', // temeldeki dosya budur. bunun içinden çalışır.
      entry: {
        index: {import: './src/index.js', dependOn: 'shared'},
        shared: 'lodash'
      },
      devServer: {
        static: './dist', // dev serverda dist'e kaydeder ve otomatik yenilenince ekranda değişiklik görünür.
      },
      module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader", // js'leri parse eder.
                    options: {
                        presets: ['@babel/preset-env'] // for compiling ES2015+ syntax
                    }
                }
            },
            {
                test: /\.css$/i,
                // use: ["style-loader", "css-loader"] // css dosyalarında verilen sıraya göre bu loader'lar kullanılır.
                use: defStyle
            },
            {
                test: /\.scss$/i,
                // use: ["style-loader", "css-loader", "sass-loader"] // scss dosyalarında verilen sıraya göre bu loader'lar kullanılır.
                use: defStyle
            }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({ // dist içine index.html dosyasını oluşturuyor.
            title: 'Development'
        }),
        new MiniCssExtractPlugin({ // dist içine scss,css gibi dosyaları minimize eder ve verilen isimle kaydeder.
            filename: 'asset/styles/[name].[contenthash].css',
            ignoreOrder: true,
            chunkFilename: '[id].css'
        })
      ],
      optimization: {
        splitChunks: {
            chunks: 'all'
        }
      },
      output: {
        filename: '[name].bundle.js', // output dosyaları bundle.js adında dosyaya yazar.
        path: path.resolve(__dirname, 'dist'), // dev server'dakinden farklı olarak build yapmadığın sürece bunun içindeki dosyalar değişmez.
      }
  }
};