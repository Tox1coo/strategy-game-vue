module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "/strategy-game-vue/" : "/",
	css: {
		loaderOptions: {
			sass: {
				prependData: ' @import "@/styles/_variables.scss"; @import "@/fonts/fonts.scss";'
			}
		}
	}
}