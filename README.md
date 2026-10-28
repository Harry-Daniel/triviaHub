# TriviaHub

A trivia quiz app for Android and iOS, built with Expo and React Native. Choose a category, a difficulty and a question count, then answer questions one at a time and get feedback after each one. Your best scores are saved on the device.

Questions come from the [Open Trivia Database](https://opentdb.com/).

<!-- Screenshots: add images to a docs/ folder and reference them here, e.g.
<p align="center">
  <img src="docs/home.png" width="250" />
  <img src="docs/quiz.png" width="250" />
  <img src="docs/results.png" width="250" />
</p>
-->

## Features

- **24 categories**, from General Knowledge and Science to Film, History and Sports, plus "Any Category".
- **Quiz length**: 10, 15 or 20 questions.
- **Advanced options**: set the difficulty (Any / Easy / Medium / Hard) and the question type (Multiple Choice / True or False). The app remembers your last choice after you close it.
- **Feedback after every answer**: correct answers turn green and wrong ones turn coral. A row of nodes along the top shows your progress and which questions you got right.
- **High scores for each difficulty**: your best score and your last 5 games are saved separately for each difficulty. Tap the High Score tile to see your history. Scores are stored as percentages, so quizzes of different lengths can be compared fairly.
- **Error handling**: if the API returns no questions for your settings, or the network request fails, the app explains what happened instead of crashing.
- **Accessibility**: animations are skipped when the OS "reduce motion" setting is on, and the layout respects safe areas on notched devices and devices with gesture bars.

## Tech Stack

| Area        | Library                                                                 |
| ----------- | ----------------------------------------------------------------------- |
| Framework   | [Expo](https://expo.dev/) SDK 56, React Native 0.85, React 19           |
| Navigation  | [Expo Router](https://docs.expo.dev/router/introduction/) (file-based)  |
| Styling     | [NativeWind](https://www.nativewind.dev/) (Tailwind CSS v3)             |
| Animation   | React Native Reanimated 4 + react-native-worklets                       |
| Storage     | `@react-native-async-storage/async-storage`                             |
| Fonts       | Space Grotesk, Inter, IBM Plex Mono (via `@expo-google-fonts`)          |
| Data        | [Open Trivia DB API](https://opentdb.com/api_config.php)                |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (this project uses bun as its package manager)
- The [Expo Go](https://expo.dev/go) app on your phone, or an Android emulator / iOS simulator

### Install and run

```bash
git clone https://github.com/Harry-Daniel/triviaHub.git
cd triviaHub
bun install
bun start
```

Then scan the QR code with Expo Go, or press `a` (Android) or `i` (iOS) in the terminal.

You can also open a platform directly:

```bash
bun run android
bun run ios
```

> **Note:** The web target doesn't work yet (`react-native-web` isn't installed).

### Building with EAS

The project is set up for [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
# Installable APK for testing
bunx eas-cli build --platform android --profile preview

# App Bundle (AAB) for the Play Store
bunx eas-cli build --platform android --profile production
```

## Project Structure

```
app/
  _layout.jsx          Root layout: loads fonts, sets up providers
  index.jsx            Home: quiz setup, category picker, high score
  quiz/index.jsx       Quiz screen, including the results view
components/
  triviaSetup.jsx      Question count picker + high score / history tile
  AdvancedOptions.jsx  Difficulty and question type picker
  categorySelect.jsx   Scrollable category list
  QuestionHub.jsx      Node-row progress indicator
  AnswerOption.jsx     Answer button with press animation and reveal states
context/
  QuizContext.jsx      Quiz state (status, answers, score, high scores)
utilities/
  getQuestions.js      Open Trivia DB fetch
  highScore.js         High score and history storage, per difficulty
  quizPreferences.js   Saves the last-used difficulty and question type
  shuffleArray.js      Fisher–Yates shuffle for answer order
```

## Roadmap

- [ ] Release on the Google Play Store
- [ ] "Favourite category" (most played) and "Best category" (highest score) stats on Home
- [ ] Support for the web target

## Attribution

Trivia questions come from the [Open Trivia Database](https://opentdb.com/) and are licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

## License

[MIT](LICENSE) © Mawuko Senyo Hayibor
