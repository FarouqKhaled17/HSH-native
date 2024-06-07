import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, TextInput, SafeAreaView, Image } from 'react-native';
import { COLORS } from '../constants/theme.js';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';


export default function OTPScreen() {
  const [otp, setOtp] = useState('');
  const inputRefs = useRef([]);
  const navigation = useNavigation();

  const handleVerifyOTP = () => {
    // Validate OTP length
    if (otp.length !== 6) {
      Alert.alert('رمز OTP غير صالح', 'الرجاء إدخال رمز OTP مكون من 6 أرقام.');
      return;
    }
    Alert.alert('تم التحقق من رمز OTP', `لقد أدخلت: ${otp}`);
  };

  const handleInputChange = (index, value) => {
    if (value.length <= 1) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp.join('');
      });

      // Move to the next input
      if (value.length === 1 && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  return <>
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop:50 ,marginLeft:10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}
            className="bg-blue-600 p-2 rounded-tr-2xl rounded-bl-2xl"
            >
            <ArrowLeftIcon size={20} color='white' />
          </TouchableOpacity>
        </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginBottom:-120 }}>
        <Image source={require('../assets/imgs/undraw_Forgot_password_re_hxwm-removebg-preview.png')} style={{ width: 350, height: 250 }} />
      </View>
    </SafeAreaView>
    <View style={styles.container}>
      <Text style={styles.subtitle} className="text-slate-500">أدخل الرمز المرسل إلى بريدك الإلكتروني</Text>
      <View style={styles.otpContainer}>
        {Array.from({ length: 6 }).map((_, index) => (
          <View key={index} style={styles.otpInputContainer}>
            <TextInput
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[styles.otpInput, { borderColor: otp[index] ? '#1560BD' : '#ccc' }]}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(value) => handleInputChange(index, value)}
              value={otp[index]}
            />
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>التحقق من الرمز </Text>
      </TouchableOpacity>
    </View>
    </>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
  },
  otpInputContainer: {
    marginHorizontal: 5,
  },
  otpInput: {
    width: 52,
    height: 58,
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    width: '85%',
    backgroundColor: COLORS.Denim,
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
