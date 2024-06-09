import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme.js';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import axios from 'axios';
import { BASE_URL } from '../constants/GlobalRoute.js';

export default function ForgetPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgetPassword = async () => {
    setLoading(true);
    setError("");

    if (!email) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }
    try {
      const data = { email };
      console.log('Sending request to:', `${BASE_URL}/auth/sendOtp`);
      console.log('Request data:', data);

      const response = await axios.post(`${BASE_URL}/auth/sendOtp`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response data:', response.data);
      setLoading(false);
      Alert.alert("برجاء تفحص البريد الالكتروني الخاص بك");
      navigation.navigate('otp');
    } catch (err) {
      console.error('Network error:', err);
      if (err.response) {
        console.error('Server responded with status code', err.response.status);
        console.error('Response data:', err.response.data);
      } else if (err.request) {
        console.error('No response received from server:', err.request);
      } else {
        console.error('Error setting up request:', err.message);
      }
      setError("Invalid email");
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.Denim, marginBottom: -40 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} className="bg-gray-100 p-2 rounded-tr-2xl rounded-bl-2xl">
            <ArrowLeftIcon size={20} color='black' />
          </TouchableOpacity>
        </View>
        <View className='flex-row justify-center'>
          <Image source={require('../assets/imgs/security.png')} style={{ width: 350, height: 250 }} />
        </View>
      </SafeAreaView>
      <View className="bg-white flex-1 px-8 pt-8" style={styles.formContainer}>
        <View className="form space-y-2">
          <Text className="text-gray-600 ml-4 mb-2">البريد الالكتروني</Text>
          <TextInput 
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" 
            placeholder='ادخل بريدك الالكتروني' 
            value={email}
            onChangeText={setEmail}
          />
          {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
        </View>
        <View className="mt-8 ">
          <TouchableOpacity 
            className="py-3 rounded-3xl mx-10" style={{ backgroundColor: COLORS.Denim }} onPress={handleForgetPassword} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white text-center font-bold">تأكيد</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 32,
    paddingTop: 32,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  }
});
