import type { Config } from "tailwindcss";
import { fontFamily, screens } from "tailwindcss/defaultTheme";

import pluginContainerQueries from "@tailwindcss/container-queries";
import pluginAnimated from "tailwindcss-animated";

// @ts-expect-error - These package has no types.
import pluginFluidType from "tailwindcss-fluid-type";

const config: Config = {
  content: ["./source/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: ["class"],
  safelist: ["dark"],

  plugins: [
    pluginAnimated,
    pluginContainerQueries,

    pluginFluidType({
      settings: {
        fontSizeMin: 1,
        fontSizeMax: 1.2,
      },
    }),
  ],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    screens: {
      xs: "375px",
      ...screens,
    },

    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",

        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",

        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },

        success: {
          DEFAULT: "hsl(var(--success) / <alpha-value>)",
          foreground: "hsl(var(--success-foreground) / <alpha-value>)",
        },

        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },

        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },

        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },

        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        header: ["Onest", "Arial", "Liberation Sans", "sans-serif"],
      },

      keyframes: {
        beat: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },

        float: {
          "0%": { translate: "0px 0px" },
          "50%": { translate: "0px -15px" },
          "100%": { translate: "0px 0px" },
        },
      },

      animation: {
        beat: "beat 1s infinite",
        float: "float 3s infinite alternate ease-in-out",
      },
    },
  },
};

export default config;
