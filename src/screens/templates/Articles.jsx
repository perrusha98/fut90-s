import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const ArticleTemplate = ({ children }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={["#000", "transparent"]}
        style={styles.background}
        locations={[0.5, 9]}
      />
      <View style={styles.contentContainer}>{children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#390000",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  contentContainer: {
    backgroundColor: "rgba(0,0,0,.8)",
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 20,
  },
});

export default ArticleTemplate;
