import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
} from '../assets/theme/theme';
import ButtonComponent from '../Components/ButtonComponent';
import firestore from '@react-native-firebase/firestore';
import {EditIcon, LogoutIcon} from '../assets/CustomIcons';
import auth from '@react-native-firebase/auth';
import TextInputComponent from '../Components/InputTextComponent';

// Define the type for employee data
interface Employee {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  // Include other fields if necessary
}

const Dashboard = ({navigation}) => {
  const [employeeData, setEmployeedata] = useState<Employee[]>([]); // Use the Employee type here
  const [modalVisible, setModalVisible] = useState(false);
  const [editmodalVisible, setEditModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('pass1234');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const employeeCollection = await firestore().collection('employee').get();
      const employeeList = employeeCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Employee[]; // Type assertion here

      setEmployeedata(employeeList);
      console.log('Fetched employee data:', employeeList);
    } catch (error) {
      console.error('Error fetching employee data:', error);
      Alert.alert('Error fetching employee data');
    }
  };

  const addEmployee = async () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firestore()
          .collection('employee')
          .add({
            email: email,
            password: password,
            fullName: name,
            mobile: mobile,
          })
          .then(() => {
            console.log('User added!');
            setModalVisible(false);
            fetchEmployees();
          });
      });
  };

  const editModal = (
    id: string,
    name: string,
    email: string,
    mobile: string,
  ) => {
    setEditModalVisible(true);
    setId(id);
    setName(name);
    setEmail(email);
    setMobile(mobile);
  };

  const editEmployee = async (id: string) => {
    try {
      await firestore().collection('employee').doc(id).update({
        fullName: name,
        email,
        mobile,
      });

      console.log('Employee details updated successfully');
      setEditModalVisible(false);
      fetchEmployees();
    } catch (error) {
      console.error('Error editing employee details:', error);
    }
  };

  const openModalForEdit = () => {
    setModalVisible(true);
    setEmail('');
    setName('');
    setId('');
    setMobile('');
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

  const DeleteEmployee = (id: string, name: string) => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete ${name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            firestore()
              .collection('employee')
              .doc(id)
              .delete()
              .then(() => {
                console.log('User deleted!');
                setEditModalVisible(false);
                fetchEmployees();
              });
          },
        },
      ],
      {cancelable: true},
    );
  };

  const MakeAdmin = (id: string) => {
    Alert.alert(
      'Confirm Making Admin',
      `Are you sure you want to make admin to ${name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sure',
          onPress: async () => {
            firestore()
              .collection('admin')
              .add({
                email: email,
                password: password,
                fullName: name,
                mobile: mobile,
              })
              .then(() => {
                firestore()
                  .collection('employee')
                  .doc(id)
                  .delete()
                  .then(() => {
                    setEditModalVisible(false);
                    fetchEmployees();
                  });
              });
          },
        },
      ],
      {cancelable: true},
    );
  };

  const renderEmployeeItem = ({item}: {item: Employee}) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemText}>
          Full Name: <Text style={styles.value}> {item.fullName}</Text>
        </Text>

        <Text style={styles.itemText}>
          Email: <Text style={styles.value}> {item.email}</Text>
        </Text>

        <Text style={styles.itemText}>
          Mobile: <Text style={styles.value}> {item.mobile}</Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          editModal(item.id, item.fullName, item.email, item.mobile);
        }}>
        <EditIcon />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Dashboard</Text>

      <TouchableOpacity
        style={{position: 'absolute', right: 10, top: 25}}
        onPress={logout}>
        <LogoutIcon />
      </TouchableOpacity>

      <FlatList
        data={employeeData} // Ensure this is an array of Employee
        renderItem={renderEmployeeItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No employees found.</Text>}
        contentContainerStyle={{gap: 10, paddingVertical: 30}}
        showsVerticalScrollIndicator={false}
      />
      <ButtonComponent title="Add Employee" onPress={openModalForEdit} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
              width: '80%',
            }}>
            <View style={styles.InputText}>
              <Text style={styles.loginSubTextinputTitle}>Full Name </Text>
              <TextInputComponent
                value={name}
                onChangeText={(text: any) => setName(text)}
                placeholder="Full Name"
                isPassword={false}
              />
            </View>
            <View style={styles.InputText}>
              <Text style={styles.loginSubTextinputTitle}>Mobile </Text>
              <TextInputComponent
                value={mobile}
                onChangeText={(text: any) => setMobile(text)}
                placeholder="Enter Mobile"
                isPassword={false}
              />
            </View>
            <View style={styles.InputText}>
              <Text style={styles.loginSubTextinputTitle}>Email </Text>
              <TextInputComponent
                value={email}
                onChangeText={(text: any) => setEmail(text)}
                placeholder="Enter Email"
                isPassword={false}
              />
            </View>
            <View style={{gap: 15}}>
              <ButtonComponent title="Save" onPress={addEmployee} />
              <ButtonComponent
                title="cancle"
                onPress={() => {
                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={editmodalVisible}
        onRequestClose={() => {
          setEditModalVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
              width: '80%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30,
              }}>
              <TouchableOpacity onPress={() => MakeAdmin(id)}>
                <Text style={{color: COLORS.primaryOrangeHex}}>Make Admin</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => DeleteEmployee(id, name)}>
                <Text style={{color: 'red'}}>Delete Employee</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.InputText}>
              <Text style={styles.loginSubTextinputTitle}>Full Name </Text>
              <TextInputComponent
                value={name}
                onChangeText={(text: any) => setName(text)}
                placeholder="Full Name"
                isPassword={false}
              />
            </View>
            <View style={styles.InputText}>
              <Text style={styles.loginSubTextinputTitle}>Mobile </Text>
              <TextInputComponent
                value={mobile}
                onChangeText={(text: any) => setMobile(text)}
                placeholder="Enter Mobile"
                isPassword={false}
              />
            </View>
            <View style={styles.InputText}>
              <Text style={styles.loginSubTextinputTitle}>Email </Text>
              <TextInputComponent
                value={email}
                onChangeText={(text: any) => setEmail(text)}
                placeholder="Enter Email"
                isPassword={false}
              />
            </View>
            <View style={{gap: 15}}>
              <ButtonComponent title="Save" onPress={() => editEmployee(id)} />
              <ButtonComponent
                title="cancle"
                onPress={() => {
                  setEditModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhiteHex,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  heading: {
    fontFamily: FONTFAMILY.inter_semibold,
    fontSize: FONTSIZE.size_32,
    textAlign: 'center',

    color: COLORS.primaryBlackHex,
    fontWeight: 'bold',
    marginRight: 20,
  },
  itemContainer: {
    borderWidth: 1,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: BORDERRADIUS.radius_8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    color: COLORS.primaryOrangeHex,
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_14,
  },
  value: {
    color: COLORS.primaryBlackHex,
    fontWeight: 'medium',
    fontSize: FONTSIZE.size_14,
  },
  InputText: {
    marginBottom: 15,
  },
  loginTitle: {
    fontFamily: FONTFAMILY.inter_semibold,
    fontSize: FONTSIZE.size_32,
    color: COLORS.primaryBlackHex,
  },
  loginSubTextinputTitle: {
    fontFamily: FONTFAMILY.inter_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
  },
});
