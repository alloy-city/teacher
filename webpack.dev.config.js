const path = require('path');

const opts = {
    DEBUG: true,
    "ifdef-verbose": true,
    "ifdef-triple-slash": true
};

module.exports = {
    entry: './src/main.js',
    module: {
        rules: [{
            use: [{ loader: "ifdef-loader", options: opts }],
            exclude: /node_modules/
        }]
    },
    output: {
        filename: 'teacher-bundle.js',
        path: path.resolve("../../Alloy-Server-v3.0/apps/pantoufle/public/static-files/modules")
    },
    mode: "development",
    devtool: "inline-source-map"
};