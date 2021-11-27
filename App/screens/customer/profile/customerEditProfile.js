import React, { useContext, useState, useEffect } from 'react';
//import useState from 'react-usestateref';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import firebase, { auth } from 'firebase';
import validator from 'validator';
import { AuthContext } from '../../../functions/authProvider';
import { Input } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { showMessage } from "react-native-flash-message";
import Dialog from "react-native-dialog";
import { string } from 'prop-types';
import { useNavigation } from '@react-navigation/core';

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

const customerEditProfile = (props) => {
    const navigation = useNavigation();
    const {firstname, lastname, address, contact, username, email, password, userImg} = props.route.params;
    //access current user

    /*useEffect(() => {
        setUserData({
            firstname:firstname,
            lastname:lastname,
            address:address,
            contact:contact,
            username:username,
            email:email, 
            password:password, 
            userImg:userImg
        });
        console.log(userDataRef.current)
    }, []);
    
    const image = {
        url: userImg,
        get gURL(){
            return this.url;
        },
        set sURL(u){
            this.url = u;
        }
    }*/

    //user state
    const {user} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [passwordReentryField, setPasswordReentryField] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("");

    //access current user
    const getUser = async() => {
        await firebase.firestore()
        .collection('Customers')
        .doc(user.uid)
        .get()
        .then((documentSnapshot) => {
            if(documentSnapshot.exists){
                console.log('User Data', documentSnapshot.data());
                setUserData(documentSnapshot.data());
            }
        })      
    }

    //For Dialog Box
    const [visible, setVisible] = useState(false);

    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    //handleUpdate function
    const handleUpdate = () => {
        editProfile();
        if(currentPassword!=""){
            onChangePassword();}
        setVisible(false);
    };

    const image = {
        url: userImg,
        get gURL(){
            return this.url;
        },
        set sURL(u){
            this.url = u;
        }
    }
    const [URI, setURI] = useState({link:image.gURL});
    const [changedIMG, setChangedIMG] = useState({bool: false});

    var imageUUID = uuid.v4(); // generates UUID (Universally Unique Identifier)
      
    // Code for Image Picker and Uploading to Firebase storage
    const pickImage = async () => {
        //For choosing photo in the library and crop the photo
        let result = await 
            ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
            });
        if (!result.cancelled) {
            setURI({link: result.uri});
            setChangedIMG({bool: true});
            //setChangedIMG({bool: true});
        }
        console.log(result); // To Display the information of image on the console
    };

    //Function to upload to Firebase storage
    const uploadImage = async(uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob(); 
        
        return new Promise(function(resolve) {
            var ref = firebase.storage().ref().child("images_ProfileImages/" + imageName);
            ref.put(blob).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((downloadURL)=>{
                    console.log('File available at', downloadURL);
                    image.sURL = downloadURL;
                    console.log('From upload image: ' + image.gURL)
                    resolve(downloadURL);
                });
            });
            if(userImg != ""){
                var imageRef = firebase.storage().refFromURL(userImg);
                    imageRef.delete().then(() => {
                        console.log("Deleted")  
                    }).catch(err => console.log(err))
            }
        })
    };

    const editProfile = async () => {
        //update current user from the firestore
        //await uploadImage(URI, imageUUID)
        //console.log('from add function: ', image.gURL);
        //crud.createShop(image.gURL);
        //navigation.goBack();

        if(changedIMG.bool){
            const result = await uploadImage(URI.link, imageUUID)
        }

        firebase.firestore()
        .collection('Customers')
        .doc(user.uid)
        .update({
            firstname: userData.firstname,
            lastname: userData.lastname,
            address: userData.address,
            contact: userData.contact,
            username: userData.username,
            email: userData.email,
            //password: userData.password,
            userImg: image.gURL
        })
        .then(() => {
            console.log("User account updated...");
            navigation.goBack()
        })

        showMessage({
            message: "Profile updated successfully",
            type: "success",
            position: "top",
            statusBarHeight: 25,
            floating: "true",
            icon: { icon: "auto", position: "left" },
            autoHide: "true", 
            duration: 2500
        });
    };

    const reauthenticate = (currentPassword) => {
        var profile = firebase.auth().currentUser;
        var credentials = firebase.auth.EmailAuthProvider.credential(profile.email, currentPassword);
        return profile.reauthenticateWithCredential(credentials);
    }

    const onChangePassword = () => {
        console.log(currentPassword)
        console.log(newPassword)
        reauthenticate(currentPassword).then(() => {
            console.log(currentPassword)
            console.log(newPassword)
            var profile = firebase.auth().currentUser;
            profile.updatePassword(newPassword).then(() => {
                console.log("Password updated!");
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
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
                    <Text style={styles.formTitles}>Upload Profile Picture</Text>
                    {/* Display the selected Image*/}
                    {URI && <Image source={{ uri: URI.link }} style={styles.imageUpload} />} 

                    {/* Button for Image Picker */}
                    <TouchableOpacity style={styles.imageButton} onPress={pickImage} >
                        <Text style={styles.imageButtonLabel}>Upload Image</Text>
                    </TouchableOpacity>
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
                            placeholder="New Password"          
                            onChangeText={(text) => {setNewPassword(text)}}
                            value={newPassword}
                            //autoCompleteType="password"
                        />
                    </View>
                    <View style={styles.textView}>
                        <Input
                            //Current password input
                            style={styles.input}
                            leftIcon={{ type: 'font-awesome', name: 'lock' }}
                            secureTextEntry={true}
                            placeholder="Current Password"
                            onChangeText={(text) => {setCurrentPassword(text)}}
                            value={currentPassword}
                        />
                    </View>
                    
                </ScrollView>
                {/* Navigation isn't final */}
                
                {/*CONTINUE BUTTON AND ERROR MESSAGES*/}
                <TouchableOpacity style={styles.button} onPress={showDialog}>
                    <Text style={styles.buttonLabel}>Update Profile</Text>
                </TouchableOpacity>
                <Dialog.Container contentStyle={{height: 110, paddingTop: 12, paddingRight: 19, alignItems: 'center', justifyContent:'center', borderRadius: 15}} visible={visible}>
                    <Dialog.Title style={{fontSize: 16, color: '#071964'}}>Do you really want to update profile?</Dialog.Title>
                    <Dialog.Button style={{marginRight: 30, marginLeft: 20, fontSize: 16, fontWeight: "bold", color: '#071964'}} label="Cancel" onPress={handleCancel}/>
                    <Dialog.Button style={{marginRight: 25, marginLeft: 25, fontSize: 16, fontWeight: "bold", color: '#071964'}} label="Ok" onPress={handleUpdate} />
                </Dialog.Container>
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
    imageButton:{
        backgroundColor: '#ee4b43',
        borderRadius: 30,
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        width: 150,
        height: hp('6%'),
        marginTop: 5,
        marginBottom: 10
    },
    imageButtonLabel: {
        color: "#fff",
        fontSize: 14
    },
    imageUpload: {
        alignSelf: "center",
        width: 180,
        height: 180,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: "#ee4b43"
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
    }
})

export default customerEditProfile;