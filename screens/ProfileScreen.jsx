import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme.js';

export default function ProfileScreen() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [profileImage, setProfileImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    // Logic to update user profile
    console.log('Updated profile:', { name, email, profileImage });
    // Add logic to update user data in the backend
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.profilePhotoContainer}>
            <Image source={profileImage ? { uri: profileImage } : require('../assets/imgs/profile-pic (11).png')} style={styles.profilePhoto} />
            <MaterialIcons name="camera-alt" size={24} color="#fff325" style={styles.cameraIcon} />
          </TouchableOpacity>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailText}>{email}</Text>
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
              <Text style={[styles.tableCell, styles.tableHeader]}>Status</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Status</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>2022-06-15</Text>
              <Text style={styles.tableCell}>Appointment</Text>
              <Text style={styles.tableCell}>Confirmed</Text>
              <Text style={styles.tableCell}>Confirmed</Text>
              <Text style={styles.tableCell}>Confirmed</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>2022-06-15</Text>
              <Text style={styles.tableCell}>Appointment</Text>
              <Text style={styles.tableCell}>Confirmed</Text>
              <Text style={styles.tableCell}>Confirmed</Text>
              <Text style={styles.tableCell}>Confirmed</Text>
            </View><View style={styles.tableRow}>
              <Text style={styles.tableCell}>2022-06-15</Text>
              <Text style={styles.tableCell}>Appointment</Text>
              <Text style={styles.tableCell}>Confirmed</Text>
              <Text style={styles.tableCell}>Confirmed</Text>
              <Text style={styles.tableCell}>Confirmed</Text>
            </View>
            
            {/* Add more rows for additional reservations */}
          </View>
        </View>
      </View>
      {/* Modal for editing profile */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <TextInput style={styles.modalInput} value={name} onChangeText={setName} placeholder="Name" />
          <TextInput style={styles.modalInput} value={name} onChangeText={setName} placeholder="Name" />
          <TextInput style={styles.modalInput} value={name} onChangeText={setName} placeholder="Name" />
          <TextInput style={styles.modalInput} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
          <TextInput style={styles.modalInput} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
          <TextInput style={styles.modalInput} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
          <TextInput style={styles.modalInput} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  detailItem: {
    textAlign: 'center',
  },
  detailLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    color: 'gray',
  },
  editButton: {
    backgroundColor: COLORS.Denim,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
    borderRadius: 6,
    width: '100%',
    marginTop:-100,
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
    backgroundColor: 'blue',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  }
});
