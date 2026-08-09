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

1. **Play Store deployment** — `eas.json`'s `production` profile (App Bundle/AAB, no `buildType` override) is ready to use; still need a Play Console listing (store copy, screenshots, privacy policy — required since the app fetches from a third-party API and persists local data), a signed `production` EAS build, and `eas submit --platform android`.
2. Home screen is fixed (see v2 below); no other known layout risk open right now.

## v2 (complete)
- **Difficulty & game type selection** — Home now exposes a collapsible "Advanced Options" section (`components/AdvancedOptions.jsx`) to pick OpenTDB `difficulty` (easy/medium/hard) and `type` (multiple/boolean), passed through to `utilities/getQuestions.js`.
- **Per-difficulty score history** — `utilities/highScore.js` now tracks high score + last-5-games history separately for each difficulty bucket (any/easy/medium/hard). Tap the High Score tile on Home to view history for the currently selected difficulty.
- **Home screen responsiveness fix** — Home was a single fixed-height `View` sized from raw `Dimensions.get("screen")` with no scroll, so on shorter/notched/nav-bar-heavy devices the Start Quiz button and OpenTDB attribution footer could get pushed off-screen. Reworked into a fixed-header / scrollable-middle / fixed-footer flex layout (`useSafeAreaInsets` for top/bottom padding, only the category `FlatList` scrolls) so the button and attribution are always visible. See `CLAUDE.md` for the layout contract to preserve when touching `app/index.jsx` again.
- **Android preview build** — first EAS preview build (internal APK) kicked off via `bunx eas-cli build --platform android --profile preview` to validate the above on a real device before considering v2 fully shipped.

## Gotchas learned this round (worth remembering before touching deps again)
- **`bun add` ignores Expo's SDK pinning.** It grabbed `expo-splash-screen@57.0.5` and would have grabbed `async-storage@3.1.1` — both are for the *next* Expo SDK, not SDK 56. Always cross-check against `https://raw.githubusercontent.com/expo/expo/sdk-56/packages/expo/bundledNativeModules.json` (or use `expo install`) before trusting `bun add`'s resolved version for any Expo-adjacent native package.
- **Reanimated 4.x needs `react-native-worklets/plugin` in `babel.config.js`**, not the old `react-native-reanimated/plugin` — worklets were split into their own package. Using the old plugin name silently breaks every Reanimated hook (this caused the "answer boxes not showing" bug).
- **Don't put a runtime-computed `className` directly on `Animated.View`** (or other non-core components) — NativeWind's docs call this pattern unsupported. Keep `Animated.View` limited to a plain `style` (for the animated value), and put Tailwind classes on a nested plain `View`/`Text` instead.
