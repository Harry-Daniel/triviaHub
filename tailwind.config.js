/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        display: ["SpaceGrotesk_700Bold"],
        body: ["Inter_400Regular"],
        "body-semibold": ["Inter_600SemiBold"],
        mono: ["IBMPlexMono_500Medium"],
      },
    },
  },
  plugins: [],
}