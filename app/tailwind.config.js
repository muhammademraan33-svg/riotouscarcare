/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        riot: {
          bg: "#07090d",
          panel: "#0d1016",
          line: "rgba(255,255,255,0.08)",
          gold: "#d59a38",
          ember: "#ff6b35",
          ember2: "#ffb86b",
          text: "#e9edf5",
          muted: "rgba(233,237,245,0.72)",
        },
      },
      boxShadow: {
        ember:
          "0 0 0 1px rgba(255,107,53,0.25), 0 0 18px rgba(255,107,53,0.35), 0 0 48px rgba(255,107,53,0.20)",
      },
      backgroundImage: {
        "riot-radial":
          "radial-gradient(1200px 650px at 50% 20%, rgba(255,107,53,0.20), transparent 55%), radial-gradient(900px 520px at 80% 10%, rgba(213,154,56,0.20), transparent 55%), radial-gradient(900px 520px at 10% 10%, rgba(255,184,107,0.12), transparent 60%)",
      },
      fontFamily: {
        display: ["ui-sans-serif", "system-ui", "Inter", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

