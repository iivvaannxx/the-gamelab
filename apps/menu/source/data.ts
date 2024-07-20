import type { ImageMetadata } from "astro";

import * as gameCovers from "@app/assets/games";

/** The metadata for a game. */
export type GameData = {
  name: string;
  description: string;
  cover: ImageMetadata;

  madeWith: string[];
  pathname: string;
  repo: string;

  disabled?: boolean;
};

/**
 * Defines a game with the given name and data.
 * @param name - The name of the game.
 * @param data - The data for the game, excluding the name, pathname, and repo.
 *
 * @returns An object representing a game.
 */
function defineGame<const Name extends string>(
  name: Name,
  data: Omit<GameData, "name" | "pathname" | "repo">,
) {
  const kebabCase = name.toLowerCase().replace(/\s+/g, "-");
  const pathname = `/${kebabCase}`;
  const repo = `https://github.com/iivvaannxx/the-gamelab/tree/main/games/${kebabCase}`;

  return {
    name,
    pathname,
    repo,
    disabled: false,
    ...data,
  } as const;
}

/** A list with all the games as of now. */
export const games = [
  defineGame("Flappy Bird", {
    description: `A mobile game where you'll navigate a small bird through gaps between endless pairs of 
    pipes by tapping the screen. Despite simple graphics, its challenging nature made
    it unexpectedly popular. Can you beat your high score without crashing?`,

    cover: gameCovers.FlappyBird,
    madeWith: ["TypeScript", "PixiJS"],
  }),

  defineGame("Tetris", {
    description: `A puzzle game where you'll arrange falling shapes to create solid lines.
    As speed increases, you must think fast to clear rows and prevent overflow.
    With its simplicity and addictive gameplay, Tetris became a timeless classic.
    Can you keep up as the pieces fall faster and faster?`,

    cover: gameCovers.Tetris,
    madeWith: [],
    disabled: true,
  }),

  defineGame("Arkanoid", {
    description: `A brick-breaking game where you'll bounce a ball to destroy blocks using
    a paddle. With power-ups and increasing challenges, it blends skill and
    strategy. Its satisfying gameplay made it an arcade classic. How many
    levels can you conquer before losing all your lives?`,

    cover: gameCovers.Arkanoid,
    madeWith: [],
    disabled: true,
  }),
] as const satisfies GameData[];
