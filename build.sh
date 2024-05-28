#!/bin/env bash

root=$(pwd)

for dir in ./games/*; do 
  game=$(basename ${dir})
  echo "Building $game..."

  cd "$root/games/$game"
  pnpm run build

  distDir="$root/games/$game/dist"
  targetDir="$root/dist/$game"

  # Remove the existing dist folder if it exists (for the current game).
  if [ -d "$targetDir" ]; then
    rm -rf "$targetDir"
  fi

  # Copy the artifacts to the root dist folder.
  mkdir -p "$targetDir"
  cp -r "$distDir"/* "$targetDir"
      
  # Go back to the root folder to build the next game
  cd ${root}
done

