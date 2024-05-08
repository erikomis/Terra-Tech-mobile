import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useContextAuth } from "../context/Auth.context";
import { Ionicons } from "@expo/vector-icons";


const CustomDrawer = (props: any) => {
  const { user, loading, signOut } = useContextAuth();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#28502E" }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            marginBottom: 5,
            marginLeft: 5,
          }}
        >
          {user?.name}
        </Text>
        <View style={{ flexDirection: "row" }}></View>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity
          onPress={() => signOut()}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={24} color="black" />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Sair
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
