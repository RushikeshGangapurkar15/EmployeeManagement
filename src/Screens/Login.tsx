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

import auth from '@react-native-firebase/auth';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
} from '../assets/theme/theme';
import TextInputComponent from '../Components/InputTextComponent';
import ButtonComponent from '../Components/ButtonComponent';
import firestore from '@react-native-firebase/firestore';
const Login = ({navigation}: any) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usersData, setUsersData] = useState({});
  const [loading, setLoding] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    getAdminData();
  }, []);
  const getAdminData = async () => {
    const users = await firestore().collection('admin').get();
    const userDataArray = users.docs.map(doc => doc.data());
    setUsersData(userDataArray);
  };

  function isEmailInUsersData() {
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].email === email) {
        return true;
      }
      // console.log(usersData[i]);
    }
    return false;
  }

  const handleLogin = () => {
    if (email.length < 1 || password.length < 1) {
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
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          Alert.alert('Logged in successfully');
          console.log(isEmailInUsersData());
          if (isEmailInUsersData()) {
            navigation.push('Dashboard');
          } else {
            navigation.push('Home');
          }
        })
        .catch(error => {
          console.error(error);
          Alert.alert('invalid-credential');
        });
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flexGrow: 1, backgroundColor: '#fff'}}>
      <View style={styles.loginScreenContainer}>
        <View style={styles.heading}>
          <Text style={styles.loginTitle}>Login to your {'\n'}account.</Text>
          <Text style={styles.loginSubTitle}>
            Please sign in to your account{' '}
          </Text>
        </View>
        <View style={{gap: 15}}>
          <View style={styles.InputText}>
            <Text style={styles.loginSubTextinputTitle}>Email </Text>
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
        </View>

        <TouchableOpacity onPress={() => navigation.push('ForgetPassword')}>
          <Text style={styles.forgetPassword}>Forgot password? </Text>
        </TouchableOpacity>
        <ButtonComponent title="Sign In" onPress={handleLogin} />

        <TouchableOpacity onPress={() => navigation.push('SignUp')}>
          <Text style={styles.footer}>
            Don't have an account?
            <Text style={styles.footerRegister}> Register </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;

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
});
