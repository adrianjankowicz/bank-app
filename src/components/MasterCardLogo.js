import React from 'react';
import { View, StyleSheet } from 'react-native';

const MasterCardLogo = ({ style }) => {
  return (
    <View style={[styles.cardLogo, style]}>
      <View style={[styles.circle, styles.circleLeft]} />
      <View style={[styles.circle, styles.circleRight]} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardLogo: {
    width: 80,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'transparent', // Usunęliśmy tło, ale jest ono domyślnie przezroczyste.
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 25,
    position: 'absolute',
  },
  circleLeft: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)', // Przezroczysty czerwony
    left: 7,
    zIndex: 1,
  },
  circleRight: {
    backgroundColor: 'rgba(255, 255, 0, 0.7)', // Przezroczysty żółty
    right: 5,
    zIndex: 1,
  },
});

export default MasterCardLogo;
