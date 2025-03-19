import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovie } from "@/services/api";

export default function Index() {
  const router = useRouter();

  const { data: movies } = useFetch(() => fetchMovie({ query: "" }));
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.red} className="w-20 h-12 mt-20 mb-5 mx-auto" />
        <View className="flex-1 mt-5 ">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search Movie"
          />
        </View>
      </ScrollView>
    </View>
  );
}
