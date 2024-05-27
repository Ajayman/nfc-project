import {withUt} from "uploadthing/tw"
export default withUt({
  content: ["./src/**/*.{ts,tsx,mdx}"]
})
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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

