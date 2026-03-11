import { Card } from "heroui-native";
import { View } from "react-native";

import { Header } from "@/components/header";

export default function Explore() {
  return (
    <View className="flex-1 bg-background">
      <Header>
        <Header.Left />
        <Header.Title>Explore</Header.Title>
        <Header.Right />
      </Header>
    </View>
  );
}
