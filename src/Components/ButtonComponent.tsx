// ButtonComponent.js
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
} from '../assets/theme/theme';

interface ButtonComponentProp {
  title: string;
  onPress: any;
}

const ButtonComponent: React.FC<ButtonComponentProp> = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    width: '100%',
    backgroundColor: COLORS.primaryOrangeHex,

    borderRadius: BORDERRADIUS.radius_100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    // borderWidth: 1,
    width: '200%',
    color: '#fff',
    fontFamily: FONTFAMILY.inter_semibold,
    fontSize: FONTSIZE.size_14,

    textAlign: 'center',
  },
});

export default ButtonComponent;
