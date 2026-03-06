import React from 'react';
import { useColorScheme } from 'react-native';
import { BlankStack } from './navigators/blank-stack';
import Transition from "react-native-screen-transitions";


export default function AppTabs() {
  // const scheme = useColorScheme();
  // const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <BlankStack >
      <BlankStack.Screen name="index" />
      <BlankStack.Screen name='explore'
        options={{
          gestureDirection: 'vertical',
              ...Transition.Presets.SlideFromBottom(),
            }}
      />
    </BlankStack>
  );
}
