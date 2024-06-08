import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Image, ScrollView, SectionList } from 'react-native';
import { COLORS } from '../constants/theme.js';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Correct import
import { Picker } from '@react-native-picker/picker';

export default function ReservationScreen() {
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // State to manage visibility of the date picker
  const [clinic, setClinic] = useState(''); // State to store selected clinic
  const [reservationType, setReservationType] = useState(''); // State to store selected reservation type

  const handleConfirm = (selectedDate) => {
    setDatePickerVisibility(false);
    setDate(selectedDate);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.Denim ,marginBottom: 70 }}>
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
            <Picker.Item label=" جلدية" value="clinicA" />
            <Picker.Item label="عيادة ب" value="clinicB" />
            <Picker.Item label="عيادة ج" value="clinicC" />
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>تاريخ الحجز</Text>
          <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.datePickerButton}>
            <Text>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {/* Show DateTimePickerModal component */}
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
      style={[styles.reservationTypeSquare, reservationType === 'newCheckup' && styles.selectedSquar2]}
      onPress={() => setReservationType('newCheckup')}
    >
      <Text style={styles.reservationTypeText}>كشف جديد</Text>
    </TouchableOpacity>
  </View>
</View>
        <TouchableOpacity style={styles.reserve} >
          <Text style={styles.reserveText}>حجز </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 32,
    fontWeight: '700',
    marginLeft: 225,
    marginTop: 77,
    color:"white"
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
    marginBottom:5,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
  },
  reservationTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap:40,
    marginTop: 8,
  },
  reservationTypeSquare: {
    width: '23%',
    aspectRatio: 1, // Ensures the squares maintain a 1:1 aspect ratio
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 14,
  },
  selectedSquare: {
    backgroundColor: COLORS.lightRed,
  },
  selectedSquar2: {
    backgroundColor: COLORS.lightGreen,
  },
  reservationTypeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
