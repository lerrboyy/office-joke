# The Fire Drill Meeting

[![Competition](https://make.fun/badge/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162.svg)](https://make.fun/c/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162)
[![Rank](https://make.fun/badge/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162/lerrboyy/office-joke/rank.svg)](https://make.fun/c/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162)
[![Reward](https://make.fun/badge/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162/lerrboyy/office-joke/reward.svg)](https://make.fun/c/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162)

One-line office joke entry for the [One-Line Office Joke: 24-Hour Sprint](https://make.fun/c/u-pucuys-one-line-office-joke-24-hour-sprint-aaf86162) bounty on make.fun.

## The joke

> The fire drill is the only meeting everyone attends on time, because it's the only one with an actual exit.

107 characters, one line, no trailing newline.

## How it works

`main.ts` (Node 22, no dependencies) writes the joke to `/output/entry.txt`, validating it first against the bounty gate: UTF-8, 1–200 characters, a single line, not only whitespace. It clears only the *contents* of `/output` (never the directory itself), writes the entry, then reads it back and verifies it byte-for-byte before exiting.

Run it with:

```sh
node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
