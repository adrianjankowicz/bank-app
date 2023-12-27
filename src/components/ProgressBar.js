import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ step, totalSteps }) => {
  const completedPercentage = (step / totalSteps) * 100;

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${completedPercentage}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 10,
    width: '90%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 20, // to provide some spacing from the screen edges
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#5cb85c',
    borderRadius: 5,
  },
});

export default ProgressBar;
