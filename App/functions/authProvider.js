//contains the firebase authentication context
import React, { createContext, useState } from 'react';
import firebase, { auth } from 'firebase';
import { showMessage } from 'react-native-flash-message';
import { Constants } from 'expo-barcode-scanner';
//import Dialog from "react-native-dialog";


export const AuthContext = createContext();
export const AuthProvider = ({children}) => {

//user state
const [user, setUser] = useState(null);
const [sukiList, setSukiList] = useState([]);

//const [visible, setVisible] = useState(false);

/*const handleLogout = () => {
    logout();
    setVisible(false);
};*/

return(

    <AuthContext.Provider
        value={{ 
            user, 
            setUser,
            sukiList,
            setSukiList,
            //login function to have access
            login: async(email, password) => {
                try{
                    await auth()
                            .signInWithEmailAndPassword(email, password)
                            .then(() => {
                                console.log("User logged in...");
                            })
                }catch (error){
                    showMessage({
                      message: "Account does not exist",
                      type: "warning",
                      position: "top",
                      statusBarHeight: 30,
                      floating: "true",
                      icon: { icon: "info", position: "left" },
                      autoHide: "true", 
                      duration: 2500
                    });
                    console.log("Login failed...", error);  
                }
            },
            //sign up function to create user/ CREATE ACCOUNT FUNCTION
            register: async (email, password, firstname, lastname, address, contact, username) => {
                try{
                    await auth()
                            .createUserWithEmailAndPassword(email, password)
                            .then(() => {
                                console.log("User account registered...");   
                                firebase.firestore().collection('Customers').doc(auth().currentUser.uid).set({
                                    firstname,
                                    lastname,
                                    address,
                                    contact,
                                    username,
                                    //email,
                                    //password,
                                    userImg: null
                                });
                                const account = firebase.auth().currentUser;
                                account.sendEmailVerification()
                                    .then(() => {
                                        showMessage({
                                            message: "Sign up successfully",
                                            description: "Please check your email for verification",
                                            type: "success",
                                            position: "top",
                                            statusBarHeight: 25,
                                            floating: "true",
                                            icon: { icon: "auto", position: "left" },
                                            autoHide: "true", 
                                            duration: 10000
                                        });
                                        /*<Dialog.Container contentStyle={{height: 110, paddingTop: 12, paddingRight: 19, alignItems: 'center', justifyContent:'center', borderRadius: 15}} visible={visible}>
                                            <Dialog.Title style={{fontSize: 16, color: '#071964'}}>Sign up successfully</Dialog.Title>
                                            <Dialog.Button style={{marginRight: 30, marginLeft: 20, fontSize: 16, fontWeight: "bold", color: '#071964'}} label="Ok" onPress={handleLogout} />
                                        </Dialog.Container>*/
                                    });
                            })
                }catch (error){
                    showMessage({
                        message: "Account already exist",
                        description: "Please enter a new email address",
                        type: "warning",
                        position: "bottom",
                        statusBarHeight: 20,
                        floating: "true",
                        icon: { icon: "auto", position: "left" },
                        autoHide: "true", 
                        duration: 2500
                    });
                    console.log("Signup failed...", error);
                }
            },
            //logout function
            logout: async () => {
                try{
                    await auth()
                            .signOut()
                            .then(() => {
                                console.log("User logged off...");
                            })
                }catch (error){
                    console.log(error);
                }
            }
        }}>
            {children}
        </AuthContext.Provider>
);
};

