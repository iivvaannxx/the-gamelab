import { $, Glob } from "bun";

const gameFolderGlob = new Glob("./games/*");
const root = process.cwd();

// Scan all the game folders and build them.
for (const game of gameFolderGlob.scanSync({ onlyFiles: false })) {
  await $`
    game_name=$(basename ${game})
    echo "Building $game_name"

    cd ${game}
    pnpm run build

    # Copy the artifacts to the root dist folder.
    rm -rf ${root}/dist/$game_name
    mkdir -p ${root}/dist/$game_name
    cp -r ${game}/dist/* ${root}/dist/$game_name/

    # Go back to the root folder to build the next game
    cd ${root}
  `;
}
