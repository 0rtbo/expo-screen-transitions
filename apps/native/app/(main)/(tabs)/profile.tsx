import { IconSettings } from "@tabler/icons-react-native";
import { Card, useThemeColor } from "heroui-native";
import { Pressable, View } from "react-native";

import { Header } from "@/components/header";

export default function Profile() {
  const foreground = useThemeColor("foreground");

  return (
    <View className="flex-1 bg-background">
      <Header>
        <Header.Left />
        <Header.Title>Profile</Header.Title>
        <Header.Right>
          <Pressable>
            <IconSettings size={24} color={foreground} strokeWidth={2} />
          </Pressable>
        </Header.Right>
      </Header>
    </View>
  );
}
