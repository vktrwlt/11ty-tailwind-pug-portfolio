const pug = require("pug");
const projectVars = require("../src/11ty/_data/project");
const pluginPWA = require("eleventy-plugin-pwa");
module.exports = function (eleventyConfig) {
	eleventyConfig.setLibrary("pug", pug);

	// minify the html output when running in prod
	if (projectVars.production) {
		eleventyConfig.addPlugin(pluginPWA);
		eleventyConfig.addTransform(
			"htmlmin",
			require("../build/scripts/minify-html")
		);
	}
	eleventyConfig.setBrowserSyncConfig({
		notify: true,
	});

	// Copy `static/root` to `dist/`
	eleventyConfig.addPassthroughCopy({ "src/static/": "/" });
	eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "/assets/fonts" });
	eleventyConfig.addPassthroughCopy({ "src/assets/images": "/assets/images" });

	return {
		dir: {
			input: "src/11ty/pages",
			output: "dist",
			includes: "../_includes",
			data: "../_data",
		},
	};
};
