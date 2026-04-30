import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { useContextAuth } from "../context/Auth.context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const { user, signOut } = useContextAuth();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: colors.primary }}
      >
        <Text
          style={{
            color: colors.white,
            fontSize: 18,
            marginBottom: 5,
            marginLeft: 5,
          }}
        >
          {user?.name}
        </Text>
        <View style={{ flex: 1, backgroundColor: colors.white, paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: colors.border }}>
        <TouchableOpacity onPress={() => signOut()} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={24} color={colors.black} />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Sair</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
