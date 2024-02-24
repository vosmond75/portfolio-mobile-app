import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AllScreen = () => {
    const [samples, setSamples] = useState([]);
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
            <ScrollView style={styles.scrollView}>
                {samples.length > 0 ? (
                    <>
                        {samples.map((sample, index) => (
                            <View key={index} style={styles.sampleContainer}>
                                <Image
                                    source={{ uri: `https://dosafind.com/oladoyin/_lesson/images/${sample.images[0].filename}` }}
                                    style={styles.image}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>{sample.name}</Text>
                                    <Text style={styles.description}>{sample.description}</Text>
                                    <TouchableOpacity onPress={() => Linking.openURL(sample.url)}>
                                        <Text style={styles.link}>{sample.url}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </>
                ) : (
                    <Text>No portfolio samples available :(</Text>
                )}
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
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    sampleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 75,
        height: 75,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        marginBottom: 5,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 10,
    },
    bottomNavItem: {
        alignItems: 'center',
        paddingBottom: 15,
    },
    bottomNavText: {
        fontSize: 12,
    },
});

export default AllScreen;
