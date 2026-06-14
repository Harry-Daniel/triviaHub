import { useLocalSearchParams } from "expo-router";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("screen");
const Profile = () => {
  const { params } = useLocalSearchParams();
  
  return (
    <View
      className="justify-center items-center p-4 gap-4"
      style={{ width: width, height: height }}
    >
      <Text className="text-gray-500">
        Welcome to the Profile Page. This page is to show that the flie-based
        routing works🥳🥳🥳
      </Text>
      <Text className="text-gray-500">
        <Text className="font-bold">Passed Params:</Text> {params}
      </Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
