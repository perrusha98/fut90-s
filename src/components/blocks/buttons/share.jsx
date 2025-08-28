import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ShareHook from "@hooks/share";

const ShareButtons = () => {
  const { onShare } = ShareHook();

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.shareContent} onPress={onShare}>
      <Text style={styles.shareText}>
        <Icon name="share-alt" size={15} /> COMPARTIR
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shareContent: {
    alignItems: "center",
    marginTop: 10,
  },
  shareText: {
    flexGrow: 1,
    textAlign: "center",
    color: "#002f5a",
    borderWidth: 0,
    fontWeight: "700",
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 13,
    backgroundColor: "#a1afff",
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default ShareButtons;
