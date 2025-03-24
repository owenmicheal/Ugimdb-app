import { View, Image, Text } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

const saved = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image
          source={icons.person}
          tintColor={"#AB8BFF"}
          className="size-10"
        />
      </View>
    </View>
  );
};

export default saved;
