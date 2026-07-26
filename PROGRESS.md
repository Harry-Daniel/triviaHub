# TriviaHub — Progress & Roadmap

## Stack
- Expo SDK 56, Expo Router (file-based routing)
- NativeWind (Tailwind for React Native) + Tailwind v3 config (`tailwind.config.js`, not the v4 CSS-first `@theme` style)
- React 19.2 / React Native 0.85
- `react-native-reanimated` 4.x (+ `react-native-worklets`) for animation
- `react-native-safe-area-context` for safe-area insets
- `@react-native-async-storage/async-storage` for local persistence
- `html-entities` for decoding OpenTDB's HTML-encoded question text
- `@expo-google-fonts/*` (Space Grotesk, Inter, IBM Plex Mono) for the type system
- Data source: [Open Trivia DB API](https://opentdb.com/api.php) (CC BY-SA 4.0 — attribution required, commercial use allowed, see Home screen footer)

## Current Structure
- `app/_layout.jsx` — root layout. Loads fonts (`useFonts` + `expo-splash-screen` hold/hide pattern), wraps the app in `SafeAreaProvider` and `QuizProvider`.
- `app/index.jsx` — Home screen: quiz setup (question count + category), "Start Quiz" button, high score display, OpenTDB attribution footer.
- `app/quiz/index.jsx` — the quiz-taking screen: one question at a time, answer reveal, progress hub, and an inline "quiz complete" results state (no separate results route).
- `app/profile/index.jsx` — placeholder route proving file-based routing + param passing. No UI links to it anymore (no nav bar); deferred to v2, see below.
- `components/triviaSetup.jsx` — question count picker (10/15/20) + live High Score tile (now reads real persisted value).
- `components/categorySelect.jsx` — scrollable list of 24 OpenTDB categories with icons.
- `components/QuestionHub.jsx` — the quiz screen's signature progress indicator: a row of nodes (one per question) showing upcoming/current/correct/incorrect state.
- `components/AnswerOption.jsx` — single answer button: buzzer press-depth animation, reveals correct (green) / wrong (coral) / dimmed states after answering.
- `context/QuizContext.jsx` — owns quiz lifecycle (`idle | active | complete | empty`), current question index, answers, derived score, and the persisted high score.
- `utilities/getQuestions.js` — fetches questions from OpenTDB given `numQuestions` and `category`.
- `utilities/shuffleArray.js` — Fisher-Yates shuffle, used to randomize answer order per question.
- `utilities/highScore.js` — `getHighScore()` / `recordScore()`, backed by AsyncStorage. Stores best score as a **percentage** (not raw score), since quiz length varies (10/15/20) and percentage is the only fair cross-length comparison.

## Design system (quiz screen "Scoreboard" direction, rolled out app-wide)
- **Color**: Ink `#0F084B` (bg) · Seafoam `#A6CFD5` (accent) · Slate `#637081` (secondary surface) · Green `#4CAF7D` / edge `#3B8861` (correct) · Coral `#E1626B` / edge `#B8404A` (incorrect)
- **Type**: `font-display` (Space Grotesk Bold — headlines, big numerals, CTA buttons) · `font-body` / `font-body-semibold` (Inter — paragraph and list text) · `font-mono` (IBM Plex Mono — eyebrows, captions, counters). Applied uniformly across Home, Quiz, Profile, TriviaSetup, and CategorySelect.
- **Signature**: the `QuestionHub` progress ring — a row of connected nodes literalizing "Hub," encoding real progress + correctness, not decoration.

## What Works
- Full quiz loop: pick category + question count on Home → fetch from OpenTDB → answer questions one at a time with immediate reveal → completion screen with score → high score persists across app restarts (AsyncStorage).
- Empty/error state: if OpenTDB returns no results (bad category/count combo) or the fetch fails, the quiz screen shows a plain-language explanation instead of crashing or showing nothing.
- Reduced-motion respected (`useReducedMotion`) — buzzer press animation and question-transition animation are skipped when the OS setting is on.
- Safe-area aware layout on the quiz screen, so bottom-pinned buttons don't render under the Android system nav bar.
- "Start Quiz" shows a disabled/loading state (spinner + "Loading questions…") while the OpenTDB fetch is in flight, and ignores repeat taps until it resolves.

## What's Missing / Next Steps

1. **Safe-area pass on Home/Profile** — these still use `Dimensions.get("screen")` directly (same pattern the quiz screen had before the nav-bar-overlap fix). Not reported broken yet, but same latent risk.

## v2 (deliberately deferred)
- **Real Profile screen** — `app/profile/index.jsx` is currently just a routing demo with no way to reach it in the UI (no nav bar — decided the app doesn't need one). Revisit alongside score history.
- **Score history** — currently only the single best percentage is persisted (`utilities/highScore.js`); no record of past attempts. Natural pairing with a real Profile screen.

## Gotchas learned this round (worth remembering before touching deps again)
- **`bun add` ignores Expo's SDK pinning.** It grabbed `expo-splash-screen@57.0.5` and would have grabbed `async-storage@3.1.1` — both are for the *next* Expo SDK, not SDK 56. Always cross-check against `https://raw.githubusercontent.com/expo/expo/sdk-56/packages/expo/bundledNativeModules.json` (or use `expo install`) before trusting `bun add`'s resolved version for any Expo-adjacent native package.
- **Reanimated 4.x needs `react-native-worklets/plugin` in `babel.config.js`**, not the old `react-native-reanimated/plugin` — worklets were split into their own package. Using the old plugin name silently breaks every Reanimated hook (this caused the "answer boxes not showing" bug).
- **Don't put a runtime-computed `className` directly on `Animated.View`** (or other non-core components) — NativeWind's docs call this pattern unsupported. Keep `Animated.View` limited to a plain `style` (for the animated value), and put Tailwind classes on a nested plain `View`/`Text` instead.
