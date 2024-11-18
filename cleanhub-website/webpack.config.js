// webpack.config.js
module.exports = {
    module: {
        rules: [
            {
                test: /\.module\.css$/,
                use: [
                    'style-loader', // Injects styles into the DOM
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true // Enable CSS Modules
                        }
                    }
                ]
            },
            // Other rules...
        ]
    },
    // Other configurations...
};
