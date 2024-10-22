import { useState, useEffect } from 'react';
import { Text, View, Pressable } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import {
    NBR_OF_DICES,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS,
    BONUS_POINTS_LIMIT,
    SCOREBOARD_KEY
} from "../constants/Game";
import styles from '../style/style';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Container, Row, Col } from 'react-native-flex-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Gameboard = ({ navigation, route }) => {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('Throw the dices.');
    const [gameEndStatus, setGameEndStatus] = useState(false);
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
    const [playerName, setPlayerName] = useState('');
    const [scores, setScores] = useState([]);
    const [pointsSaved, setPointsSaved] = useState(true);
    const [bonusStatus, setBonusStatus] = useState('');
    const [isSelectingPoints, setIsSelectingPoints] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [board, setBoard] = useState(new Array(NBR_OF_DICES).fill(''));
    const [hasThrownDices, setHasThrownDices] = useState(false);

    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player);
        }
    }, [route.params?.player]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', getScoreboardData);
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const total = dicePointsTotal.reduce((sum, points) => sum + points, 0);
        if (total >= BONUS_POINTS_LIMIT) {
            setBonusStatus('You have earned the bonus points!');
        } else {
            const pointsNeeded = BONUS_POINTS_LIMIT - total;
            setBonusStatus(`You are ${pointsNeeded} points away from bonus.`);
        }
    }, [dicePointsTotal]);

    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                setScores(JSON.parse(jsonValue));
            }
        } catch (e) {
            console.error('Gameboard: Read error: ' + e);
        }
    };

    const endGame = () => {
        setIsGameOver(true);
    };

    const savePlayerPoints = async (totalScore) => {
        const newKey = scores.length + 1;
        const currentDate = new Date();

        const playerPoints = {
            key: newKey,
            name: playerName,
            date: currentDate.toLocaleDateString(),
            time: currentDate.toLocaleTimeString(),
            totalScore: totalScore,
        };

        try {
            const newScore = [...scores, playerPoints];
            const jsonValue = JSON.stringify(newScore);
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
            console.log('Gameboard: Save successful: ' + jsonValue);
        } catch (e) {
            console.error('Gameboard: Save error: ' + e);
        }
    };

    const chooseDice = (i) => {
        if (isSelectingPoints) {
            setStatus('Select and throw dices again.');
            return;
        }

        if (nbrOfThrowsLeft > 0 && !gameEndStatus) {
            const updatedDices = [...selectedDices];
            updatedDices[i] = !selectedDices[i];
            setSelectedDices(updatedDices);
        } else {
            setStatus('You need to throw the dices first.');
        }
    };

    const calculateTotalScore = () => {
        const total = dicePointsTotal.reduce((sum, points) => sum + points, 0);
        return total >= BONUS_POINTS_LIMIT ? total + BONUS_POINTS : total;
    };

    const chooseDicePoints = (i) => {
        if (nbrOfThrowsLeft === 0 && !gameEndStatus) {
            const updatedSelectedPoints = [...selectedDicePoints];
            const updatedPointsTotal = [...dicePointsTotal];

            if (!updatedSelectedPoints[i]) {
                updatedSelectedPoints[i] = true;
                const nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
                updatedPointsTotal[i] = nbrOfDices * (i + 1);

                setDicePointsTotal(updatedPointsTotal);
                setSelectedDicePoints(updatedSelectedPoints);
                setPointsSaved(true);
                setNbrOfThrowsLeft(NBR_OF_THROWS);
                setSelectedDices(new Array(NBR_OF_DICES).fill(false));
                setDiceSpots(new Array(NBR_OF_DICES).fill(0));
                setStatus('Throw dices.');

                if (updatedPointsTotal[i] > 0) {
                    const finalScore = calculateTotalScore();
                    console.log('Final score before saving:', finalScore);
                    setGameEndStatus(updatedSelectedPoints.every(point => point));
                    if (updatedSelectedPoints.every(point => point)) {
                        setStatus('Game Over! All categories have been used.');
                        savePlayerPoints(finalScore);
                    } else {
                        setIsSelectingPoints(true);
                    }
                }
            } else {
                setStatus("You have already selected points for " + (i + 1));
            }
        } else if (nbrOfThrowsLeft > 0) {
            setStatus("Throw the dices " + NBR_OF_THROWS + " times before setting points.");
        }
    };


    const throwDices = () => {
        if (gameEndStatus) {
            setStatus("The game has ended.");
            return;
        }

        if (nbrOfThrowsLeft <= 0) {
            setStatus("No throws left!");
            return;
        }

        const spots = [...diceSpots];
        const updatedBoard = [...board];

        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                const randomNumber = Math.floor(Math.random() * 6 + 1);
                updatedBoard[i] = 'dice-' + randomNumber;
                spots[i] = randomNumber;
            }
        }

        setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
        setDiceSpots(spots);
        setBoard(updatedBoard);
        setStatus('Select and throw the dices again.');
        setPointsSaved(false);
        setIsSelectingPoints(false);
        setHasThrownDices(true);
    };

    const handlePlayAgain = () => {
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setGameEndStatus(false);
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        setDiceSpots(new Array(NBR_OF_DICES).fill(0));
        setDicePointsTotal(new Array(MAX_SPOT).fill(0));
        setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
        setStatus('Throw the dices.');
        setBonusStatus('');
        setBoard(new Array(NBR_OF_DICES).fill('dice-1'));
        setHasThrownDices(false);

        console.log('Game reset, ready to play again.');
    };

    const getDiceColor = (i) => (selectedDices[i] ? "black" : "cadetblue");
    const getDicePointsColor = (i) => (selectedDicePoints[i] && !gameEndStatus ? "black" : "#dd7834");
    const getSpotTotal = (i) => dicePointsTotal[i];

    const dicesRow = Array.from({ length: NBR_OF_DICES }, (_, dice) => (
        <Col key={"dice" + dice}>
            <Pressable
                onPress={() => chooseDice(dice)}
                disabled={gameEndStatus || isSelectingPoints}
            >
                <MaterialCommunityIcons
                    name={board[dice]}
                    size={45}
                    color={getDiceColor(dice)}
                />
            </Pressable>
        </Col>
    ));

    const pointsRow = Array.from({ length: MAX_SPOT }, (_, spot) => (
        <Col key={"pointsRow" + spot}>
            <Text>{getSpotTotal(spot)}</Text>
        </Col>
    ));

    const pointsToSelectRow = Array.from({ length: MAX_SPOT }, (_, diceButton) => (
        <Col key={"buttonsRow" + diceButton}>
            <Pressable
                onPress={() => chooseDicePoints(diceButton)}
                disabled={selectedDicePoints[diceButton] || gameEndStatus}
                style={({ pressed }) => ({
                    opacity: (selectedDicePoints[diceButton] || gameEndStatus) ? 0.5 : 1,
                })}
            >
                <MaterialCommunityIcons
                    name={"numeric-" + (diceButton + 1) + "-circle"}
                    size={30}
                    color={getDicePointsColor(diceButton)}
                />
            </Pressable>
        </Col>
    ));

    const endBonusstatus = () => {
        if (bonusStatus == 'You have earned the bonus points!') {
            return ('You have earned the bonus points!')
        }
    }

    return (
        <>
            <Header />
            <View style={styles.container}>
                <Container>
                    {isSelectingPoints || gameEndStatus || !hasThrownDices ? (
                        <View style={{ alignItems: 'center', marginVertical: 20 }}>
                            <MaterialCommunityIcons name="dice-multiple-outline" size={50} color="black" />
                        </View>
                    ) : (
                        <Row>{dicesRow}</Row>
                    )}
                </Container>

                {!gameEndStatus && (
                    <>
                        <Text style={styles.throwsLeft}>Throws left: {nbrOfThrowsLeft}</Text>
                        <Text>{status}</Text>
                        <Text style={styles.totalPointsText}>TOTAL: {calculateTotalScore()}</Text>
                        <Text style={styles.bonusStatusText}>{bonusStatus}</Text>

                        <Pressable
                            onPress={throwDices}
                            disabled={(nbrOfThrowsLeft === 0 && !pointsSaved) || gameEndStatus}
                            style={({ pressed }) => [
                                {
                                    backgroundColor: (nbrOfThrowsLeft === 0 && !pointsSaved || gameEndStatus) ? 'grey' : 'cadetblue',
                                },
                                styles.throwButton
                            ]}
                        >
                            <Text style={styles.buttonText}>THROW DICES</Text>
                        </Pressable>
                    </>
                )}

                <Container style={styles.pointRow}>
                    <Row>{pointsRow}</Row>
                </Container>
                <Container>
                    <Row>{pointsToSelectRow}</Row>
                </Container>
                <Text style={styles.playerName}>Player: {playerName}</Text>

                {gameEndStatus && (
                    <View style={styles.gameEndContainer}>
                        <Text style={styles.gameEndText}>
                            Game Over! Your final score is {calculateTotalScore()}.
                        </Text>
                        <Text>{endBonusstatus()}</Text>
                        <Pressable style={styles.playAgain} onPress={handlePlayAgain}>
                            <Text style={styles.buttonText}>PLAY AGAIN</Text>
                        </Pressable>
                    </View>
                )}
            </View>
            <Footer />

        </>
    );
};

export default Gameboard;