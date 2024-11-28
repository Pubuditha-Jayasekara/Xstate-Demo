import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface TrafficLightProps {
  currentLight: string
}

export const TrafficLight: React.FC<TrafficLightProps> = ({currentLight}) => {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentLight === 'repair') {
      // Start blinking
      interval = setInterval(() => {
        setIsBlinking((prev) => !prev);
      }, 500); // Blink every 500ms
    } else {
      setIsBlinking(false); // Stop blinking when not in repair mode
    }

    return () => {
      if (interval) {
        clearInterval(interval); // Clear interval when component is unmounted or mode changes
      }
    };
  }, [currentLight]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.light,
          {
            backgroundColor:
              currentLight === 'red' || currentLight === 'redYellow'
                ? 'red'
                : 'gray',
          },
        ]}>
        <Text style={styles.lightText}>Red</Text>
      </View>
      <View
        style={[
          styles.light,
          {
            backgroundColor:
              currentLight === 'yellow' ||
              currentLight === 'redYellow' ||
              (currentLight === 'repair' && isBlinking)
                ? 'yellow'
                : 'gray',
          },
        ]}>
        <Text style={styles.lightText}>Yellow</Text>
      </View>
      <View
        style={[
          styles.light,
          {backgroundColor: currentLight === 'green' ? 'green' : 'gray'},
        ]}>
        <Text style={styles.lightText}>Green</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: '#211e1e',
    padding: 20,
  },
  light: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightText: {
    color: '#ccd2d9',
    fontWeight: 'bold',
  },
});
