# YouTube Video Plan: React Native Screen Transitions + AI Workflow

## Goal

Make one video that does three things clearly:

1. Shows what `react-native-screen-transitions` makes possible in a real Expo app.
2. Explains the mental model for building custom transitions.
3. Shows how AI can generate transition ideas and the first draft of the interpolator code.

## Recommended angle

The best framing is:

"Most React Native apps use the default stack transition. In this video we will build transitions that feel product-specific, then use AI to generate new ones from motion descriptions."

That gives the video both a practical payoff and an AI hook without making the AI part feel gimmicky.

## What we already have in this repo

- `apps/native/components/stack.tsx` wires Expo Router into `createBlankStackNavigator()`.
- `apps/native/components/navigation/screen-options.tsx` already has a few strong transition presets:
  - `getFlowOptions()` - horizontal flow push
  - `getFullScreenSheet()` - vertical full-screen sheet
  - `getFullScreenSheeetScale()` - sheet + background scale
- `apps/native/app/(main)/_layout.tsx` already uses the sheet + scale transition when entering the flow.
- `apps/native/app/(main)/(flow)/_layout.tsx` already uses the horizontal flow transition between screens.

This is enough to build the video around a small set of polished examples instead of starting from zero.

## Best video structure

### 1. Hook (0:00 - 0:30)

Open with the most impressive motion first:

- enter the flow with the full-screen sheet + background scale
- tap through `screen1` -> `screen4`
- quickly show one AI-generated variation at the end of the hook

Line to land early:

"These transitions are not hardcoded native screens. They are custom interpolators in an Expo app, and you can even use AI to design new ones."

### 2. Why this library matters (0:30 - 1:30)

Explain the problem:

- default transitions are fine, but they do not match every product
- many apps need flows that feel like onboarding, sheets, cards, or layered navigation
- `react-native-screen-transitions` gives you control over the animation math

Keep this part visual and short.

### 3. Show the core mental model (1:30 - 4:00)

This is the most important teaching section.

Explain that each transition is basically:

- a `screenStyleInterpolator`
- a `progress` value
- some `interpolate()` calls
- returned styles like `transform`, `opacity`, and `overlayStyle`

Good teaching line:

"You are not building magic. You are mapping navigation progress into styles."

Use `apps/native/components/navigation/screen-options.tsx` as the main teaching file.

## Demo examples to include

I would keep the video to 3 examples total so it stays focused.

### Example 1 - Flow push

Use `getFlowOptions()` as the first technical example.

Why it works well:

- easy to understand
- clearly shows incoming and outgoing screens
- great for explaining the `progress` ranges `0 -> 1 -> 2`

Talking points:

- incoming screen starts at `width`
- active screen rests at `0`
- previous screen gets pushed left to `-width * 0.3`
- the transition feels more app-specific than the default stack

### Example 2 - Full-screen sheet

Use `getFullScreenSheet()` next.

Why it works well:

- simple vertical mental model
- good for modals, create flows, paywalls, or compose screens
- easy to compare with the horizontal flow transition

Talking points:

- gesture direction changes from horizontal to vertical
- the screen moves from `height` to `0`
- one small math change creates a very different UX feeling

### Example 3 - Sheet with background scale

Use `getFullScreenSheeetScale()` as the "polished production" example.

Why it works well:

- this is the most YouTube-friendly demo
- it looks advanced without being hard to explain
- it is the perfect bridge into AI-generated ideas

Talking points:

- the presented screen slides up
- the previous screen scales down slightly
- the top inset helps the background settle naturally
- this is where custom transitions start to feel premium

## How to present the AI portion

The AI section should come after the manual explanation, not before.

That order matters because the audience should first understand:

- what the library expects
- what `progress` controls
- how interpolation maps to motion

Then AI becomes a multiplier, not a black box.

## AI demo flow

### Step 1 - Describe the motion in plain English

Use prompts like:

"Create a React Native screen transition for `react-native-screen-transitions/blank-stack`. I want the new screen to slide in from the right, while the previous screen scales to 0.96 and shifts slightly left. Use `react-native-reanimated` `interpolate`, support gesture navigation, and return a `BlankStackNavigationOptions` object."

### Step 2 - Ask AI for the interpolator only

This usually gives cleaner output than asking for an entire app.

Ask for:

- the `screenStyleInterpolator`
- the `gestureDirection`
- the `transitionSpec`
- a short explanation of the progress ranges

### Step 3 - Refine with design language

Good refinement words:

- snappier
- more elastic
- less distance
- stronger depth
- subtle parallax
- more modal-like

### Step 4 - Verify in app

Show that AI gets you 70 to 80 percent there, then you tune:

- distances
- scale amount
- opacity
- spring config
- gesture direction

That is the real value story for the video.

## Prompt template for the video

Use a repeatable template on screen:

```txt
Create a custom transition for react-native-screen-transitions/blank-stack.

Requirements:
- Return a BlankStackNavigationOptions object
- Use react-native-reanimated interpolate
- Support gesture navigation
- Explain the progress mapping

Motion:
- Incoming screen: [describe start -> end]
- Outgoing screen: [describe active -> resting state]
- Optional overlay: [describe opacity/color]

Constraints:
- Keep it smooth and production-friendly
- Use a spring transitionSpec
- Avoid shared element assumptions
```

## Suggested examples for AI-generated variants

These are good because they are easy to describe and easy to judge visually:

1. Card deck push - next screen slides in while current screen shrinks and darkens slightly.
2. Layered modal - screen comes from bottom, background scales and rounds more.
3. Parallax push - next screen moves normally, previous screen drifts slower for depth.
4. Fade + slide - lightweight transition for settings or utility screens.

## Production plan before recording

Before filming, we should make the demo app feel intentional:

### Must-have

- add a simple "Transitions Lab" entry screen with buttons for each example
- give each example a clear name that matches the narration
- keep colors/backgrounds distinct so motion reads clearly on camera
- make sure gestures work cleanly in both directions

### Nice-to-have

- add one screen that lets you swap between transition presets quickly
- add a small text label showing which preset is active
- keep animation timing/springs consistent across examples unless the difference is intentional

## Recording checklist

- record simulator and code side by side
- zoom into `screen-options.tsx` during the explanation
- show one transition once at full speed, then once slowly while narrating the math
- keep the AI prompt visible long enough for viewers to copy the structure
- end with a montage of 3 to 4 transition variations

## Suggested talking points by section

### When introducing the library

"This gives you control over the transition itself, not just the screen content."

### When explaining the interpolator

"The whole trick is deciding what the screen should look like at progress 0, 1, and sometimes 2."

### When introducing AI

"AI is great at turning motion language into starter code, but you still need to art direct the final feel."

### When wrapping up

"Once you understand the progress mapping, you can design transitions the same way you design UI: by describing the experience you want."

## Best outcome for this project

If we do this well, the video should leave viewers with:

- one clear mental model
- three reusable transition patterns
- one prompt framework for generating their own ideas with AI
- confidence that this works in a real Expo Router app

## Recommended next build tasks

To support the video, the next implementation pass should be:

1. Add a dedicated transitions demo screen that links to each example.
2. Surface the existing sheet and sheet + scale presets in the UI.
3. Add one new AI-generated preset so the video has a before/after AI segment.
4. Polish labels, spacing, and colors so each transition reads clearly on camera.
