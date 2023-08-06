import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { Video } from "expo-av";

const DetailsPage = () => {
  const route = useRoute();
  const { item } = route.params;
  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="">
          <Text className="text-green-600 font-bold text-xl">Details</Text>
        </View>
        <View className="mt-5 mx-1">
          <View className="flex-row items-center justify-between my-2">
            <Text className="text-blue-600 font-bold text-[16px]">Name</Text>
            <Text className="text-green-600 font-bold text-[16px]">
              {item.name}
            </Text>
          </View>
          <View className="mt-2">
            <Text className="text-blue-600 font-bold text-[16px]">Address</Text>
            <Text className="text-green-600 font-bold text-[16px] mt-2">
              {item.address}
            </Text>
          </View>
          <View className="flex-col my-2">
            <Text className="text-blue-600 font-bold text-[16px]">Hobbies</Text>
            <View className="my-2 flex-row items-center gap-2 pt-3">
              {item.hobbies.map((hobbie) => (
                <Text
                  key={hobbie}
                  className="bg-green-600 text-white p-3 rounded-3xl font-bold text-[16px]"
                >
                  {hobbie}
                </Text>
              ))}
            </View>
          </View>
          <View className="flex-row items-center justify-between my-2">
            <Text className="text-blue-600 font-bold text-[16px]">Country</Text>
            <Text className="text-green-600 font-bold text-[16px]">
              {item.countryName}
            </Text>
          </View>
          <View className="my-2">
            <Text className="mb-4 text-blue-600 font-bold text-[16px]">Image</Text>
            <Image
              source={{ uri: item.image }}
              className="self-center"
              style={{ width: 200, height: 200 }}
            />
          </View>
          <View className="my-2">
            <Text className="mb-4 text-blue-600 font-bold text-[16px]">Video</Text>
            <Video
                source={{ uri: item.video }}
                style={{ width: 300, height: 200 }}
                useNativeControls
                resizeMode="cover"
                className="self-center"
              />
          </View>
          <View className="flex-row items-center justify-between my-2">
            <Text className="text-blue-600 font-bold text-[16px]">City</Text>
            <Text className="text-green-600 font-bold text-[16px]">
              {item.city}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({});
