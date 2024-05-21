import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTFAMILY, FONTSIZE} from '../assets/theme/theme';
import ButtonComponent from '../Components/ButtonComponent';
import TextInputComponent from '../Components/InputTextComponent';
import auth from '@react-native-firebase/auth';
const ForgetPassword = ({navigation}: any) => {
  const [email, setemail] = useState('');
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const forgetPassword = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Password link send to email');
        navigation.pop();
      })
      .catch(err => {
        Alert.alert('invalid Email');
      });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flexGrow: 1, backgroundColor: '#fff'}}>
      <View style={styles.Container}>
        <View style={{gap: 30}}>
          <View style={styles.heading}>
            <Text style={styles.Title}>Forgot password?</Text>
            <Text style={styles.SubTitle}>
              Enter your email address and we'll send you confirmation code to
              reset your password{' '}
            </Text>
          </View>

          <View style={styles.InputText}>
            <Text style={styles.SubTextinputTitle}>Email Address </Text>
            <TextInputComponent
              value={email}
              onChangeText={(text: any) => setemail(text)}
              placeholder="Enter Email"
              isPassword={false}
            />
          </View>
        </View>

        <ButtonComponent
          title="Continue"
          onPress={() => {
            forgetPassword();
          }}
        />
      </View>
    </ScrollView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: 25,
    gap: 30,
    paddingVertical: 80,
    backgroundColor: COLORS.primaryWhiteHex,
    justifyContent: 'space-between',
  },
  heading: {
    gap: 5,
  },

  InputText: {
    gap: 5,
  },
  Title: {
    fontFamily: FONTFAMILY.inter_semibold,
    fontSize: FONTSIZE.size_32,
    color: COLORS.primaryBlackHex,
  },
  SubTitle: {
    fontFamily: FONTFAMILY.inter_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryGreyHex,
  },
  SubTextinputTitle: {
    fontFamily: FONTFAMILY.inter_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
  },
});
