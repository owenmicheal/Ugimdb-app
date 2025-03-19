import { View, Image, Text, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface props {
  onPress?: () => void;
  placeholder: string;
}

const SearchBar = ({ onPress, placeholder }: props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value=""
        onChangeText={() => {}}
        placeholderTextColor="#ab8bff"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
