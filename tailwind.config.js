/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#080a0c",
        panel: "#101316",
        line: "#272d33",
        ink: "#f4f2ed",
        muted: "#a7adb2",
        dim: "#6f777d",
        signal: "#d6ff75",
        brass: "#d5aa62",
        rust: "#9d5f45"
      },
      fontFamily: {
        display: ["Inter Tight", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["IBM Plex Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        expensive: "0 24px 70px rgba(0, 0, 0, 0.34)",
        keyline: "inset 0 1px 0 rgba(255,255,255,0.06)"
      }
    }
  },
  plugins: []
};
