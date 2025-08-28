import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import ShareHook from "@hooks/share";

const CustomHeader = () => {
  const navigation = useNavigation();
  const { onShare } = ShareHook();

  const handleLogoClick = () => {
    navigation.navigate("Home-Drawer");
  };

  return (
    <View style={styles.headerContainer}>
      <LinearGradient
        colors={["#181818", "#181818"]}
        style={styles.HeaderGradient}
      />
      <View style={styles.leftContainer}>
        <TouchableOpacity
        activeOpacity={0.9}
          onPress={() => navigation.toggleDrawer()}
          style={styles.menuButton}
        >
          <Icon name="bars" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.centerContainer}
        onPress={handleLogoClick}
      >
        <Image
          source={require("@assets/logo.png")}
          style={{ width: 130, height: 40 }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.rightContainer}
        onPress={onShare}
      >
        <Icon name="share-alt" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 41,
    width: "100%",
    borderBottomColor: "#222",
    borderBottomWidth: 1,
  },
  icon: {
    fontSize: 30,
    color: "#fff",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
  },
  menuButton: {
    marginRight: 20,
  },
  routeName: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },
  badge: {
    position: "absolute",
    right: -0,
    top: -0,
    backgroundColor: "green",
    borderRadius: 10,
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  HeaderGradient: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});

export default CustomHeader;
