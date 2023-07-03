const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // development ya da production olabilir. // dev mode'da çalıştırdığını belirtirsin, ya da prod yaparsın. if koşulu ile olabilir.
  entry: './src/index.js', // temeldeki dosya budur. bunun içinden çalışır.
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
            use: ["style-loader", "css-loader"] // css dosyalarında verilen sıraya göre bu loader'lar kullanılır.
        },
        {
            test: /\.scss$/i,
            use: ["style-loader", "css-loader", "sass-loader"] // scss dosyalarında verilen sıraya göre bu loader'lar kullanılır.
        }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ // dist içine index.html dosyasını oluşturuyor.
        title: 'Development'
    })
  ],
  output: {
    filename: 'bundle.js', // output dosyaları bundle.js adında dosyaya yazar.
    path: path.resolve(__dirname, 'dist'), // dev server'dakinden farklı olarak build yapmadığın sürece bunun içindeki dosyalar değişmez.
  },
};