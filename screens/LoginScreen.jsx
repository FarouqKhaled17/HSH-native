import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme.js';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import axios from 'axios';
import { BASE_URL } from '../constants/GlobalRoute.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleLogin = async () => {
    setLoading(true);
    setError("");
  
    if (!email || !password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }
    try {
      const data = { email, password };
      const response = await axios.post(`${BASE_URL}/auth/login`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN' 
        }
      });
      console.log(response.data.payLoad.userId);
      setLoading(false);
      Alert.alert("Logged in successfully");
      // Correctly handle the promises returned by AsyncStorage.setItem
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('userId', response.data.payLoad.userId.toString());
      await AsyncStorage.setItem('email', response.data.payLoad.email.toString());
      await AsyncStorage.setItem('name', response.data.payLoad.name.toString());
      navigation.navigate('MainTabs');
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
      setError("Invalid email or password");
      setLoading(false);
    }
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.Denim, marginBottom: -45 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} className="bg-gray-100 p-2 rounded-tr-2xl rounded-bl-2xl">
            <ArrowLeftIcon size={20} color='black' />
          </TouchableOpacity>
        </View>
        <View className='flex-row justify-center'>
          <Image source={require('../assets/imgs/undraw_Login_re_4vu2-removebg-preview.png')} style={{ width: 350, height: 250 }} />
        </View>
      </SafeAreaView>

      <View className="bg-white flex-1 px-8 pt-8" style={styles.formContainer}>
        {error ? <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text> : null}
        <View className="form space-y-2">
          <Text className="text-gray-600 ml-4 mb-2">البريد الالكتروني</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder='ادخل بريدك الالكتروني'
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View className="mt-4">
          <Text className="text-gray-600 ml-4 mb-2">كلمة المرور</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder='ادخل الرقم السري'
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('forgetPassword')}>
          <Text className="text-blue-500 text-right mr-4">نسيت كلمة المرور ؟</Text>
        </TouchableOpacity>
        <View className="mt-8">
          <TouchableOpacity className="py-3 rounded-3xl mx-10" style={{ backgroundColor: COLORS.Denim }} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white text-center font-bold">تسجيل الدخول</Text>}
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-4">
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text className="text-blue-500 text-center mt-2">انشاء حساب</Text>
          </TouchableOpacity>
          <Text className="text-gray-700 text-center mr-4 mt-2"> ليس لديك حساب؟ </Text>
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
