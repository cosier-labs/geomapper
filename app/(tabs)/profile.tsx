import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import icons from "../../constants/icons"; // Make sure to adjust the path to your icons
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileButton from "../../components/Buttons/ProfileButton";
import AddButton from "../../components/Buttons/AddButton";

import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
      >
        <View className="flex items-center">
          <View className="w-28 h-28 rounded-full bg-gray-300 flex justify-center items-center">
            <Image
              source={icons.user}
              className="w-14 h-14"
              resizeMode="contain"
              style={{ tintColor: "#9ca3af" }}
            />
          </View>
          <Text className="text-lg mt-3 -mb-1 font-psemibold">
            Nicose John Soriano
          </Text>
          <View className="flex items-center space-y-2">
            <Text className="text-md text-black font-pregular">
              @nicosejohnsoriano /{" "}
              <Text className="text-md text-black font-pregular">
                Philippines
              </Text>
            </Text>
          </View>
          <View className="flex flex-row items-center space-x-2 mt-2">
            <ProfileButton title="Edit profile" onPress={() => router.push("/edit-profile")}/>
            <ProfileButton
              title="Settings"
              onPress={() => router.push("/user-settings")}
            />
          </View>
        </View>
        <View className="flex flex-row justify-between items-left space-x-2 mt-1">
          <TouchableOpacity
            onPress={toggleDropdown}
            className="mt-1 flex-row space-x-1.5"
          >
            <Text className="text-black text-lg font-psemibold">Catches</Text>
            <View className="mt-1.5">
              <Image
                source={icons.down}
                className="w-3 h-3"
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <AddButton />
        </View>

        <View className="flex flex-row items-center space-x-3 mt-2">
          <View className="w-24 h-24 rounded-md bg-gray-200 flex justify-center items-center">
            <Image
              source={icons.fish}
              className="w-12 h-12"
              resizeMode="contain"
            />
          </View>
          <View className="flex-1 mb-4">
            <Text className="text-black text-lg font-psemibold">
              Start your logbook
            </Text>
            <Text className="text-gray-500 text-sm font-pregular">
              Track all your catches in one place! Find and relive your fishing
              memories whenever you'd like.
            </Text>
          </View>
        </View>
      </ScrollView>
      {dropdownVisible && (
        <View className="absolute mt-2 bg-gray-200 p-4 rounded">
          <Text className="text-md text-black font-pregular">Catch 1</Text>
          <Text className="text-md text-black font-pregular">Catch 2</Text>
          <Text className="text-md text-black font-pregular">Catch 3</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;
