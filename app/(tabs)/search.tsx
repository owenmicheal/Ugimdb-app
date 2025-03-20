import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovie } from "@/services/api";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

const search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading,
    Error,
  } = useFetch(() => fetchMovie({ query: searchQuery }));
  return (
    <View className="flex-1 bg-primary ">
      <Image
        source={images.bg}
        className="flex-1 z-0 absolute w-full"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.red} className="w-20 h-12" />
            </View>
            <View className="my-5 mt-20">
              <SearchBar
                placeholder="Search movies..."
                onChangeText={(text: string) => setSearchQuery(text)}
                value={searchQuery}
              />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {Error && (
              <Text className="text-red-500 px-5 my-3">{Error.message}</Text>
            )}

            {!loading && !Error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl text-white text-bold">
                Search results for {""}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
      />
    </View>
  );
};

export default search;
