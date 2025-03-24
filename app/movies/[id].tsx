import {
  View,
  Text,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
  label: string;
  value: string;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 font-normal text-sm">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  0;
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5 ">
          <Text className="text-white text-xl font-bold">{movie?.title}</Text>
          <View className="flex-row items-center mt-2 gap-x-1 ">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center px-2 bg-dark-100 py-1 rounded-md gap-x-2 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count}) votes
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview || "N/A"} />

          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" | ") || "N/A"}
          />

          <View className="flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={
                movie?.budget ? `$${movie?.budget / 1_000_000} million` : "N/A"
              }
            />

            <MovieInfo
              label="Revenue"
              value={
                movie?.revenue
                  ? `$${
                      movie.revenue > 999_999_999
                        ? Math.round(movie.revenue / 1_000_000_000)
                        : Math.round(movie.revenue / 1_000_000)
                    } ${movie.revenue > 999_999_999 ? "billion" : "million"}`
                  : "N/A"
              }
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(" | ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute top-10 left-5 flex-row items-center bg-accent px-4 py-2 rounded-lg"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 rotate-180 mr-2"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
