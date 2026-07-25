# TriviaHub — Progress & Roadmap

## Stack
- Expo SDK 56, Expo Router (file-based routing)
- NativeWind (Tailwind for React Native)
- React 19.2 / React Native 0.85
- Data source: [Open Trivia DB API](https://opentdb.com/api.php)

## Current Structure
- `app/_layout.jsx` — root layout, renders `<Slot />`. `NavBar` is imported but commented out.
- `app/index.jsx` — Home screen: quiz setup (question count + category), "Start Quiz" button.
- `app/profile/index.jsx` — placeholder screen, only proves file-based routing + param passing works. Not a real profile yet.
- `components/triviaSetup.jsx` — lets user pick number of questions (10/15/20). "High Score" is hardcoded to `50`.
- `components/categorySelect.jsx` — scrollable list of 24 OpenTDB categories with icons.
- `components/navBar.jsx` — bottom nav (Home/Profile), built but not mounted.
- `utilities/getQuestions.js` — fetches questions from OpenTDB given `numQuestions` and `category`.

## What Works
- Category + question-count selection state is wired via props from `Home`.
- "Start Quiz" fetches questions from the API successfully (currently just `console.log`s the result — app/index.jsx:44).

## What's Missing / Next Steps
1. **Quiz-taking screen** — no UI exists to actually display fetched questions, show multiple-choice answers, or navigate between questions. This is the biggest gap.
2. **Scoring** — no logic to track correct/incorrect answers or compute a final score.
3. **High Score persistence** — currently hardcoded (`components/triviaSetup.jsx:52`); needs real state + storage (e.g. AsyncStorage) tied to actual quiz results.
4. **Wire up NavBar** — built in `components/navBar.jsx` but commented out in `app/_layout.jsx:10`.
5. **Real Profile screen** — `app/profile/index.jsx` is just a routing demo; replace with actual profile content (stats, history, etc.) or repurpose the route.
6. **Results screen** — after quiz completion, show score summary and allow retry/return home.
7. **Loading/error states** — `getQuestions` has a try/catch but no UI feedback on fetch failure or while loading.

## Suggested Build Order
1. Quiz-taking screen (render one question at a time, handle answer selection, track score in state)
2. Results/summary screen on completion
3. Persist high score (AsyncStorage) and reflect it in `TriviaSetup`
4. Re-enable `NavBar`, build out a real Profile screen
5. Polish: loading spinners, error handling, animations
