import { cn } from "heroui-native";
import type { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEADER_HEIGHT = 56;
const HORIZONTAL_PADDING = 8;

type HeaderRootProps = {
  children: ReactNode;
  className?: string;
};

function HeaderRoot({ children, className }: HeaderRootProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={cn("flex-row items-center px-2 bg-background border-b border-border", className)}
      style={{ minHeight: HEADER_HEIGHT + insets.top, paddingTop: insets.top, borderBottomWidth: StyleSheet.hairlineWidth }}
    >
      {children}
    </View>
  );
}

type HeaderLeftProps = {
  children?: ReactNode;
  className?: string;
};

function HeaderLeft({ children, className }: HeaderLeftProps) {
  return (
    <View className={cn("w-11 items-center justify-center", className)}>
      {children}
    </View>
  );
}

type HeaderRightProps = {
  children?: ReactNode;
  className?: string;
};

function HeaderRight({ children, className }: HeaderRightProps) {
  return (
    <View className={cn("w-11 items-center justify-center", className)}>
      {children}
    </View>
  );
}

type HeaderTitleProps = {
  children: string;
  className?: string;
};

function HeaderTitle({ children, className }: HeaderTitleProps) {
  return (
    <Text className={cn("flex-1 text-center text-[17px] font-semibold text-foreground", className)}>
      {children}
    </Text>
  );
}

function HeaderSpacer() {
  return <View className="flex-1" />;
}

export const Header = Object.assign(HeaderRoot, {
  Left: HeaderLeft,
  Right: HeaderRight,
  Title: HeaderTitle,
  Spacer: HeaderSpacer,
});

export { HEADER_HEIGHT, HORIZONTAL_PADDING };
