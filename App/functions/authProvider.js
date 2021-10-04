//contains the firebase authentication context
import React, { createContext, useState } from 'react';
import firebase, { auth } from 'firebase';
import { showMessage } from 'react-native-flash-message';

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {

//user state
const [user, setUser] = useState(null);

return(

    <AuthContext.Provider
        value={{ 
            user, 
            setUser,
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
                      duration: 2000
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
                                    email,
                                    password 
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
                        duration: 2000
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

