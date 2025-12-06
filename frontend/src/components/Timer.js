import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.timerButton}
          onPress={() => setIsRunning(!isRunning)}
        >
          <Text style={styles.buttonText}>
            {isRunning ? 'Pause' : 'Start'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.timerButton, styles.resetButton]}
          onPress={resetTimer}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FF6B35',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  timerButton: {
    backgroundColor: '#27AE60',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetButton: {
    backgroundColor: '#6B6B6B',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});