import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RandomScreen = () => {
    const [samples, setSamples] = useState([]);
    const [randomSample, setRandomSample] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://www.seanmorrow.ca/_lessons/portfolioData.php');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setSamples(data.samples);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSurpriseMe = () => {
        const randomIndex = Math.floor(Math.random() * samples.length);
        setRandomSample(samples[randomIndex]);
    };

    const goToSelected = () => {
        navigation.navigate('Selected');
    };

    const goToAll = () => {
        navigation.navigate('All');
    };

    const goToRandom = () => {
        navigation.navigate('Random');
    };

    const goToSearch = () => {
        navigation.navigate('Search');
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity onPress={handleSurpriseMe} style={styles.button}>
                    <Text style={styles.buttonText}>Surprise Me!</Text>
                </TouchableOpacity>
                {randomSample ? (
                    <>
                        <Text style={styles.title}>{randomSample.name}</Text>
                        <Text style={styles.description}>{randomSample.description}</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(randomSample.url)}>
                            <Text style={styles.link}>{randomSample.url}</Text>
                        </TouchableOpacity>
                        <View style={styles.imageContainer}>
                            {randomSample.images.map((image, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: `https://dosafind.com/oladoyin/_lesson/images/${image.filename}` }}
                                    style={styles.image}
                                />
                            ))}
                        </View>
                    </>
                ) : (
                    <Text>No portfolio samples available :(</Text>
                )}
            </View>
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
                <BottomNavItem
                    icon="shuffle"
                    text="Random"
                    onPress={goToRandom}
                />
                <BottomNavItem
                    icon="magnify"
                    text="Search"
                    onPress={goToSearch}
                />
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
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    description: {
        fontSize: 16,
        paddingBottom: 10,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
        paddingBottom: 10,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        padding: 10,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 10,
    },
    bottomNavItem: {
        alignItems: 'center',
        paddingBottom: 15,
    },
});

export default RandomScreen;
