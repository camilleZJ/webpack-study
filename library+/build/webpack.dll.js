const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        vendors: ['react', 'react-dom', 'lodash']
    },
    output : {
        filename: '[name].dll.js',  //name:vendors
        path: path.resolve(__dirname, '../dll'),
        library: '[name]'
    }
}