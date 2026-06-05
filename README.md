# JBTIER

The competitive PvP tier list for Minecraft Java & Bedrock.

## Project Structure

```
├── index.html          Main HTML
├── style.css           Styles
├── script.js           JavaScript logic
├── assets/
│   ├── logo.svg        Logo (SVG)
│   ├── backgrounds/    Background images (add your own)
│   └── players/        Player avatars (add your own)
└── README.md
```

## Usage

1. Open `index.html` in a browser, or
2. Deploy to GitHub Pages / any static host

## Adding Players

Edit `script.js` and add a new object to the `players` array:

```js
{
  id: 26,
  username: 'PlayerName',
  avatar: 'assets/players/playername.png',
  region: 'NA',           // NA, EU, ASIA, OCE, SA
  title: 'Your Title',
  socials: {
    youtube: 'https://youtube.com/...',
    twitter: 'https://twitter.com/...',
    discord: ''
  },
  tiers: {
    sword: 'HT1',
    axe: 'LT2',
    mace: 'HT3',
    crystal: 'LT1',
    diasmp: 'HT2',
    smp: 'HT3',
    pot: 'HT1',
    netherite: 'LT2',
    uhc: 'HT3'
  }
}
```

## Tier System

| Tier | Points |
|------|--------|
| HT1  | 60     |
| LT1  | 45     |
| HT2  | 30     |
| LT2  | 20     |
| HT3  | 10     |
| LT3  | 6      |
| HT4  | 4      |
| LT4  | 3      |
| HT5  | 2      |
| LT5  | 1      |

## Built With

- HTML5
- CSS3
- Vanilla JavaScript
