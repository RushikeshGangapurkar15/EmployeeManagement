import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/theme/theme';

const Loading = () => {
  return (
    <View style={styles.contaianer}>
      <ActivityIndicator color={COLORS.primaryOrangeHex} size="large" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  contaianer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
