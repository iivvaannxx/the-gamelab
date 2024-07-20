{
  inputs = {

    nixpkgs.url = "github:NixOS/nixpkgs/master";
    unstablepkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, unstablepkgs, flake-utils }: let

    inherit (flake-utils.lib) eachDefaultSystem;
    mkFlake = system: let

      # The set of packages to be used.
      upkgs = import unstablepkgs { inherit system; };
      pkgs = import nixpkgs { 
        
        inherit system; 
        config.allowUnfree = true; 
      };

      fhsEnv = pkgs.buildFHSUserEnv {
        
        name = "gamelab";
        targetPkgs = pkgs: [

          # The packages used within the project.
          upkgs.nodePackages_latest.pnpm
          pkgs.nodejs-slim

          # Optional, used to run some commands a lot faster.
          pkgs.bun

          # We need the packaged executable. The node-modules one doesn't work.
          pkgs.biome
          pkgs.wrangler
        ];
      };

    in {

      devShells.default = pkgs.mkShell {

        buildInputs = [ fhsEnv ];
        shellHook = ''
          exec ${fhsEnv}/bin/gamelab
        '';
      };
    };

  in eachDefaultSystem mkFlake;
}
