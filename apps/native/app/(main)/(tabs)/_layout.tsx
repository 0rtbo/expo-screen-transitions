import {
  IconGlobe,
  IconMessageCircle,
  IconMeteor,
  IconCompass,
  IconUser,
} from "@tabler/icons-react-native";
import { Tabs, TabList, TabTrigger, TabSlot, useTabTrigger } from "expo-router/ui";
import { useThemeColor } from "heroui-native";
import { Pressable, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { ComponentProps, ReactNode } from "react";

const TAB_BAR_HEIGHT = 58;

type TabButtonProps = {
  name: string;
  href: ComponentProps<typeof TabTrigger>["href"];
  icon: (props: { color: string; strokeWidth: number }) => ReactNode;
};

function TabButton({ name, href, icon }: TabButtonProps) {
  const { trigger, triggerProps } = useTabTrigger({ name, href });
  const foreground = useThemeColor("foreground");
  const muted = useThemeColor("muted");
  const isFocused = trigger?.isFocused ?? false;
  return (
    <Pressable {...triggerProps} className="flex-1 items-center justify-center " style={{
      height: TAB_BAR_HEIGHT
    }}>
      {icon({
        color: isFocused ? foreground : muted,
        strokeWidth: 2.25
      })}
    </Pressable>
  );
}

export default function TabLayout() {
  const background = useThemeColor("background");
  const muted = useThemeColor("muted");
  const insets = useSafeAreaInsets();


  const tabListStyle: ViewStyle = {
    backgroundColor: background,
    height: TAB_BAR_HEIGHT + insets.bottom,
    flexDirection: "row",
    alignItems: "flex-start",
    borderTopColor: muted + "30",
    borderTopWidth: 0.5,
    paddingHorizontal: 8,
    paddingBottom: insets.bottom,
  };

  return (
    <Tabs>
      <TabSlot />
      <TabList style={tabListStyle}>
        <TabTrigger name="index" href="/" asChild>
          <TabButton
            name="index"
            href="/"
            icon={({ color, strokeWidth }) => <IconMeteor size={28} color={color} strokeWidth={strokeWidth} />}
          />
        </TabTrigger>
        <TabTrigger name="two" href="/two" asChild>
          <TabButton
            name="two"
            href="/two"
            icon={({ color, strokeWidth }) => <IconCompass size={28} color={color} strokeWidth={strokeWidth} />}
          />
        </TabTrigger>
        <TabTrigger name="messages" href="/messages" asChild>
          <TabButton
            name="messages"
            href="/messages"
            icon={({ color, strokeWidth }) => <IconMessageCircle size={28} color={color} strokeWidth={strokeWidth} />}
          />
        </TabTrigger>
        <TabTrigger name="world" href="/world" asChild>
          <TabButton
            name="world"
            href="/world"
            icon={({ color, strokeWidth }) => <IconGlobe size={28} color={color} strokeWidth={strokeWidth} />}
          />
        </TabTrigger>
        <TabTrigger name="profile" href="/profile" asChild>
          <TabButton
            name="profile"
            href="/profile"
            icon={({ color, strokeWidth }) => <IconUser size={28} color={color} strokeWidth={strokeWidth} />}
          />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
