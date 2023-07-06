import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Background } from '../components/Background/Background';
import { Foreground } from '../components/Foreground/Foreground';
import { CharacterContainer } from "../components/CharacterContainer/CharacterContainer";
import { useScore } from "../state";

export function GameScreen() {
  const [score, setScore] = useScore();

  useEffect(() => {
    function onKeydown() {
      setScore((prevScore) => prevScore + 1);
    }

    window.addEventListener('keydown', onKeydown)

    return () => window.removeEventListener('keydown', onKeydown);
  }, [])

  return <View style={styles.GameScreen}>
    <Text style={styles.title}>Score: {score}</Text>
    <Background />
    <Foreground />
    <CharacterContainer />
  </View>
}

const styles = StyleSheet.create({
  GameScreen: {
    width: '100%',
    height: '100%',
  },
  title: {
    textAlign: "center",
    backgroundColor: '#5c4033',
    color: '#fff',
    padding: '8px',
  },
  example: {
    marginTop: 8,
  },
});
