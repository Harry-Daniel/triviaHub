# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- Package manager: **bun**, not npm/npx/node. Use `bun install`, `bun add`, `bunx <tool>`.
- `bun start` — start the Metro dev server (Expo Router). Press `a`/`i`/`w` to open on Android/iOS/web, or use `bun run android` / `bun run ios` / `bun run web` directly.
- `bun run web` — **currently broken**: `react-native-web` is not installed, so Metro fails to resolve it from `app/_layout.jsx` and everything downstream. Web is not a working target right now; don't assume it is when testing UI changes. Fixing it means adding `react-native-web` (cross-check the exact version against the SDK 56 pin — see gotcha below) and likely `@expo/metro-runtime`.
- No test suite and no lint config exist in this repo currently.
- **EAS Build** (already configured — `eas.json`, logged in as `harryd` / hayiborkomla@gmail.com, `app.json` has a project id and Android package `com.harryd.triviahub`):
  - `bunx eas-cli build --platform android --profile preview` — internal-distribution APK, for sideloading/manual testing.
  - `bunx eas-cli build --platform android --profile production` — App Bundle (AAB), required for Play Store submission.
  - `bunx eas-cli submit --platform android` — submit a build to Play Store (not yet used on this project).

## Architecture

- **Expo Router** (file-based routing) under `app/`. `app/_layout.jsx` is the root layout: loads fonts, wraps everything in `SafeAreaProvider` and `QuizProvider`.
- Two screens total: `app/index.jsx` (Home — quiz setup + category picker + high score) and `app/quiz/index.jsx` (quiz-taking; the "complete" state is rendered inline in this same file, there is no separate results route).
- **`context/QuizContext.jsx`** is the single source of truth for quiz state — `status` (`idle | active | complete | empty`), `currentIndex`, `answers`, derived `score`, and the persisted `highScores`/`scoreHistories` maps (keyed by difficulty: `any | easy | medium | hard`). Screens/components consume it via `useQuiz()`; don't duplicate quiz state locally. `startQuiz(rawResults, difficulty)` takes raw OpenTDB results and builds `question` objects (decodes HTML entities, shuffles answer order) — see `buildQuestion` in that file.
- **Data flow for starting a quiz**: Home (`app/index.jsx`) collects `numQuestions`/`categoryID`/`difficulty`/`gameType` → calls `utilities/getQuestions.js` (raw OpenTDB fetch, no error throwing — logs and returns `undefined` on failure, caller must handle) → `startQuiz()` on the context → `router.push("/quiz")`.
- **Persistence** (`@react-native-async-storage/async-storage`, all in `utilities/`):
  - `highScore.js` — high score + last-5-games history, bucketed per difficulty. Score is stored as a **percentage**, not raw count, since quiz length (10/15/20) varies and percentage is the only fair cross-length comparison.
  - `quizPreferences.js` — remembers the last-selected difficulty/game type across app launches (read on Home mount, written on change).
- **Design system** ("Scoreboard" direction, applied app-wide): Ink `#0F084B` background, Seafoam `#A6CFD5` accent, Slate `#637081` secondary surface, Green `#4CAF7D`/edge `#3B8861` (correct), Coral `#E1626B`/edge `#B8404A` (incorrect). Type: `font-display` (Space Grotesk Bold — headlines/numerals/CTAs), `font-body`/`font-body-semibold` (Inter — body text), `font-mono` (IBM Plex Mono — eyebrows/captions). `components/QuestionHub.jsx`'s node-row progress indicator is the screen's signature visual element.
- **Home screen layout** (`app/index.jsx`) is a fixed-header / scrollable-middle / fixed-footer flex column, not a full-page `ScrollView`: header (title/decorative circle + `TriviaSetup` + `AdvancedOptions` + category label) and footer (Start Quiz button + OpenTDB attribution) are non-growing flex children; only the `flex-1`-wrapped `CategorySelect` (a `FlatList`) in between scrolls. This guarantees the Start Quiz button and attribution are always visible regardless of device height — don't reintroduce a page-level `Dimensions.get("screen")`-sized fixed container, that was the cause of a real bug (button/footer pushed off-screen on short devices).

## Gotchas learned the hard way (re-check before touching native deps)

- **`bun add`/`expo install` can grab a version meant for the *next* Expo SDK**, not the one this project is pinned to (SDK 56). Cross-check any Expo-adjacent native package against `https://raw.githubusercontent.com/expo/expo/sdk-56/packages/expo/bundledNativeModules.json` before trusting the resolved version.
- **Reanimated 4.x needs `react-native-worklets/plugin`** in `babel.config.js`, not the old `react-native-reanimated/plugin` — worklets were split into their own package. The old plugin name silently breaks every Reanimated hook.
- **Don't put a runtime-computed `className` directly on `Animated.View`** (or other non-core components) — NativeWind's docs call this unsupported. Keep `Animated.View` limited to a plain `style` prop; put Tailwind classes on a nested plain `View`/`Text` instead.
