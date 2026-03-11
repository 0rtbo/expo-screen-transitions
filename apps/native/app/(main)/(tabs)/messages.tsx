import { Card } from "heroui-native";
import { View } from "react-native";

import { Header } from "@/components/header";

export default function Messages() {
  return (
    <View className="flex-1 bg-background">
      <Header>
        <Header.Left />
        <Header.Title>Messages</Header.Title>
        <Header.Right />
      </Header>
    </View>
  );
}
