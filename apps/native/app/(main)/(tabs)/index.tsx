import { IconBell } from "@tabler/icons-react-native";
import { Button, Card, useThemeColor } from "heroui-native";
import { Pressable, View } from "react-native";

import { Header } from "@/components/header";
import { router } from "expo-router";

export default function Discover() {
  const foreground = useThemeColor("foreground");

  return (
    <>
      <Header >
        <Header.Left />
        <Header.Title>Discover</Header.Title>
        <Header.Right>
          <Pressable>
            <IconBell size={24} color={foreground} strokeWidth={2} />
          </Pressable>
        </Header.Right>
      </Header>
      <View className="flex-1 justify-end p-4">
      <Button onPress={() => router.navigate("/(main)/(flow)/screen1")}>
        <Button.Label>
          Label
        </Button.Label>
        </Button>
      </View>
    </>
  );
}
