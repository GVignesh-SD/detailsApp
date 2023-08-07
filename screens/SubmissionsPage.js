import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { deleteDetails } from "../redux/details/detailSlice";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const SubmissionsPage = () => {
  const details = useSelector((state) => state.details.details);
  //   console.log(details);
  const reversedDetails = [...details].reverse();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  function handleDelete(item){
    dispatch(deleteDetails(item));
    
  }

//   console.log(details);

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-blue-600 font-bold text-xl">Submissions</Text>
      <View className="mt-5">
        {reversedDetails.length > 0 ? (
          <View>
            <FlatList
              data={reversedDetails}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="flex-row items-center justify-between p-5 bg-blue-400 rounded-md my-2">
                  <TouchableOpacity onPress={() => {navigation.navigate("DetailsPage",{ item })}}>
                    <Text className="text-white font-bold text-[16px]">
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  <View className="flex-row gap-4">
                    <TouchableOpacity onPress={() => {navigation.navigate("EditPage",{ item })}}>
                      <Text className="text-white font-bold text-[16px]">
                        <Feather name="edit" size={24} color="white" />
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleDelete(item)}}>
                      <Text className="text-red-400 font-bold text-[16px]">
                      <MaterialIcons name="delete" size={24} color="red" />
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            >
            </FlatList>
          </View>
        ) : (
          <View className="flex-row items-center justify-center">
            <Text className="mt-10 font-bold text-pink-500 text-xl">No Submissions!</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SubmissionsPage;

const styles = StyleSheet.create({});
