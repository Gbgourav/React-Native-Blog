import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const BlogDetail = ({ route }) => {
  const { item } = route.params;
  ///////
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{ uri: "http://192.168.43.45:8000/"+item.cover_img }}
          style={styles.blogImage}
          resizeMode="cover"
        />
        <Text style={styles.blogTitle}>{item.title}</Text>
        <Text style={styles.blogAuthor}>{item.author_name}</Text>
        <Text style={styles.blogCreatedAt}>Created at: {item.created_at}</Text>
        <Text style={styles.blogContent}>{item.author_description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  blogImage: {
    width: "100%",
    height: 200,
  },
  blogTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  blogAuthor: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
  },
  blogContent: {
    fontSize: 16,
    marginTop: 20,
    paddingHorizontal: 20,
    textAlign: "justify",
    fontFamily:"Roboto",
    color:"gray"
  },
  blogCreatedAt: {
    fontSize: 14,
    marginTop: 5,
    color: "gray",
  },

});

export default BlogDetail;
