import React, {useState} from 'react';
import {TextInput, StyleSheet, View, TouchableOpacity} from 'react-native';
import {CloseEye, EyeComponent} from '../assets/CustomIcons';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
} from '../assets/theme/theme';

interface TextInputComponentProps {
  value: string;
  onChangeText: any;
  placeholder: string;
  isPassword: boolean;
}

// TextInputComponent is a reusable component for text input with optional password visibility toggle.
const TextInputComponent: React.FC<TextInputComponentProps> = ({
  value,
  onChangeText,
  placeholder,
  isPassword,
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

  // Function to toggle secureTextEntry for password visibility
  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.inputContainer}>
      {/* TextInput for user input */}
      <TextInput
        style={[styles.input, {color: COLORS.primaryBlackHex}]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={COLORS.secendaryGreyHex}
      />

      {/* Toggle button for password visibility, rendered only if isPassword prop is true */}
      {isPassword && (
        <TouchableOpacity
          onPress={toggleSecureTextEntry}
          style={styles.toggleButton}>
          {secureTextEntry ? (
            <EyeComponent
              height={20}
              width={20}
              color={COLORS.primaryBlackHex}
            />
          ) : (
            <CloseEye height={20} width={20} color={COLORS.primaryBlackHex} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.secendaryGreyHex,

    paddingHorizontal: 17,
    borderRadius: BORDERRADIUS.radius_8,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.inter_medium,
  },
  toggleButton: {
    position: 'absolute',
    right: 5,
    padding: 10,
  },
});

export default TextInputComponent;
