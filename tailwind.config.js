module.exports = {
  content: [
    // other files...
    // "./node_modules/flowbite.{js,ts}",
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  plugins: [
    require('flowbite/plugin'),
    require('flowbite-datepicker')
  ],
}
