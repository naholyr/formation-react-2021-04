![](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=YWN0b3IgRXZlcnlvbmUKAAkGQ2xpZW50CgoAAgYtPitTZXJ2ZXI6IGxvZ2luKHRva2VuKQoADwYtLT4tACoGOiBjYihnYW1lKQoKbG9vcCB0cnkgd29yZAogICAATQctPgBDCHRyeVdvcmQod29yZCkAHQUAIgVvcHQgZW5hYmxlL2Rpc2FibGUgaW5wdXQAPwUgICAgAG8HPgBsCAAfB0kAGA1ub3RlIG92ZQCBQwgsAIE5CGEgZmV3IG1vbWVudHMgbGF0ZXLigKYARBkAgQQGAFIKZW4AgUcGAIFNBQCBAggAgjUIOiBhZGRUcmlhbCh0cmlhbCkKAIF0BWFsdCBmb3VuZACCAgoAKBZ3aW5uZXIodXNlcm4AgkEFABEadXBkYXRlU2NvcmVzKHMAAgUAExx3b3JkTGVuZ3RoKGwAAgUAgmsGZW5kCmVuZAoKAINDCACCTAlmYWlsdXJlKGNvZGUpCg&s=default)

## Types

### `Token`

```js
string;
```

### `Game`

```js
{
  trials: [Trial], // all trials
  scores: [Score], // current scores
  wordLength: number, // current word's length
}
```

### `Score`

```js
{
  name: string, // player
  score: number, // points
}
```

### `Trial`

```js
{
  name: string, // player
  word: [ [ char: string, status: 0|1|2 ] ], // tried word
}
```

## Authentication (http)

### `POST /login`

- Input: `{ username: string }`
- Output: `{ token: Token }`

### `GET /whoami`

- Input (query string): `{ token: Token }`
- Output: `{ username: string }`

## Authentication (websocket)

- client → `login(token: Token, cb: (game: Game) => any)`

## Game (websocket)

- client → `tryWord(word: string)`
- server → `disableInput()`
- server → `enableInput()`
- server → `failure(code: string)`
- server → `addTrial(trial: Trial)`
- server → `winner(username: string)`
- server → `updateScores(scores: [Score])`
- server → `wordLength(wordLength: number)`
