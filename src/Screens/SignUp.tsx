import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ButtonComponent from '../Components/ButtonComponent';
import {CheckBox, Google} from '../assets/CustomIcons';
import auth from '@react-native-firebase/auth';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
} from '../assets/theme/theme';
import TextInputComponent from '../Components/InputTextComponent';
import firestore from '@react-native-firebase/firestore';

const SignupScreen = ({navigation}: any) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');

  const [error, setError] = useState('');
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // const {appwrite} = useContext(AppwriteContext);

  const handleSignUp = () => {
    if (
      email.length < 1 ||
      password.length < 1 ||
      fullName.length < 1 ||
      mobile.length < 1
    ) {
      setError('All field are require');
      Alert.alert('All field are require');
    } else if (password.length < 8) {
      setError('Passwrord should 8 or more that 8 char');
      Alert.alert('Passwrord should 8 or more that 8 char');
    } else if (!isEmailValid) {
      setError('Not valid email format');
      Alert.alert('Not valid email format');
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firestore()
            .collection('employee')
            .add({
              email: email,
              password: password,
              fullName: fullName,
              mobile: mobile,
            })
            .then(() => {
              console.log('User added!');
            });

          Alert.alert('User account created ');
          navigation.pop();
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }

          console.error(error);
        });
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flexGrow: 1, backgroundColor: '#fff'}}>
      <View style={styles.loginScreenContainer}>
        <View style={styles.heading}>
          <Text style={styles.loginTitle}>Create your new {'\n'}account.</Text>
        </View>
        <View style={{gap: 15}}>
          <View style={styles.InputText}>
            <Text style={styles.loginSubTextinputTitle}>Email Address </Text>
            <TextInputComponent
              value={email}
              onChangeText={(text: any) => setemail(text)}
              placeholder="Enter Email"
              isPassword={false}
            />
          </View>
          <View style={styles.InputText}>
            <Text style={styles.loginSubTextinputTitle}>Password </Text>
            <TextInputComponent
              value={password}
              onChangeText={(text: any) => setPassword(text)}
              placeholder="Password"
              isPassword={true}
            />
          </View>
          <View style={styles.InputText}>
            <Text style={styles.loginSubTextinputTitle}>Full Name </Text>
            <TextInputComponent
              value={fullName}
              onChangeText={(text: any) => setFullName(text)}
              placeholder="Enter Full Name"
              isPassword={false}
            />
          </View>
          <View style={styles.InputText}>
            <Text style={styles.loginSubTextinputTitle}>Mobile number </Text>
            <TextInputComponent
              value={mobile}
              onChangeText={(text: any) => setMobile(text)}
              placeholder="Enter Mobile Number"
              isPassword={false}
            />
          </View>
        </View>

        <ButtonComponent title="Register" onPress={handleSignUp} />

        <TouchableOpacity onPress={() => navigation.pop()}>
          <Text style={styles.footer}>
            Have an account?
            <Text style={styles.footerRegister}> Sign In </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  loginScreenContainer: {
    flex: 1,
    paddingHorizontal: 25,
    gap: 30,
    paddingTop: 80,
    backgroundColor: COLORS.primaryWhiteHex,
  },
  heading: {
    gap: 5,
  },

  InputText: {
    gap: 5,
  },
  loginTitle: {
    fontFamily: FONTFAMILY.inter_semibold,
    fontSize: FONTSIZE.size_32,
    color: COLORS.primaryBlackHex,
  },
  loginSubTitle: {
    fontFamily: FONTFAMILY.inter_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryGreyHex,
  },
  loginSubTextinputTitle: {
    fontFamily: FONTFAMILY.inter_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
  },
  forgetPassword: {
    fontFamily: FONTFAMILY.inter_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryOrangeHex,
    textAlign: 'right',
  },
  signInwithGoogle: {
    gap: 30,
    alignItems: 'center',
  },
  footer: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.inter_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
  },
  footerRegister: {
    color: COLORS.primaryOrangeHex,
  },
  checkbox: {
    padding: 10,
    borderWidth: 1,
    width: 20,
    height: 20,
    alignItems: 'center',

    justifyContent: 'center',

    borderRadius: 5,
  },
  policy: {
    fontFamily: FONTFAMILY.inter_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
  },
  orangeText: {
    color: COLORS.primaryOrangeHex,
  },
});
