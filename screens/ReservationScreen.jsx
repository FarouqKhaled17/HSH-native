import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { COLORS } from '../constants/theme.js';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '../constants/GlobalRoute.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export default function ReservationScreen() {
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [clinic, setClinic] = useState('');
  const [reservationType, setReservationType] = useState('');
  const [clinics, setClinics] = useState([]);

  const handleConfirm = (selectedDate) => {
    setDatePickerVisibility(false);
    setDate(selectedDate);
  };

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token for fetching clinics:', token); // Log the token
        const { data } = await axios.get(`${BASE_URL}/sysdata/clinics`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setClinics(data);
      } catch (error) {
        console.error('Failed to fetch clinics:', error);
      }
    };
    fetchClinics();
  }, []);

  const handleReservation = async () => {
    if (!clinic || !date || !reservationType) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill all fields',
      });
      return;
    }
  
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      console.log('Token for reservation:', token); 
      console.log('User ID:', userId); 
      if (!userId) {
        console.error('User ID not found');
        return; 
      }
  
      // Construct the request data
      const data = {
        clinic_id: clinic,
        date: date.toISOString().split('T')[0], // Format the date as YYYY-MM-DD
        examType: reservationType
      };
  
      // Send the reservation request with user ID included in the URL
      const response = await axios.post(`${BASE_URL}/Myreservations/${userId}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Reservation done successfully',
      });
    } catch (error) {
      console.error('Network error:', error.response ? error.response.data : error.message); // Log detailed error
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to make a reservation',
      });
    }
  };
  
  
  
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.Denim, marginBottom: 70 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.subtitle}> أهلا فاروق </Text>
        <Image source={require('../assets/imgs/undraw_Booking_re_gw4j__4_-removebg-preview.png')} style={{ width: 350, height: 250 }} />
      </View>

      <View style={styles.formContainer} keyboardShouldPersistTaps='handled'>
        <View style={styles.formGroup}>
          <Text style={styles.label}>العيادة</Text>
          <Picker
            selectedValue={clinic}
            style={styles.picker}
            onValueChange={(itemValue) => setClinic(itemValue)}
          >
            {clinics.map((clinic) => (
              <Picker.Item key={clinic.clinic_id} label={clinic.clinicName} value={clinic.clinic_id} />
            ))}
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>تاريخ الحجز</Text>
          <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.datePickerButton}>
            <Text>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>نوع الحجز</Text>
          <View style={styles.reservationTypeContainer}>
            <TouchableOpacity
              style={[styles.reservationTypeSquare, reservationType === 'followUp' && styles.selectedSquare]}
              onPress={() => setReservationType('followUp')}
            >
              <Text style={styles.reservationTypeText}>متابعة</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.reservationTypeSquare, reservationType === 'newCheckup' && styles.selectedSquare2]}
              onPress={() => setReservationType('newCheckup')}
            >
              <Text style={styles.reservationTypeText}>كشف جديد</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.reserve} onPress={handleReservation}>
          <Text style={styles.reserveText}>حجز</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 32,
    fontWeight: '700',
    marginLeft: 225,
    marginTop: 77,
    color: "white"
  },
  button: {
    width: '85%',
    backgroundColor: COLORS.Denim,
    paddingVertical: 14,
    borderRadius: 24,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 12,
  },
  formContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 32,
    paddingTop: 32,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  label: {
    color: 'gray',
    marginLeft: 16,
    marginBottom: 8,
    fontWeight: '700',
  },
  input: {
    padding: 16,
    backgroundColor: COLORS.lightGray,
    color: 'gray',
    fontWeight: '200',
    borderRadius: 16,
    marginBottom: 12,
  },
  datePickerButton: {
    padding: 16,
    backgroundColor: COLORS.lightGray,
    borderRadius: 16,
    alignItems: 'center',
  },
  reserve: {
    backgroundColor: COLORS.Denim,
    paddingVertical: 12,
    borderRadius: 16,
  },
  reserveText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  picker: {
    padding: 16,
    marginBottom: 5,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
  },
  reservationTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    marginTop: 8,
  },
  reservationTypeSquare: {
    width: '23%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 14,
  },
  selectedSquare: {
    backgroundColor: COLORS.lightRed,
  },
  selectedSquare2: {
    backgroundColor: COLORS.lightGreen,
  },
  reservationTypeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
