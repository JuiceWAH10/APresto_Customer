import React, {useEffect, useState} from 'react';
import { 
    ImageBackground,
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native';
import QRCode from "react-qr-code";
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import firebase from 'firebase';
import jsonpack from 'jsonpack';

import { AuthContext } from '../../../functions/authProvider';
import * as cartAction from '../../functions/cartFunction';
import * as rewardCart from '../../functions/rewardsCartFunction';

import {useDispatch} from 'react-redux';

function QR(props) {
    const navigation = useNavigation();
    const {totalAmount, totalPoints, cartItems, rewCartItems, store_ID} = props.route.params;
    const dispatch = useDispatch();
    const [loggedUser, setLoggedUser] = useState(null);
    const {user} = useContext(AuthContext);

    const getUser = async() => {
        await firebase.firestore()
        .collection('Customers')
        .doc(user.uid)
        .get()
        .then((documentSnapshot) => {
            if(documentSnapshot.exists){
                console.log('User Data', documentSnapshot.data());
                setLoggedUser(documentSnapshot.data());
            }
        })      
    }

    useEffect(() => {   
        getUser();
    }, [])
    
    function returnAndClear(){
        dispatch(cartAction.clearCart());
        dispatch(rewardCart.clearCart());
        navigation.goBack();
    }

    let orderDetails = {
        'QR_Type': "transaction",
        'store_ID': store_ID,
        'customer_ID':user.uid,
        'username':loggedUser.username,
        'totalAmount':totalAmount,
        'totalPoints': totalPoints,
        'purchasedProducts':cartItems,
        'redeemedRewards': rewCartItems
    };

    let packed = jsonpack.pack(orderDetails)
    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <ImageBackground style={styles.container} source={require('../../../assets/images/splashScreenDark.jpg')}>
                <View style={styles.qrContainer}>
                    <Text style={styles.qrLabel}>Come to your suki store and have them scan this QR code</Text>
                        <QRCode 
                            value = {packed}
                        />
                    <TouchableOpacity style={styles.button} onPress={returnAndClear} >
                        <Text style={styles.buttonLabel}>Return</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? 32 : 0
    },
    button: {
        alignItems: 'center',
        alignSelf: "center",
        backgroundColor: '#071964',
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: 10,
        width: '90%',
        height: hp('6%'),
    },
    buttonLabel: {
        color: "#fff",
        fontSize: 16
    },
    container:{
        alignContent: "center",
        backgroundColor: '#ee4b43',
        flex: 1
    },
    qrContainer:{
        alignSelf: "center",
        backgroundColor: '#fff',
        borderRadius: 30,
        height: 400,
        width: wp('90%'),
        alignItems: "center",
        paddingTop: hp('2%'),
        paddingBottom: hp('2%'),
        top: hp('20%')
    },
    qrLabel:{
        textAlign: "center",
        fontSize: 16,
        marginBottom: 20
    }
})
export default QR;