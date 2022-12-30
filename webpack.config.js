module.exports = {
	entry: "./src/index.ts",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	devServer: {
		static: "./public",
		hot: true,
		client: {logging: "none"},
	},
	resolve: {extensions: [".ts", ".js"]},
	output: {filename: "bundle.js"},
	mode: "development",
};
