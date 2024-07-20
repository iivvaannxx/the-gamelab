#!/bin/env bash

root=$(pwd)

# Build all the monorepo packages first.
for dir in "./packages"/*; do
  package=$(basename ${dir})
  echo "Building $package..."

  cd "$root/packages/$package"
  pnpm install
  pnpm run build
done

# Build the menu page.
cd "$root/apps/menu"
pnpm install
pnpm run build

distDir="$root/apps/menu/build"
targetDir="$root/dist"

# Remove the previous dist folder if it exists.
if [ -d "$targetDir" ]; then
  rm -rf "$targetDir"
fi

# Copy the artifacts to the root dist folder.
mkdir -p "$targetDir"
cp -r "$distDir"/* "$targetDir"

cd ${root}

# Build all the games.
for dir in "./games"/*; do
  game=$(basename ${dir})
  echo "Building $game..."

  cd "$root/games/$game"
  pnpm install
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

