import {withUt} from "uploadthing/tw"
export default withUt({
  content: ["./src/**/*.{ts,tsx,mdx}"]
})
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  corePlugins: {
    preflight: false
  },
  important: '#app',
  theme: {
    extend: {},
  },
  plugins: [],
}

