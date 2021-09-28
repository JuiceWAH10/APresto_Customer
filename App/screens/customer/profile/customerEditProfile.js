import React, { useContext, useState, useEffect } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import firebase from 'firebase';
import validator from 'validator';
import { AuthContext } from '../../../functions/authProvider';
import { Input } from 'react-native-elements';

//validator under work
const validateFields = (email, password, firstname, lastname, address, contact, username) => {
    const isValid = {
        firstname: validator.matches(firstname, "^[a-z A-Z]+$"),
        lastname: validator.matches(lastname, "^[a-z A-Z]+$"),
        address: validator.matches(address, "^[0-9 a-z A-Z \.\,\-]+$"),
        contact: validator.isMobilePhone(contact),
        username: validator.matches(username, "^[0-9a-z\_]{1,15}$"),
        email: validator.isEmail(email),
        password: validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        }),
        
    };
    return isValid;
};

const customerEditProfile = ({navigation}) => {

    //user state
    const {user} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    //access current user
    const getUser = async() => {
        await firebase.firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((documentSnapshot) => {
            if(documentSnapshot.exists){
                console.log('User Data', documentSnapshot.data());
                setUserData(documentSnapshot.data());
            }
        })      
    }

    //update current user from the firestore
    const handleUpdate = async() => {
        firebase.firestore()
        .collection('users')
        .doc(user.uid)
        .update({
            firstname: userData.firstname,
            lastname: userData.lastname,
            address: userData.address,
            contact: userData.contact,
            username: userData.username,
            email: userData.email,
            password: userData.password
        })
        .then(() => {
            console.log('User Updated!');
            Alert.alert(
            'Profile Updated!',
            'Your profile has been updated successfully.'
            ); 
        })
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <SafeAreaView style={styles.droidSafeArea}>       
            <View style={[styles.topContainer, {flex:1}]}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="left" size={30} color="#fd4140" />
                </TouchableOpacity>    
            </View>
            <View style={[styles.formContainer, {flex:15}]}>          
                <Text style={styles.title}>Edit Profile</Text>
                <Text style={styles.subtitle}>Edit infos about yourself.</Text>
                <ScrollView style={styles.form}>
                    <Text style={styles.formTitles}>Basic Information</Text>
                    <View style={styles.textView}>
                        <Input
                            //First Name input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'list-alt' }}
                            placeholder="First Name"
                            onChangeText={(text) => {setUserData({...userData, firstname: text});}}
                            value={userData ? userData.firstname : ''}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            //Last Name input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'list-alt' }}
                            placeholder="Last Name"
                            onChangeText={(text) => {setUserData({...userData, lastname: text});}}
                            value={userData ? userData.lastname : ''}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            //Address input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'home' }}
                            placeholder="Address"
                            onChangeText={(text) => {setUserData({...userData, address: text});}}
                            value={userData ? userData.address : ''}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            //Contact input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'phone' }}
                            placeholder="Contact Number"
                            onChangeText={(text) => {setUserData({...userData, contact: text});}}
                            value={userData ? userData.contact : ''}
                            keyboardType="numeric"
                        />
                    </View>
                    <Text style={styles.formTitles}>Account Information</Text>
                    <View style={styles.textView}>
                        <Input
                            //Username input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            placeholder="Username"
                            onChangeText={(text) => {setUserData({...userData, username: text});}}
                            value={userData ? userData.username : ''}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            //Email input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                            placeholder="Email"
                            onChangeText={(text) => {setUserData({...userData, email: text});}}
                            value={userData ? userData.email : ''}
                            autoCompleteType="email"                           
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            //Password input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                            secureTextEntry={true}
                            placeholder="Password"              
                            onChangeText={(text) => {setUserData({...userData, password: text});}}
                            value={userData ? userData.password : ''}
                            autoCompleteType="password"
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            //Re-enter password input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                            secureTextEntry={true}
                            placeholder="Re-enter Password"
                            onChangeText={(text) => {setPasswordReentryField({text});}}
                        />
                    </View>
                    
                </ScrollView>
                {/* Navigation isn't final */}
                
                {/*CONTINUE BUTTON AND ERROR MESSAGES*/}
                {/*handleUpdate function*/}
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonLabel}>Update Information</Text>
                </TouchableOpacity>
            </View>
            {/*() => console.log("Profile Updated")*/}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fd4140',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: '80%',
        height: hp('6%'),
    },
    buttonLabel: {
        color: "#fff",
        fontSize: 16
    },
    droidSafeArea: {
        flex: 1,
        padding: 10,
        paddingTop: Platform.OS === 'android' ? 32 : 0
    },
    form: {
        width: wp('90%'),
    },
    formContainer: {
        alignItems: "center",
        borderRadius: 4,
        flex: 1,
        padding: 20,
    },
    formTitles: {
        marginBottom: 10,
        marginLeft: 10,
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold"
    },
    input: {
        height: 50,
        width: wp('80%'),
        paddingLeft: 10,
        fontSize: 16,
        justifyContent: "space-between"
        // borderWidth: 1,
        // backgroundColor: "#fff",
    },
    subtitle: {
        textAlign: "center",
        marginBottom: hp('5%'),
        fontSize: 12,
    },
    textView: {
        width: wp('90%'),
        alignItems: 'center'
    },
    title: {
        textAlign: "center",
        marginBottom: 10,
        fontSize: 30,
        fontWeight: "bold"
    },
    topContainer: {
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        height: hp('10%'),
        width: wp('95%'),
    },
})

export default customerEditProfile;