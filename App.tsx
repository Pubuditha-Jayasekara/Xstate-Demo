import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {useMachine} from '@xstate/react';
import {trafficLightMachine} from './trafficLightMachine';
import {TrafficLight} from './trafficLight';

const App = () => {
  const [state, send] = useMachine(trafficLightMachine);

  return (
    <View style={styles.parentContainer}>
      {/* Traffic Light component */}
      <TrafficLight currentLight={state.value as string} />
      {/* Information panel */}
      <View style={styles.informationContainer}>
        <Text style={styles.informationLabel}>
          Current State: {String(state.value)}
        </Text>
        <Text style={styles.informationLabel}>
          Repair Mode: {state.matches('repair') ? 'ON' : 'OFF'}
        </Text>
        <Text style={styles.informationLabel}>
          Times Broken: {state.context.timesBroken}
        </Text>
      </View>
      {/* switch panel */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => send({type: 'SWITCH'})}
          style={styles.button}>
          <Text>Switch Light</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => send({type: 'REPAIR'})}
          style={styles.button}>
          <Text>Repair Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => send({type: 'RESTART'})}
          style={styles.button}>
          <Text>Restart Light</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  informationContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  informationLabel: {
    fontSize: 20,
    color: '#ccd2d9',
    paddingTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 50,
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: '#516b87',
    padding: 15,
  },
});
