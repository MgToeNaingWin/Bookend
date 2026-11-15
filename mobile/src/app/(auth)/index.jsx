import { View, Text, Image, TextInput , TouchableOpacity, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../assets/styles/login.styles';
import COLORS from '../../../constants/colors';
import { Link } from 'expo-router';

export default function index() {
    const [email, setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [showPassword , setShowPassword] = useState(false);
    const [isLoading , setIsLoading] = useState(false);
    const handleLogin = () =>{

    }
  return (
    <View style={styles.container}>
        {/* header image */}
        <View style={styles.topIllustration}>
        <Image
        source={require("../../../assets/images/i.png")}
        style={styles.illustrationImage}
        resizeMode='contain'>
        </Image>
        </View>

        {/* Container*/}
        <View style={styles.card}>
        <View style={styles.formContainer}>

            {/* Email */}
            <View style={styles.inputGroup}> 
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}> 
                <Ionicons
                name="mail-outline"
                size = {20}
                color = {COLORS.primary}
                style={styles.inputIcon}>
                </Ionicons>
                <TextInput 
                style={styles.input}
                placeholder='Enter Your Email'
                placeholderTextColor={COLORS.placeholderText}
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none '>
                </TextInput>
                </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
                <Ionicons
                name="lock-closed-outline"
                size = {20}
                color = {COLORS.primary}
                style={styles.inputIcon}>
                </Ionicons>
                <TextInput 
                style={styles.input}
                placeholder='Enter Your Password'
                placeholderTextColor={COLORS.placeholderText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}>
                </TextInput>
                <TouchableOpacity
                onPress={() =>setShowPassword(!showPassword)}
                style={styles.eyeIcon}>
                <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size = {20}
                color={COLORS.primary}
                >    
                </Ionicons>
                </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}>
                    {
                        isLoading ? (<ActivityIndicator color='#FFF'></ActivityIndicator>

                        ) : (
                            <Text style={styles.buttonText}>Login</Text>
                        )
                    }
                    </TouchableOpacity>

                    {/*Sign Up */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have account?</Text>
                    <Link href="/singup" asChild>
                    <Text style={styles.link}>Sign Up</Text>
                    </Link>
                    </View>
        </View>
        </View>
    </View>
  )
}