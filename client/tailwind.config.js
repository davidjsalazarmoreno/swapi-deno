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
	},
	theme: {
		backgroundColor: (theme) => ({
			...theme('colors'),
			'primary-swapi': '#272b30',
			'secondary-swapi': '#1C1C1E'
		}),
		extend: {
			backgroundImage: (theme) => ({
				'nav-bar': 'linear-gradient(#484e55, #3a3f44 60%, #313539);'
			})
		}
	}
};
