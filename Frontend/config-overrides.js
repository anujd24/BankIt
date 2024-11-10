import {webpack} from "webpack";

export function override(config, env) {
    // Modify webpack config with fallbacks and plugins
    config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
    };
    
    config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"];
    
    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ];

    return config;
};
