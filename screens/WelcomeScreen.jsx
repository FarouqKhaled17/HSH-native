import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../constants/theme.js';
import { useNavigation } from '@react-navigation/native';


export default function WelcomeScreen() {
    const naviagtion=useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View className="my-10   ">
        <Text style={styles.Text} >مرحبا بكم</Text>
        <Text style={styles.Text}>مستشفي جامعة حلوان</Text>
        </View>

      <View className="flex-row justify-center">
        <Image source={require('../assets/imgs/undraw_medicine_b1ol.png')} style={{width:390, height:350}}/>
      </View>
<View className="space-y-4">
      <TouchableOpacity className="py-3 bg-blue-800 mx-20 my-12 rounded-3xl"style={{ backgroundColor: COLORS.Denim}} onPress={()=>naviagtion.navigate('signup')}>
        <Text style={styles.caption} className="text-lg text-center">انشاء حساب</Text>
        </TouchableOpacity>
</View>

<View className="flex-col justify-center">
        <Text style={styles.txtBtn} className="font-semibold">لديك حساب بالفعل</Text>
    <TouchableOpacity onPress={()=>naviagtion.navigate('login')}>
        <Text style={styles.txtBtn} className="my-1 text-blue-500">تسجيل الدخول</Text>
        </TouchableOpacity>
</View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    Text: {
      fontFamily: FONTS.tajawalExtraBold,
        fontSize: 30,
        textAlign: 'center',
    },
    caption: {
        fontFamily: FONTS.tajawalExtraBold,
        fontSize: 20,
        textAlign: 'center',
        color: COLORS.white,
    },
    txtBtn: {
        fontFamily: FONTS.tajawalMedium,
        fontSize: 14,
        textAlign: 'center',
    },
  });