const production = !process.env.ROLLUP_WATCH; // or some other env var like NODE_ENV
module.exports = {
	future: {
		// for tailwind 2.0 compat
		purgeLayersByDefault: true,
		removeDeprecatedGapUtilities: true
	},
	plugins: [
		// for tailwind UI users only
		require('@tailwindcss/ui')
		// other plugins here
	],
	purge: {
		content: [
			'./src/**/*.svelte'
			// may also want to include base index.html
		],
		enabled: production // disable purge in dev
	}
};
