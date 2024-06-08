import React, { useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme.js';
import {  ArrowLeftIcon } from 'react-native-heroicons/solid';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Correct import

export default function SignUp() {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);
  const [nationalIdImage, setNationalIdImage] = useState(null);
  const [feesImage, setFeesImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // State to manage visibility of the date picker


  const pickImage = async (setImage) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permission to upload images.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleConfirm = (selectedDate) => {
    setDatePickerVisibility(false);
    setDate(selectedDate);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.Denim, marginBottom: -95 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeftIcon size={20} color='black' />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/imgs/signup.png')} style={{ width: 250, height: 250 }} />
        </View>
      </SafeAreaView>

      <ScrollView style={styles.formContainer} keyboardShouldPersistTaps='handled'>
        <View style={styles.formGroup}>
          <Text style={styles.label}>اسم المستخدم</Text>
          <TextInput style={styles.input} placeholder='ادخل اسم المستخدم' autoCapitalize='none' autoCorrect={false} />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>البريد الالكتروني</Text>
          <TextInput style={styles.input} placeholder='ادخل بريدك الالكتروني' autoCapitalize='none' autoCorrect={false} />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>كلمة المرور</Text>
          <TextInput style={styles.input} placeholder='ادخل الرقم السري' secureTextEntry />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>الكلية</Text>
          <TextInput style={styles.input} placeholder='ادخل كليتك' />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>النوع</Text>
          <TextInput style={styles.input} placeholder='ادخل نوعك' />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>المستوى</Text>
          <TextInput style={styles.input} placeholder='ادخل مستواك' />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>الجنسية</Text>
          <TextInput style={styles.input} placeholder='ادخل جنسيتك' />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>الرقم القومي</Text>
          <TextInput style={styles.input} placeholder='ادخل الرقم القومي' keyboardType='number-pad' />
        </View>
        <View style={styles.formGroup}>
        <Text style={styles.label}>تاريخ الميلاد</Text>
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
          <Text style={styles.label}>رقم الهاتف</Text>
          <TextInput style={styles.input} placeholder='ادخل رقم هاتفك' keyboardType='phone-pad' />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>المحافظة</Text>
          <TextInput style={styles.input} placeholder='ادخل محافظتك' />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>رفع صورتك الشخصية</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(setProfileImage)}>
            <Text style={styles.uploadButtonText}>اختر ملف</Text>
          </TouchableOpacity>
          {profileImage && <Image source={{ uri: profileImage }} style={styles.uploadedImage} />}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>رفع صورة البطاقة الشخصية</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(setNationalIdImage)}>
            <Text style={styles.uploadButtonText}>اختر ملف</Text>
          </TouchableOpacity>
          {nationalIdImage && <Image source={{ uri: nationalIdImage }} style={styles.uploadedImage} />}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>رفع صورة الرسوم الدراسية</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={() => pickImage(setFeesImage)}>
            <Text style={styles.uploadButtonText}>اختر ملف</Text>
          </TouchableOpacity>
          {feesImage && <Image source={{ uri: feesImage }} style={styles.uploadedImage} />}
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('login')}>
          <Text style={styles.signUpButtonText}>انشاء حساب</Text>
        </TouchableOpacity>
        <View style={styles.signUpPrompt}>
          <Text style={styles.signUpLabel}>لديك حساب بالفعل؟</Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={styles.signUpText}>تسجيل الدخول</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: 'white',
    padding: 8,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 32,
    paddingTop: 32,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  formGroup: {
    marginBottom: 16,
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
  uploadButton: {
    backgroundColor: 'lightgray',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: 'gray',
  },
  uploadedImage: {
    width: 100,
    height: 100,
    marginTop: 8,
    borderRadius: 8,
  },
  signUpButton: {
    backgroundColor: COLORS.Denim,
    paddingVertical: 12,
    borderRadius: 16,
    marginTop: 32,
  },
  signUpButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signUpPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signUpText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 8,
  },
  signUpLabel: {
    color: 'gray',
    textAlign: 'center',
    marginRight: 8,
    marginTop: 8,
  },
});
