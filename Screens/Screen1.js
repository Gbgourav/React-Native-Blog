import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import Loader from "./Loader";

const BlogItem = ({ item }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("BlogDetail", { item: item });
  };

  return (
    <TouchableOpacity style={styles.blogItem} onPress={handlePress}>
      <Image
        source={{ uri: "http://192.168.43.45:8000/" + item.cover_img }}
        style={styles.blogImage}
        resizeMode="cover"
      />
      <Text style={styles.blogTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const Screen1 = () => {
  const navigation = useNavigation();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://192.168.43.45:8000/get_data/", {
        method: "GET",
      });
      const data = await response.json(); // Parse response body as JSON
      console.log(data); // Log the parsed data
      setBlogs(data.data); // variable called 'blogs' to store the fetched data
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <FlatList
            data={blogs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <BlogItem item={item} />}
            style={styles.blogList}
          />
        </ScrollView>
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("CreateBlog", {getBlogs: getBlogs})}
      >
        <AntDesign name="plus" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  blogList: {
    marginTop: 12,
    width: "100%",
  },
  blogItem: {
    width: 300,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
  },
  blogImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  blogTitle: {
    fontSize: 16,
    flexWrap: "wrap",
    maxWidth: "80%", // added maxWidth to limit maximum width of text
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Screen1;
