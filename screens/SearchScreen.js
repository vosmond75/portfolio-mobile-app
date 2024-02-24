import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.seanmorrow.ca/_lessons/portfolioData.php"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setSamples(data.samples);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    const matchingSample = samples.find((sample) =>
      sample.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResult(matchingSample || null);
  };

  const goToSelected = () => {
    navigation.navigate("Selected");
  };

  const goToAll = () => {
    navigation.navigate("All");
  };

  const goToRandom = () => {
    navigation.navigate("Random");
  };

  const goToSearch = () => {
    navigation.navigate("Search");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {samples.length > 0 ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter keyword..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Pressable onPress={handleSearch} style={styles.button}>
              <Text style={styles.buttonText}> Search</Text>
            </Pressable>
            {searchResult ? (
              <>
                <Text style={styles.title}> {searchResult.name}</Text>
                <Text style={styles.description}>
                  {" "}
                  {searchResult.description}
                </Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(searchResult.url)}
                >
                  <Text style={styles.link}> {searchResult.url}</Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                  {searchResult.images.map((image, index) => (
                    <Image
                      key={index}
                      source={{
                        uri: `https://dosafind.com/oladoyin/_lesson/images/${image.filename}`,
                      }}
                      style={styles.image}
                    />
                  ))}
                </View>
              </>
            ) : (
              <Text> No matches found...</Text>
            )}
          </>
        ) : (
          <Text>No portfolio samples available :(</Text>
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
        <BottomNavItem
          icon="checkbox-marked-circle"
          text="Selected"
          onPress={() => console.log("Navigate to Selected")}
        />
        <BottomNavItem
          icon="format-list-bulleted"
          text="All"
          onPress={() => console.log("Navigate to All")}
        />
        <BottomNavItem
          icon="shuffle"
          text="Random"
          onPress={() => console.log("Navigate to Random")}
        />
        <BottomNavItem icon="magnify" text="Search" onPress={goToSearch} />
      </View>
    </View>
  );
};

const BottomNavItem = ({ icon, text, onPress }) => {
  return <></>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  description: {
    fontSize: 16,
    paddingBottom: 10,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    paddingBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    padding: 10,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 10,
  },
  bottomNavItem: {
    alignItems: "center",
    paddingBottom: 15,
  },
});

export default SearchScreen;
