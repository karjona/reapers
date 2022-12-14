# The Reapers: Tournament of Destiny

Reapers is a fighting game made in TypeScript for the [js13kGames 2022](https://js13kgames.com/) competition. The main goal is to create a game in less than 13KB! The theme for this year was "death".

Go to [karjona.github.io/reapers/](https://karjona.github.io/reapers/) to play the game!

If you want to play the game with additional assets that couldn't fit in the 13KB limit, go to [itch.io](https://karjona.itch.io/reapers)!

## Backstory

On the green fields near Mount Serrat, two otherworldly entities, Omiquiel, the devourer of souls, and Nomiquiel, the bestower of breath, come together once every thousand years to fight for the dominion of the living realms.

In a battle known as The Tournament of Destiny, they fight...

## About the game

This 2D fighting game is based on fighting game fundamentals known as _footsies_ or _neutral game_. I wanted to recreate some of the handled fighting games of old, like Street Fighter on the Game Boy or the SNK titles for Neo Geo Pocket!

Due to the size limit, the game's scope is minimal: you only have one attack and a parry. The goal is to keep your opponent at bay and to avoid getting hit. The game is played in rounds, and the first player to win two rounds wins the match.

Will you bait your opponent's attack and parry it? Or will you try to get in close and land a hit? The choice is yours!

## How to play

The game only has local multiplayer. You can play with a friend on the same computer or with a friend on another computer using [Parsec](https://parsec.app) or a similar service.

## Controls

### Player 1

| Action     | Key |
| ---------- | --- |
| Move left  | S   |
| Move right | D   |
| Attack     | X   |
| Parry      | C   |

### Player 2

| Action     | Key |
| ---------- | --- |
| Move left  | H   |
| Move right | J   |
| Attack     | B   |
| Parry      | N   |

### General

| Action                         | Key |
| ------------------------------ | --- |
| Show hitboxes during play      | T   |
| Start the game and menu select | X   |

## How to build from source

You will need [Node.js](https://nodejs.org/en/) 16+ installed on your machine. Vite is used as a dev and build tool.

```bash
# Install dependencies
npm install

# Run the game in dev
npm run dev

# Build the game for prod - output will be in the dist/ folder
npm run build
```

## Tools used for development

- [Vite](https://vitejs.dev/) - dev server and build tool
- [TypeScript](https://www.typescriptlang.org/) - language
- [Kontra.js](https://straker.github.io/kontra/) - game engine
- [zzfx](https://github.com/KilledByAPixel/ZzFX) - sound effects
- [Tinyfont](https://github.com/darkwebdev/tinyfont.js) - game font
- [Aseprite](https://www.aseprite.org/) - sprite editor

## Credits

All code is written by me, [Kilian Arjona](https://about.me/karjona). All art, backstory, and sound effects are made by my beautiful wife, ?????? Valeria Sivkova.

Full license can be found in the [LICENSE](LICENSE) file.
