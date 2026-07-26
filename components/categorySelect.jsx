import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

const CategorySelect = ({categoryID, setCategoryID}) => {
  const category = [
    {
      id: "any",
      title: "Any Category",
      icon: <FontAwesome6 name="ellipsis" size={24} color="white" />,
    },
    {
      id: "9",
      title: "General Knowledge",
      icon: <FontAwesome5 name="brain" size={24} color="white" />,
    },
    {
      id: "10",
      title: "Books",
      icon: <MaterialCommunityIcons name="bookshelf" size={24} color="white" />,
    },
    {
      id: "11",
      title: "Film",
      icon: <FontAwesome6 name="film" size={24} color="white" />,
    },
    {
      id: "12",
      title: "Music",
      icon: <FontAwesome6 name="music" size={24} color="white" />,
    },
    {
      id: "13",
      title: "Musicals & Theatres",
      icon: <FontAwesome6 name="masks-theater" size={24} color="white" />,
    },
    {
      id: "14",
      title: "Television",
      icon: (
        <MaterialCommunityIcons
          name="television-classic"
          size={24}
          color="white"
        />
      ),
    },
    {
      id: "15",
      title: "Video Games",
      icon: <Entypo name="game-controller" size={24} color="white" />,
    },
    {
      id: "16",
      title: "Board Games",
      icon: <FontAwesome5 name="chess" size={24} color="white" />,
    },
    {
      id: "17",
      title: "Science and Nature",
      icon: <MaterialIcons name="science" size={24} color="white" />,
    },
    {
      id: "18",
      title: "Computers",
      icon: <MaterialIcons name="computer" size={24} color="white" />,
    },
    {
      id: "19",
      title: "Mathematics",
      icon: <FontAwesome5 name="divide" size={24} color="white" />,
    },
    {
      id: "20",
      title: "Mythology",
      icon: <Feather name="book-open" size={24} color="white" />,
    },
    {
      id: "21",
      title: "Sports",
      icon: <MaterialIcons name="sports-football" size={24} color="white" />,
    },
    {
      id: "22",
      title: "Geography",
      icon: <Entypo name="globe" size={24} color="white" />,
    },
    {
      id: "23",
      title: "History",
      icon: <AntDesign name="history" size={24} color="white" />,
    },
    {
      id: "24",
      title: "Politics",
      icon: <MaterialIcons name="policy" size={24} color="white" />,
    },
    {
      id: "25",
      title: "Art",
      icon: <FontAwesome6 name="paintbrush" size={24} color="white" />,
    },
    {
      id: "26",
      title: "Celebrities",
      icon: <MaterialIcons name="emoji-people" size={24} color="white" />,
    },
    {
      id: "27",
      title: "Animals",
      icon: <FontAwesome6 name="wolf-pack-battalion" size={24} color="white" />,
    },
    {
      id: "28",
      title: "Vehicles",
      icon: <AntDesign name="car" size={24} color="white" />,
    },
    {
      id: "29",
      title: "Comics",
      icon: <SimpleLineIcons name="book-open" size={24} color="white" />,
    },
    {
      id: "30",
      title: "Gadgets",
      icon: <MaterialIcons name="devices" size={24} color="white" />,
    },
    {
      id: "31",
      title: "Japanese Anime & Manga",
      icon: <SimpleLineIcons name="book-open" size={24} color="white" />,
    },
    {
      id: "32",
      title: "Cartoon & Animations",
      icon: (
        <MaterialCommunityIcons name="animation-play" size={24} color="white" />
      ),
    },
  ];
  return (
    <View className="h-[50vh]">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={category}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setCategoryID(item.id)}
            className={`w-96 h-20  ${item.id === categoryID ? "bg-[#A6CFD5] shadow-blue-50" : "bg-[#637081]"} mt-4 rounded-md items-center  flex flex-row gap-x-8 px-8 py-4 relative shadow-md `}
          >
            {item.icon}
            <Text className="font-body-semibold text-white text-2xl">{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategorySelect;
