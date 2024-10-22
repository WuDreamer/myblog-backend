const config = {
    // 其他配置...
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "util": require.resolve("util/"),
            "fs": false, // 或者使用一个polyfill
            "net": false, // 或者使用一个polyfill
            "http": require.resolve("stream-http"),
            "querystring": require.resolve("querystring-es3")
        }
    }
};