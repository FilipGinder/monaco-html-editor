module.exports = {
    entry: './src/index.ts',                                                        //gadjamo ulazni fajl
    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist'                                                     //izlazni fajl
    },
    resolve: {
      extensions: ['.ts', '.js']                                                    //definisemo sta se automatski prepoznaje
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',                                                         //definisemo sta se koristi za typescript
          exclude: /node_modules/
        },
        {
          test: /\.css$/,  
          use: ['style-loader', 'css-loader'],                                      //definisemo sta se koristi za css
        }
      ]
    },
    mode: 'development'
  };
  

  //sluzi za objedinjavanje javaScript-a i CSS-a u izlazni fajl bundle.js