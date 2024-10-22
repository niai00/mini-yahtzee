import { Text, View, Pressable, ScrollView } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import { BONUS_POINTS, BONUS_POINTS_LIMIT, SCOREBOARD_KEY } from "../constants/Game";
import { useState, useEffect } from 'react';
import styles from '../style/style';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Scoreboard = ({ navigation }) => {

    const [scores, setScores] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData();
        });
        return unsubscribe;
    }, [navigation]);

    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                const tmpScores = JSON.parse(jsonValue);
                // Sort scores based on totalScore in descending order
                tmpScores.sort((a, b) => b.totalScore - a.totalScore);
                setScores(tmpScores);
            }
        } catch (e) {
            console.log('Read error: ' + e);
        }
    }

    const clearScoreBoard = async () => {
        try {
            await AsyncStorage.removeItem(SCOREBOARD_KEY);
            setScores([]);
        } catch (e) {
            console.log('Clear error: ' + e);
        }
    }

    return (
        <>
            <Header />
            <View style={styles.scrollView}>

                {scores.length === 0 ? (
                    <Text style={styles.noScoresText}>No scores available.</Text>
                ) : (
                    <ScrollView>
                        <View style={{ alignItems: 'center'}}>
                            <MaterialCommunityIcons name="format-list-bulleted" size={50} color="grey" />
                        </View>
                        <Text style={styles.scrollViewTitle}>Top Seven</Text>
                        {scores.slice(0, 7).map((item, index) => (
                            <View key={index} style={styles.scoreItem}>
                                <Text style={styles.textItem}>
                                    {index + 1}. {item.name}
                                </Text>
                                <Text style={styles.textItem2}>
                                    {item.date}
                                </Text>
                                <Text style={styles.textItem3}>
                                    {item.time}
                                    </Text>
                                <Text style={styles.textItem4}>
                                    {item.totalScore !== undefined ? item.totalScore : 'N/A'}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                )}

                <Pressable style={styles.clearButton} onPress={clearScoreBoard}>
                    <Text style={styles.buttonText}>Clear Scoreboard</Text>
                </Pressable>
            </View>
            <Footer />
        </>
    )
}

