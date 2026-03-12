# YouTube Video Script: React Native Screen Transitions + AI

This version is based on the current codebase, not the earlier draft.

The app now has four real demo paths worth showing on camera:

1. Flow entry + in-flow push transitions
2. iOS-style slide
3. Snap sheet
4. Shared element card expansion

## Fast route map

- App shell: `apps/native/app/_layout.tsx`
- Custom stack bridge: `apps/native/components/stack.tsx`
- Main route-to-transition wiring: `apps/native/app/(main)/_layout.tsx`
- Demo launcher: `apps/native/app/(main)/(tabs)/index.tsx`
- Transition presets: `apps/native/components/navigation/screen-options.tsx`
- Flow overlay logic: `apps/native/app/(main)/(flow)/_layout.tsx`

## Recommended demo order

Use this order in the video so each section builds on the last one:

1. Hook with the flow entry animation
2. Show how Expo Router is still the routing system
3. Explain the custom stack bridge
4. Show how transitions are assigned per route
5. Teach the `progress -> styles` mental model
6. Break down the flow example
7. Show the slide preset
8. Show the snap sheet preset
9. Show the shared element preset
10. Use AI to generate a new preset from a motion description

## Part 1 - Hook

### On screen

- Start on `/(main)/(tabs)/index`
- Open the menu and tap `Flow`
- Tap through `screen1` to `screen4`
- Go back home, then quickly show `Sheet`
- Tap one of the boxes to show the shared transition

### Say

"Most React Native apps ship with the default stack transition. This app does not."

"It is still an Expo Router app, but every one of these transitions is custom. We have a layered flow, an iOS-style slide, a snap sheet, and a shared element card transition."

"Then at the end I will show you how AI can generate new transition ideas once you understand the mental model."

### Files to mention later

- `apps/native/app/(main)/(tabs)/index.tsx`
- `apps/native/app/(main)/_layout.tsx`
- `apps/native/components/navigation/screen-options.tsx`

## Part 2 - This Is Still an Expo Router App

### On screen

- Open `apps/native/app/_layout.tsx`
- Open `apps/native/components/stack.tsx`

### Say

"The first thing I want to make clear is that this is still a normal Expo Router app. File-based routing is still doing the route matching."

"What changes is the stack implementation. Instead of using the default stack, this project bridges Expo Router into `createBlankStackNavigator()` from `react-native-screen-transitions`."

"That gives us file-based routes on one side, and fully custom transition math on the other."

### Key code points

- `apps/native/app/_layout.tsx` sets up the app shell with gesture handling, keyboard support, theme, and the status bar.
- `apps/native/components/stack.tsx` is the architectural hinge. `withLayoutContext(...)` connects Expo Router to the blank stack navigator.

### One-liner

"Expo Router still owns the routes. `react-native-screen-transitions` owns the motion."

## Part 3 - Where Each Demo Is Wired In

### On screen

- Open `apps/native/app/(main)/_layout.tsx`

### Say

"This file is where the app stops being a generic router setup and starts becoming a transitions demo."

"At the layout level, each route gets its own transition preset. That means the flow route, the box detail route, the slide screen, and the sheet screen can all feel completely different even though they live in the same app."

### Walkthrough lines

- `name="(tabs)"` is the home shell.
- `name="(flow)"` uses `getFullScreenSheeetScale({ top })`.
- `name="box"` uses the shared element preset.
- `name="basic"` uses `slideOptions()`.
- `name="sheet"` uses `getSnapSheetOptions()`.

### One-liner

"The layout is where we decide what motion language belongs to each route."

## Part 4 - The Demo Launcher Screen

### On screen

- Open `apps/native/app/(main)/(tabs)/index.tsx`
- Scroll through the screen slowly

### Say

"This is the home screen for the whole demo. The grid of boxes is the shared element source, and the floating menu launches the other transition examples."

"I like this setup for a video because it makes the app feel real. It is not just one isolated animation sandbox. It is a routed app with multiple transition patterns living together."

### Callouts

- The boxes use `Transition.Pressable sharedBoundTag={item.id}`.
- Pressing a box pushes to `/(main)/box` with params.
- The floating menu launches:
  - `/(main)/(flow)/screen1`
  - `/basic`
  - `/sheet`

### One-liner

"This screen is the table of contents for the whole video."

## Part 5 - The Core Mental Model

### On screen

- Open `apps/native/components/navigation/screen-options.tsx`

### Say

"This is the most important file in the project. If you understand this file, you understand how to build your own transitions."

"The core idea is simple: navigation gives you a `progress` value, and you map that value into styles with `interpolate()`."

"You are not building magic. You are mapping progress into `translateX`, `translateY`, `scale`, `opacity`, border radius, or backdrop styles."

### What to point at

- Shared spring configs at the top
- `screenStyleInterpolator`
- Layout values like `width` and `height`
- `progress` ranges like `0 -> 1` and `0 -> 1 -> 2`
- Returned `contentStyle`, `overlayStyle`, `backdropStyle`, or shared bounds entries

### Teaching line

"`0` is usually where the new screen starts, `1` is where it rests, and `2` is often how the previous screen behaves once something else is on top of it."

## Part 6 - Flow Demo, Part A: Entering the Flow

### On screen

- Run the app
- From the home screen, tap `Flow`
- Then open `apps/native/app/(main)/_layout.tsx`
- Then show `getFullScreenSheeetScale()` in `apps/native/components/navigation/screen-options.tsx`

### Say

"The first part of the flow demo is the entry transition. The whole flow comes in like a full-screen sheet, and the background settles underneath it."

"That is happening at the parent stack level, not inside the flow screens themselves."

"The new route moves vertically from the bottom, while the previous route scales slightly and shifts down to create depth."

### Code points to explain

- `gestureDirection: "vertical"`
- `translateY` maps from `height` to `0`
- `scale` maps to `0.96` for the background layer
- `top - 14` helps the underlying screen settle naturally with safe area spacing

### One-liner

"Before we even enter the flow screens, we already changed the feel of the app."

## Part 7 - Flow Demo, Part B: Inside the Flow

### On screen

- Open `apps/native/app/(main)/(flow)/_layout.tsx`
- Open `apps/native/components/navigation/screen-options.tsx`
- Step through `screen1`, `screen2`, `screen3`, and `screen4`

### Say

"Once we are inside the flow, the motion language changes. Entering the flow is vertical, but moving through the steps is horizontal."

"That is a great example of why custom transitions matter. One route group can feel modal, and the next layer can feel like a multi-step onboarding flow."

### Explain the stack setup

- `screen1` uses a custom overlay and acts like the first step.
- `screen2`, `screen3`, and `screen4` use `getFlowOptions()`.
- Each screen also gets `meta` so the overlay button knows what action to run.

### Explain `getFlowOptions()`

Say this while pointing at the interpolator:

"Here the incoming screen starts at full `width`, rests at `0`, and then the previous screen keeps moving left when the next screen enters."

"That `0 -> 1 -> 2` mapping is the cleanest way to explain custom stack transitions."

### Explain the overlay

Say this while pointing at `FlowOverlay` in `apps/native/app/(main)/(flow)/_layout.tsx`:

"The overlay is what makes this feel like product UI instead of just animation math."

"The progress dots read the same transition progress value, and the bottom button uses per-screen metadata so it always knows what the next action should be."

"On screen two there is an input, and the bottom CTA shifts with the keyboard. That is a small detail, but it proves this can work in a real app flow, not just in a static demo."

### Useful lines

- "The transition is custom, but the UX still has to behave like a real screen."
- "This is where animation stops being decorative and starts supporting navigation."

## Part 8 - The Basic Slide Preset

### On screen

- Launch `/basic`
- Open `apps/native/components/navigation/screen-options.tsx`
- Open `apps/native/app/(main)/basic.tsx`

### Say

"This example is intentionally simple. It isolates the horizontal slide preset so you can feel one transition without other moving parts around it."

"If the flow demo shows a more product-shaped experience, this one shows the bare minimum structure of a custom preset."

### Explain the preset

- `gestureDirection` is horizontal
- `translateX` moves from `width` to `0`
- the previous layer shifts left for depth
- the content keeps a large continuous border radius for a rounded card-like feel

### One-liner

"This is a good starter preset because it is easy to understand and easy to remix."

## Part 9 - The Snap Sheet Preset

### On screen

- Launch `/sheet`
- Drag the sheet up and down
- Tap the snap buttons
- Tap the backdrop
- Scroll the content upward at the top
- Open `apps/native/components/navigation/screen-options.tsx`
- Open `apps/native/app/(main)/sheet.tsx`

### Say

"This is probably the richest demo in the project because it shows that transitions are not only about open and close. They can also manage intermediate states."

"Instead of a single final position, this screen has snap points. That means the sheet can rest at multiple heights and use different spring behavior when expanding or collapsing between them."

### Explain the preset

- `snapPoints` defines the resting positions
- `initialSnapIndex` controls where the sheet starts
- `expandViaScrollView` lets the sheet keep expanding from scroll gestures
- `backdropBehavior: "collapse"` makes the backdrop step the sheet downward before dismissing
- `transitionSpec.expand` and `collapse` use a softer spring than open and close

### Explain why `sheet.tsx` is good for the video

"I like this screen for a tutorial because the UI explains the config back to the viewer."

"The buttons call `snapTo(index)`, the cards describe the active props, and there are even commented options in `screen-options.tsx` you can turn on next."

### One-liner

"This is where the library starts feeling more like a navigation engine than a simple animation helper."

## Part 10 - The Shared Element Box Demo

### On screen

- Return to the home screen
- Tap a box from the grid
- Open `apps/native/app/(main)/(tabs)/index.tsx`
- Open `apps/native/app/(main)/box.tsx`
- Open `apps/native/components/navigation/screen-options.tsx`

### Say

"The shared element example is nice because the code is surprisingly small for how polished the result feels."

"The source card uses `Transition.Pressable` with a `sharedBoundTag`, the destination uses `Transition.View` with the same tag, and the screen options use `bounds({ id, method: \"transform\" })` to connect the two."

"So instead of just pushing a new screen in, the actual card grows into the destination layout."

### Explain the files

- `apps/native/app/(main)/(tabs)/index.tsx` is the source
- `apps/native/app/(main)/box.tsx` is the destination
- `apps/native/components/navigation/screen-options.tsx` defines the shared element preset
- `apps/native/app/(main)/_layout.tsx` assigns that preset to the `box` route

### One-liner

"This is a really good example of getting a premium feel with a very small amount of code."

## Part 11 - Supporting Files You Can Mention Quickly

These are not core to the transition logic, but they help the app read as intentional on camera.

### `apps/native/app/(main)/(tabs)/_layout.tsx`

Say:

"The tab shell has a big rounded container, which helps the layered transitions feel more like stacked cards and less like hard-edged full-screen swaps."

### `apps/native/global.css`

Say:

"The theme is stripped down and shadow-light on purpose so the motion reads clearly in the recording."

### `apps/native/components/header.tsx`

Say:

"The secondary tabs are intentionally simple. They make the app feel like a real product shell without distracting from the transition demos."

### `apps/native/babel.config.js`

Say:

"If you are following along, remember that Reanimated needs its Babel plugin enabled or these interpolators will not work correctly."

## Part 12 - AI Segment

### On screen

- Keep `apps/native/components/navigation/screen-options.tsx` open
- Show one of the existing presets first
- Then show your AI prompt

### Say

"Now that we understand the shape of these presets, this is where AI becomes useful."

"I do not want AI to invent the whole app. I want it to generate a `BlankStackNavigationOptions` starter based on a motion description."

"The important part is that you already know what to ask for: gesture direction, progress mapping, interpolated styles, and spring behavior."

### Prompt template

```txt
Create a custom transition for react-native-screen-transitions/blank-stack.

Return a BlankStackNavigationOptions object.
Use react-native-reanimated interpolate.
Support gesture navigation.
Explain the progress mapping.

Motion:
- Incoming screen: [describe it]
- Current screen underneath: [describe it]
- Optional overlay/backdrop: [describe it]

Constraints:
- Keep it production-friendly
- Use a spring transitionSpec
- Do not assume shared elements unless I ask for them
```

### Good examples to ask AI for

- "Make this feel more like a card deck."
- "Turn this into a subtle parallax push."
- "Give me a modal that lifts from the bottom while the background rounds more."
- "Create a lightweight fade-and-slide preset for utility screens."

### Important line

"AI is good at giving you a strong first draft, but you still art direct the feel by adjusting distance, scale, opacity, and spring values."

## Part 13 - Wrap-up

### Say

"The big takeaway is that custom screen transitions are just style interpolation driven by navigation progress."

"Once you understand that, you can mix different motion languages across the same app: modal entry, flow push, snap sheets, and shared elements."

"And once you understand the structure of a preset, AI becomes a really practical way to generate new transition ideas fast."

## If You Need A Shorter Version

If you want a tighter edit, keep these sections and cut the rest:

1. Part 1 - Hook
2. Part 3 - Route wiring
3. Part 5 - Core mental model
4. Part 7 - Flow internals
5. Part 9 - Snap sheet
6. Part 10 - Shared element
7. Part 12 - AI segment

## Bonus Code-Only Mention

There is also an unused `getFullScreenSheet()` preset in `apps/native/components/navigation/screen-options.tsx`.

If you want one fast extra line, say:

"There is also a simpler full-screen sheet preset in the codebase, but I kept the video focused on the examples that are already wired into the app UI."
