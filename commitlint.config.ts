import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "root",
        "apps",
        "menu",
        "games",
        "flappy-bird",
        "packages",
        "input-system",
      ],
    ],
  },
};

export default config;
