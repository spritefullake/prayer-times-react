module.exports = {
    entry: './time-classes.ts',
    output: {
        path: __dirname,
        filename: 'time-classes.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js", '.json']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                {
                    loader: 'ts-loader'
                }]
            }
        ]
    },
}