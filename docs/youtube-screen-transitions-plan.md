# Simplified YouTube Script: React Native Screen Transitions

This version is shorter and centered on the API.

It is based on the current app plus the official docs for:

- custom animations
- screen interpolation props
- overlays
- screen transition config

## The whole story in one sentence

"This library lets you keep Expo Router, but replace the default screen motion with your own animation API."

## The video structure

1. Hook
2. Show the architecture in 30 seconds
3. Explain the API in plain English
4. Walk through the app examples
5. Show how AI can generate new presets

## Part 1 - Hook

### On screen

- Start on `apps/native/app/(main)/(tabs)/index.tsx`
- Tap `Flow`
- Tap through the flow
- Go back and show `Sheet`
- Tap one box to show the shared element transition

### Say

"This is still an Expo Router app, but none of these transitions are the default ones."

"We have a flow transition, a slide transition, a snap sheet, and a shared element transition, all driven by the same animation API."

## Part 2 - Architecture In 30 Seconds

### On screen

- Open `apps/native/app/_layout.tsx`
- Open `apps/native/components/stack.tsx`
- Open `apps/native/app/(main)/_layout.tsx`

### Say

"The routing is still Expo Router. The big change is that this app uses `createBlankStackNavigator()` under the hood, then connects it back into Expo Router with `withLayoutContext()`."

"That means file-based routes still work normally, but now each route can get a custom transition preset."

"In this layout file you can see that the flow, box, basic, and sheet routes all get different options."

## Part 3 - The API In Plain English

### On screen

- Open `apps/native/components/navigation/screen-options.tsx`

### Say

"Every screen gets an options object. That options object controls gesture behavior, animation behavior, overlay behavior, and sheet behavior."

"The most important key is `screenStyleInterpolator`. That is the function where you turn navigation state into styles."

## Part 3.1 - What goes in the options object

### Say

"These are the main keys you actually need to care about." 

- `gestureEnabled` - can I swipe this screen?
- `gestureDirection` - which direction controls dismiss or drag?
- `transitionSpec` - what spring or timing config gives the motion its feel?
- `screenStyleInterpolator` - how should the screen animate?
- `snapPoints` - if this is a sheet, where can it rest?
- `overlay` - do I want persistent UI above the stack?
- `meta` - do I want to pass custom data into the animation or overlay layer?

### Simple line

"Think of the options object as the contract for how this screen behaves."

## Part 3.2 - What `screenStyleInterpolator` receives

### Say

"The interpolator gets one big props object. You do not need all of it at first. Most of the time you start with just a few values."

- `progress` - where this screen is in the transition
- `layouts.screen.width` and `height` - useful for slide distances
- `current`, `next`, `active`, `inactive` - extra screen state if you need more control
- `snapIndex` - useful for sheets
- `bounds` - useful for shared elements
- `insets` - useful if safe area changes the final resting position

### Simple line

"In most demos, `progress` plus screen width or height is enough to get started."

## Part 3.3 - The progress model

### Say

"This is the most important concept in the whole library."

"The progress model is basically `0 -> 1 -> 2`."

- `0` = the screen is entering
- `1` = the screen is fully visible
- `2` = the screen is being covered by the next screen

### Teaching line

"Instead of writing one animation for enter and another for exit, you can often do both in one interpolation."

## Part 3.4 - What the interpolator returns

### Say

"The interpolator returns style targets. That is the part people usually overcomplicate, but it is actually very simple."

- `contentStyle` - styles for the main screen container
- `backdropStyle` - styles for the dim layer behind the screen
- `overlayStyle` - extra screen overlay styling when the preset needs it
- `[someId]` - styles for a specific shared element target

### Explain each one

#### `contentStyle`

"This is the main one. If you want the screen to slide, scale, fade, or round its corners, it usually happens in `contentStyle`."

Use examples from this repo:

- `getFlowOptions()` moves the screen with `translateX`
- `getFullScreenSheeetScale()` uses `scale` and `translateY`
- `slideOptions()` uses `translateX` and border radius

#### `backdropStyle`

"This controls the layer behind the screen. For modals and sheets, this is where you dim the background."

Use the sheet demo as the example:

"In `getSnapSheetOptions()` the backdrop opacity changes as the sheet opens and snaps."

#### `overlayStyle`

"This is an extra layer you can style as part of the transition. In this repo we use it in the full-screen sheet plus scale preset to keep that layer transparent instead of tinting the background."

#### `[someId]`

"If you return a keyed style object, you can target a specific transition-aware element. That is how shared element transitions work."

## Part 3.5 - What `meta` is

### Say

"`meta` is not animation by itself. It is just custom data you attach to the screen options."

"Then you can read that data inside your interpolator or inside an overlay."

### Repo example

Point to `apps/native/app/(main)/(flow)/_layout.tsx`.

Say:

"In this flow example, `meta` stores the button action for each step. The overlay reads `meta.onPress`, so the same overlay can stay mounted while each screen changes what the button does."

### Simple line

"`meta` is how you pass intent into the transition layer."

## Part 3.6 - What `overlay` is

### Say

"An overlay is persistent UI above the screens. It is perfect for things like a tab bar, player, progress UI, or a step button."

"The overlay gets props like `progress`, `focusedRoute`, `routes`, and `meta`, so it can animate with the stack and react to the current screen."

### Repo example

Point to `FlowOverlay` in `apps/native/app/(main)/(flow)/_layout.tsx`.

Say:

"Here the overlay gives us the progress dots and the Next button. That is why the flow feels like one cohesive experience instead of four disconnected screens."

## Part 3.7 - What `transitionSpec` does

### Say

"If `screenStyleInterpolator` decides what moves, `transitionSpec` decides how it feels."

"That is where the spring config lives for open, close, expand, and collapse."

### Repo example

"This project uses one snappy spring for most route transitions, and a softer spring for snap-point movement in the sheet."

## Part 4 - Walk The App Examples

## Part 4.1 - Flow entry

### On screen

- Tap `Flow`
- Open `apps/native/app/(main)/_layout.tsx`
- Open `getFullScreenSheeetScale()` in `apps/native/components/navigation/screen-options.tsx`

### Say

"The parent route uses a vertical sheet-style transition. The new screen comes from the bottom, and the previous screen scales down slightly."

"That is all happening in `contentStyle`, using `translateY` and `scale`."

"This is a great example of how a tiny amount of interpolation math can completely change the feel of navigation."

## Part 4.2 - Flow internals

### On screen

- Open `apps/native/app/(main)/(flow)/_layout.tsx`
- Open `getFlowOptions()`
- Tap from screen to screen

### Say

"Inside the flow, the transition changes from vertical entry to horizontal push."

"The key animation is just `translateX`, mapped across `0 -> 1 -> 2`."

"But the important architectural detail is the overlay plus meta. The overlay stays mounted, and `meta` tells it what the current step should do."

"That is a great pattern for onboarding, checkout, or any multi-step product flow."

## Part 4.3 - Basic slide

### On screen

- Open `/basic`
- Open `slideOptions()`

### Say

"This one is the simplest preset in the app. It is useful because it shows the minimum viable custom transition: horizontal movement, a little depth, and a spring."

## Part 4.4 - Snap sheet

### On screen

- Open `/sheet`
- Drag it, scroll it, tap the buttons
- Open `getSnapSheetOptions()`

### Say

"This example is the best place to explain `backdropStyle`, `snapPoints`, and `transitionSpec.expand` versus `transitionSpec.collapse`."

"The sheet itself moves in `contentStyle`, and the dimmed background is controlled by `backdropStyle`."

"Because this is a sheet, it can rest at multiple snap points, and the spring between snap points is softer than the spring for fully opening or dismissing the screen."

## Part 4.5 - Shared element box

### On screen

- Tap a box
- Open `apps/native/app/(main)/(tabs)/index.tsx`
- Open `apps/native/app/(main)/box.tsx`
- Open `getSharedElementOptions()`

### Say

"This example shows the shared element API. The source and destination share the same tag, and the interpolator uses `bounds(...)` to animate the element between layouts."

"Instead of only moving the whole screen, we are also animating a specific element inside the transition."

## Part 5 - The Easiest Way To Explain The API In One Minute

If you want a very short explanation in the video, say this:

"A screen transition preset is just an options object."

"Inside that object, `screenStyleInterpolator` gets progress and layout values, then returns style targets like `contentStyle` and `backdropStyle`."

"`contentStyle` animates the screen, `backdropStyle` animates the dimmed background, `meta` passes custom data, and `overlay` lets you keep UI floating above the stack."

"Once you understand that, the rest is just interpolation and spring tuning."

## Part 6 - AI Segment

### Say

"This is where AI becomes useful. I do not need AI to build the app. I need it to generate a preset."

"Now I can describe motion in plain English and ask for a `BlankStackNavigationOptions` object with a `screenStyleInterpolator`, a gesture direction, and a spring config."

### Prompt template

```txt
Create a custom transition for react-native-screen-transitions/blank-stack.

Return a BlankStackNavigationOptions object.
Use react-native-reanimated interpolate.
Explain the progress mapping.

Motion:
- Incoming screen: [describe it]
- Screen underneath: [describe it]
- Backdrop or overlay: [describe it]

Include:
- gestureDirection
- transitionSpec
- screenStyleInterpolator
```

### Say

"The important thing is that I now know how to judge the result. I know where `contentStyle` should go, where `backdropStyle` should go, and when I might need `meta` or an overlay."

## Part 7 - Wrap-up

### Say

"The big idea is that this library gives you a screen transition API, not just a few presets."

"You get progress, layout, gesture, and stack state, and you turn that into styles."

"Once that clicks, custom transitions stop feeling mysterious. They become a design problem you can solve with a small amount of code."

## Cheat Sheet

- `contentStyle` = animate the screen itself
- `backdropStyle` = animate the area behind the screen
- `overlay` = persistent UI above the stack
- `meta` = custom data for overlays or conditional animation logic
- `progress` = `0 -> 1 -> 2`
- `transitionSpec` = motion feel
- `snapPoints` = resting positions for sheets
- `bounds(...)` = shared element measurements
