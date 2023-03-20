import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { NativeModules } from "react-native";
import Loader from "./Loader";


const CreateBlog = (props) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorDescription, setAuthorDescription] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    getCsrfToken();
  }, []);

  const getCsrfToken = async () => {
    setIsLoad(true);
    const { RNCookieManager } = NativeModules;
    try {
      const response = await fetch("http://192.168.43.45:8000/csrf_token", {
        method: "GET",
        headers: {
          "X-CSRFToken": "not-a-token",
        },
      });
      console.log(response);
      setToken(setToken);
      setIsLoad(false);
    } catch (error) {
      console.error(error);
      setIsLoad(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    setIsValid(
      title && slug && coverImg && content && authorName && authorDescription
    );
  }, [title, slug, coverImg, content, authorName, authorDescription]);

  const handleSubmit = async () => {
    if (!isValid) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    setIsLoad(true);

    const data = new FormData();
    data.append("title", title);
    data.append("slug", slug);
    data.append("cover_img", {
      uri: coverImg,
      type: "image/jpeg",
      name: "cover_img.jpg",
    });
    data.append("content", content);
    data.append("author_name", authorName);
    data.append("author_description", authorDescription);

    axios
      .post("http://192.168.43.45:8000/blog/", data, {
        headers: {
          "X-CSRFToken": token,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const responseData = response.data;
        setMessage(responseData.message);
        if (responseData.success) {
          props.route.params?.getBlogs?props.route.params.getBlogs():null
          setIsLoad(false);
          setTitle("");
          setSlug("");
          setCoverImg("");
          setContent("");
          setAuthorName("");
          setAuthorDescription("");
        }
      });
  };

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (result) {
      console.log("result");
      setCoverImg(result.uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {!isLoad ? (
        <React.Fragment>
          {message ? (
            <View style={styles.message}>
              <Text>Submitted Success</Text>
            </View>
          ) : null}
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
          />
          <Text style={styles.label}>Slug *</Text>
          <TextInput
            style={styles.input}
            value={slug}
            onChangeText={setSlug}
            placeholder="Enter slug"
          />
          <View style={{ flexDirection: "row", textAlign: "start" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: 5,
                flex: 4,
              }}
            >
              Cover Image (png, jpeg) *
            </Text>
            <View style={{ flex: 1 }}>
              {coverImg && (
                <Image
                  source={{ uri: coverImg ? coverImg : "../assets/blog.jpg" }}
                  style={{ width: 50, height: 35, marginBottom: 2 }}
                />
              )}
            </View>
          </View>
          <View>
            <View style={{ flex: 4 }}>
              <Button title="Choose Image" onPress={handleImagePicker} />
            </View>
          </View>
          <Text style={styles.label}>Content *</Text>
          <TextInput
            style={styles.input}
            value={content}
            onChangeText={setContent}
            placeholder="Enter content"
            multiline={true}
          />
          <Text style={styles.label}>Author Name *</Text>
          <TextInput
            style={styles.input}
            value={authorName}
            onChangeText={setAuthorName}
            placeholder="Enter author name"
          />
          <Text style={styles.label}>Author Description *</Text>
          <TextInput
            style={styles.input}
            value={authorDescription}
            onChangeText={setAuthorDescription}
            placeholder="Enter author description"
            multiline={true}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </React.Fragment>
      ) : (
        <View style={{ marginTop: "80%" }}>
          <Loader />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    minHeight: 40,
  },
  message: {
    backgroundColor: "lightgreen",
    color: "green",
    alignItems: "center",
    padding: 8,
  },
});

export default CreateBlog;
