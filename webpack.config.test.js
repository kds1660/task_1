var nodeExternals = require('webpack-node-externals');
module.exports = {
    module: {
        rules: [
            {
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["env"]
                    }
                }
            }
        ]
    },
    target: 'node'
};