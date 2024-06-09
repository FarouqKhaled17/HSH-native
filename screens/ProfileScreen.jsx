import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../constants/GlobalRoute.js';
import axios from 'axios';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [facultyName, setFacultyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [levelName, setLevelName] = useState('');
  const [govName, setGovName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userReservations, setUserReservations] = useState([]);

  useEffect(() => {
    getUserProfile();
    getUserReservations();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permission to upload images.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  const handleUpdateProfile = () => {
    console.log('Updated profile:', { name, email, profileImage });
  };

  // get user profile handler
  const getUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      console.log('Token for fetching user profile:', token);
      const { data } = await axios.get(`${BASE_URL}/myProfile/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setName(data.student[0].userName);
      setEmail(data.student[0].email);
      setFacultyName(data.student[0].faculty_name);
      setPhoneNumber(data.student[0].phoneNumber);
      setLevelName(data.student[0].level_name);
      setGovName(data.student[0].gov_name);
      setNationalId(data.student[0].national_id);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  // Get user reservations handler
  const getUserReservations = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      console.log('Token for fetching user reservations:', token);
      console.log('User ID:', userId);
      if (!userId) {
        console.error('User ID not found');
        return;
      }
      const { data } = await axios.get(`${BASE_URL}/myReservations/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('User reservations:', data);
      setUserReservations(data.results);
    } catch (error) {
      console.error('Failed to fetch user reservations:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.profilePhotoContainer}>
            <Image source={profileImage ? { uri: profileImage } : require('../assets/imgs/profile-pic (11).png')} style={styles.profilePhoto} />
            <MaterialIcons name="camera-alt" size={24} color="#000" style={styles.cameraIcon} />
          </TouchableOpacity>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{email}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Faculty:</Text>
              <Text style={styles.value}>{facultyName}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{phoneNumber}</Text>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Level:</Text>
              <Text style={styles.value}>{levelName}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Government:</Text>
              <Text style={styles.value}>{govName}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>National ID:</Text>
              <Text style={styles.value}>{nationalId}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.historyContainer}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.tableHeader]}>Date</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Service</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Status</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Exam Type</Text>
            </View>
            {userReservations.slice(0, 2).map((reservation, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCell}>{reservation.date}</Text>
                <Text style={styles.tableCell}>{reservation.clinic_name}</Text>
                <Text style={styles.tableCell}>{reservation.status}</Text>
                <Text style={styles.tableCell}>{reservation.examType}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      {/* Modal for editing profile */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <TextInput style={styles.modalInput} value={name} onChangeText={setName} placeholder="Name" />
          <TextInput style={styles.modalInput} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
          <TextInput style={styles.modalInput} value={facultyName} onChangeText={setFacultyName} placeholder="Faculty" />
          <TextInput style={styles.modalInput} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="
Phone Number" />
          <TextInput style={styles.modalInput} value={levelName} onChangeText={setLevelName} placeholder="Level" />
          <TextInput style={styles.modalInput} value={govName} onChangeText={setGovName} placeholder="Government" />
          <TextInput style={styles.modalInput} value={nationalId} onChangeText={setNationalId} placeholder="National ID" />
          {/* Add more fields for editing profile */}
          <TouchableOpacity style={styles.modalButton} onPress={handleUpdateProfile}>
            <Text style={styles.modalButtonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  faculty_name: {
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  email: {
    color: 'gray',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profilePhotoContainer: {
    position: 'relative',
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    color: 'gray',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 8,
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: COLORS.Denim,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  historyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
    borderRadius: 6,
    width: '100%',
    marginTop: -100,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 11,
  },
  tableHeader: {
    backgroundColor: COLORS.Denim,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: COLORS.Denim,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
