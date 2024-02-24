import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const SelectedScreen = () => {
  const [samples, setSamples] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const navigation = useNavigation();

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
      setSelected(data.samples[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onChangeSample = (index) => {
    setSelectedSampleIndex(index);
    setSelected(samples[index]);
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
        <View style={styles.content}>
          {selected ? (
            <>
              <ScrollView horizontal>
                <View style={styles.imageContainer}>
                  {selected.images.map((image, index) => (
                    <Image
                      key={index}
                      source={{
                        uri: `https://dosafind.com/oladoyin/_lesson/images/${image.filename}`,
                      }}
                      style={styles.image}
                    />
                  ))}
                </View>
              </ScrollView>
              <Text style={styles.title}>{selected.name}</Text>
              <Text style={styles.description}>{selected.description}</Text>
              <TouchableOpacity onPress={() => Linking.openURL(selected.url)}>
                <Text style={styles.link}>{selected.url}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text>No portfolio samples available :(</Text>
          )}
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedSampleIndex}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => onChangeSample(itemIndex)}
          >
            {samples.map((sample, index) => (
              <Picker.Item key={index} label={sample.name} value={index} />
            ))}
          </Picker>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <BottomNavItem
          icon="checkbox-marked-circle"
          text="Selected"
          onPress={goToSelected}
        />
        <BottomNavItem
          icon="format-list-bulleted"
          text="All"
          onPress={goToAll}
        />
        <BottomNavItem icon="shuffle" text="Random" onPress={goToRandom} />
        <BottomNavItem icon="magnify" text="Search" onPress={goToSearch} />
      </View>
    </View>
  );
};

const BottomNavItem = ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.bottomNavItem} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={24} color="black" />
      <Text style={styles.bottomNavText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  pickerContainer: {
    paddingHorizontal: 5,
    marginBottom: 20,
    paddingBottom: 50,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 30,
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
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 10,
  },
  bottomNavItem: {
    alignItems: "center",
    paddingBottom: 15,
  },
  bottomNavText: {
    fontSize: 12,
  },
});

export default SelectedScreen;
