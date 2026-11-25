import { Text, View, Image, TextInput, TouchableOpacity, Alert , ActivityIndicator} from 'react-native'
import React, { Component, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../../constants/colors';
import { Link } from 'expo-router';
import { useAuthStore } from '../store/authStore';

import styles from '../../../assets/styles/signup.styles';


export default function signup() {
    const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [password , setPassword] = useState("");
        const [showPassword , setShowPassword] = useState(false);
        const {user, isLoading, register, token} = useAuthStore();
        const handleSingup = async() =>{
              const result =await register(username , email, password) ;
              if(!result.success) Alert.alert("Error", result.error);
    }  
    return (
    <View style={styles.container}>
      <View style={styles.card}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Bookend  📚</Text>
          <Text style={styles.subtitle}>Share your favourite books that you read</Text>
        </View>
        <View style={styles.formContainer}>
      {/* Username*/}
            <View style={styles.inputGroup}>
        <Text style={styles.label}>UserName</Text>
        <View style={styles.inputContainer}>
                          <Ionicons
                name="person-outline"
                size = {20}
                color = {COLORS.primary}
                style={styles.inputIcon}>
                </Ionicons>
                <TextInput 
                style={styles.input}
                placeholder='Mg Toe Naing Win'
                placeholderTextColor={COLORS.placeholderText}
                value={username}
                onChangeText={setUsername}
                keyboardType='email-address'
                autoCapitalize='none '>
                </TextInput>
        </View>
            </View>
              {/* Email*/}
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
                placeholder='mgtoe@gmail.com'
                placeholderTextColor={COLORS.placeholderText}
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none '>
                </TextInput>
                </View>
            </View>
            {/* Password*/}
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
                placeholder='*******'
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
                onPress={handleSingup}
                style={styles.button}>
                    {
                        isLoading ? (<ActivityIndicator color='#FFF'></ActivityIndicator>

                        ) : (
                            <Text style={styles.buttonText}>SingUp</Text>
                        )
                    }
              </TouchableOpacity>
                {/*Login  */}
                      <View style={styles.footer}>
                          <Text style={styles.footerText}>You have already account?</Text>
                      <Link href="/" asChild>
                      <Text style={styles.link}>Login</Text>
                      </Link>
                      </View>
        </View>
        </View>
        </View>
    )
  }
