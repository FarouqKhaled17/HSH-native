import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme.js';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';

export default function LoginScreen() {
  const navigation = useNavigation();

  return <>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.Denim ,marginBottom:-45 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}
            className="bg-gray-100 p-2 rounded-tr-2xl rounded-bl-2xl"
            >
            <ArrowLeftIcon size={20} color='black' />
          </TouchableOpacity>
        </View>
      <View className='flex-row justify-center'>
        <Image source={require('../assets/imgs/undraw_Login_re_4vu2-removebg-preview.png')} style={{ width: 350, height: 250 }} />
      </View>
    </SafeAreaView>

    <View className="bg-white flex-1 px-8 pt-8" style={styles.formContainer}>
        <View className="form space-y-2">
            <Text className="text-gray-600 ml-4 mb-2">البريد الالكتروني</Text>
            <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" placeholder='ادخل بريدك الالكتروني'/>
        </View>

        <View className="mt-4">
            <Text className="text-gray-600 ml-4 mb-2">كلمة المرور</Text>
            <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" placeholder='ادخل الرقم السري' />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('forgetPassword')}>
            <Text className="text-blue-500 text-right mr-4">نسيت كلمة المرور ؟</Text>
        </TouchableOpacity>
        <View className="mt-8 ">
            <TouchableOpacity className=" py-3 rounded-3xl mx-10" style={{ backgroundColor: COLORS.Denim}}>
            <Text className="text-white text-center font-bold">تسجيل الدخول</Text>
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-4">
                <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                    <Text className="text-blue-500  text-center mt-2">انشاء حساب</Text>
                </TouchableOpacity>
                <Text className="text-gray-700 text-center mr-4 mt-2"> ليس لديك حساب؟ </Text>
                </View>
    </View>
        </View>
        </>
}

styles=StyleSheet.create({
    formContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 32,
        paddingTop: 32,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
      }
})