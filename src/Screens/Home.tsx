import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
} from '../assets/theme/theme';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {LogoutIcon} from '../assets/CustomIcons';

const Home = ({navigation}) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const user = auth().currentUser;

    if (user) {
      const email = user.email;

      try {
        const userDoc = await firestore()
          .collection('employee')
          .where('email', '==', email)
          .get();

        if (!userDoc.empty) {
          const userData = userDoc.docs[0].data();
          const {fullName, mobile} = userData;

          console.log('User Email:', email);
          console.log('User Full Name:', fullName);
          console.log('User Mobile:', mobile);

          setUserData({email, fullName, mobile});
        } else {
          console.log('User data not found for email:', email);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    } else {
      console.log('No user is signed in');
    }
  };

  const logout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await auth().signOut();
              navigation.pop();
            } catch (error) {
              console.error('Error logging out:', error);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Employee Detail</Text>

      {userData ? (
        <View>
          <Text style={styles.detailText}>
            Email:<Text style={styles.value}> {userData.email}</Text>
          </Text>
          <Text style={styles.detailText}>
            Full name:<Text style={styles.value}> {userData.fullName}</Text>
          </Text>
          <Text style={styles.detailText}>
            Mobile:<Text style={styles.value}> {userData.mobile}</Text>
          </Text>
        </View>
      ) : (
        <Text style={{}}>Loading...</Text>
      )}

      <TouchableOpacity
        style={{position: 'absolute', right: 10, top: 25}}
        onPress={logout}>
        <LogoutIcon />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhiteHex,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  heading: {
    fontFamily: FONTFAMILY.inter_semibold,
    fontSize: FONTSIZE.size_32,
    textAlign: 'center',
    color: COLORS.primaryBlackHex,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailText: {
    color: COLORS.primaryOrangeHex,
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_32,
  },
  value: {
    color: COLORS.primaryBlackHex,
    fontWeight: 'medium',
    fontSize: FONTSIZE.size_32,
  },
});
