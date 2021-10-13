import React, { useContext, useState, useEffect } from 'react';
import { Image, ImageBackground, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AuthContext } from '../../functions/authProvider';
import firebase from 'firebase';
import Dialog from "react-native-dialog";
import QRCode from "react-qr-code";
import jsonpack from "jsonpack";

const profile = ({navigation, route}) => {

    //user state
    const {user, logout} = useContext(AuthContext);
    const [userData, setUserData] = useState('');
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    //access current user
    const getUser = async() => {
        await firebase.firestore()
        .collection('Customers')
        .doc(route.params ? route.params.userId : user.uid)
        .get()
        .then((documentSnapshot) => {
            if(documentSnapshot.exists){
                setUserData(documentSnapshot.data());
            }
        })      
    }

    useEffect(() => {
        getUser();
        navigation.addListener("focus", () => setLoading(!loading));
    }, [navigation, loading]);

    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleLogout = () => {
        /*calls logout function from authProvider.js*/
        logout();
        setVisible(false);
    };

    const packed = jsonpack.pack({"QR_Type": "customer_ID", "customer_ID":user.uid, "username": userData.username})

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            {/* Header */}
            <ImageBackground style={styles.profileBgImage}
                    source={require('../../assets/images/orange_Header.jpg')}>
                <View style={styles.profileDarken}>
                    <Image style={styles.profileProfileImage}
                        source={require('../../assets/Store.jpg')}>
                    </Image>
                    {/*display user data*/}
                    <Text style={styles.profileUsername}>{userData ? userData.username || 'APresto' : 'APresto'}</Text>
                    <Text style={styles.profileFullname}>{userData ? userData.firstname || 'U  S' : 'U  S'}  {userData ? userData.lastname || 'E  R' : 'E  R'}</Text>
                    <View style={styles.profileButtonContainer}>
                        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('customerEditProfile')} >
                            <Icon name="user" size={20} color="#fff" />
                            <Text style={styles.profileButtonLabel}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.profileButton} onPress={showDialog} >
                            <Icon name="logout" size={20} color="#fff" />
                            <Text style={styles.profileButtonLabel}>Log Out</Text>
                        </TouchableOpacity>
                        <Dialog.Container contentStyle={{height: 110, paddingTop: 12, paddingRight: 20, alignItems: 'center', justifyContent:'center', borderRadius: 15}} visible={visible}>
                            <Dialog.Title style={{fontSize: 16, color: '#071964'}}>Do you really want to logout?</Dialog.Title>
                            <Dialog.Button style={{marginRight: 15, marginLeft: 35, fontSize: 16, fontWeight: "bold", color: '#071964'}} label="Cancel" onPress={handleCancel} />
                            <Dialog.Button style={{marginRight: 30, marginLeft: 20, fontSize: 16, fontWeight: "bold", color: '#071964'}} label="Logout" onPress={handleLogout} />
                        </Dialog.Container>
                    </View>
                </View>    
            </ImageBackground>
            {/* End of Header */}

            <ScrollView style={[styles.container, {flex:1}]}>
                {/* For last transaction */}
                <ImageBackground style={styles.transactBannerBgImage}
                    imageStyle={{ borderRadius: 30}}
                    source={require('../../assets/bannerImages/cart_Banner.jpg')}>
                    <View style={styles.transactBannerDarken}>
                        <Text style={styles.transactBannerLabel}>You visited the Shop!</Text>
                            <Text style={styles.transactBannerLabelSmall}>Earned 100 reward points.</Text>
                    </View>    
                </ImageBackground>
                {/* End of last transaction */}

                {/* Under development */}
                {/* Insert Code here for infos of the Customers */}
                {/* Additional ideas needed here */}
                <View style={styles.qrContainer}>
                    <Text style={styles.qrLabel}>Your personal APresto QR</Text>
                        <QRCode 
                            value = {packed}
                        />
                </View>

                
                {/* Banner */}
                <ImageBackground style={styles.bannerBgImage}
                    imageStyle={{ borderRadius: 30}}
                    source={require('../../assets/bannerImages/cart_Banner2.jpg')}>
                    <View style={styles.bannerDarken}>
                        <Text style={styles.bannerLabel}>The more you spend the more you enjoy!</Text>
                        <Text style={styles.bannerLabelSmall}>Everytime you spent on products you love gives you rewards point.</Text>
                    </View>    
                </ImageBackground>
                {/* End of Banner */}
                
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bannerBgImage: {
        alignSelf: "center",
        borderRadius: 30,
        marginTop: 5,
        marginBottom: 5,
        height: 150,
        width: wp('90%'),
    },
    bannerDarken:{
        // flex: 1,
        // backgroundColor: 'rgba(0,0,0,0.2)',
        // borderRadius: 30,
    },
    bannerLabel: {
        textAlign: "center",
        marginTop: 35,
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    bannerLabelSmall: {
        textAlign: "center",
        marginTop: 2,
        color: "#fff",
        fontSize: 12,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    button: {
        borderColor: "#fff",
        borderRadius: 30,
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginTop: 20,
        width: 100,
        height: 35,
    },
    buttonContainer: {
        alignSelf: "center",
        flexDirection: "row",
        justifyContent:"space-between",
        width: '60%',
    },
    buttonLabel: {
        color: "#fff",
        fontSize: 12
    },
    container: {
        flexDirection: "column",
        width: wp('100%'),
        // borderWidth: 1
    },   
    darken:{
        // flex: 1,
        // backgroundColor: 'rgba(0,0,0,0.15)',
    },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 32 : 0,
    },
    profileBgImage: {
        alignSelf: "center",
        marginBottom: 5,
        height: 280,
        width: wp('100%'),
    },
    profileButton: {
        borderColor: "#fff",
        borderRadius: 30,
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginTop: 20,
        width: 100,
        height: 35,
    },
    profileButtonContainer: {
        alignSelf: "center",
        flexDirection: "row",
        justifyContent:"space-between",
        width: '60%',
    },
    profileButtonLabel: {
        color: "#fff",
        fontSize: 12
    },
    profileDarken:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        // borderRadius: 30,
    },
    profileFullname: {
        textAlign: "center",
        marginTop: 2,
        color: "#fff",
        fontSize: 12,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    profileUsername: {
        textAlign: "center",
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    profileProfileImage:{
        alignSelf: "center",
        height: 100,
        width: 100,
        borderRadius: 100,
        marginTop: 30,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: "#ee4b43",
    },
    profileShopName: {
        textAlign: "center",
        marginTop: 35,
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    profileLabelSmall: {
        textAlign: "center",
        marginTop: 2,
        color: "#fff",
        fontSize: 12,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    qrContainer:{
        alignSelf: "center",
        backgroundColor: '#fff',
        borderRadius: 30,
        height: 350,
        width: wp('90%'),
        alignItems: "center",
        paddingTop: hp('2%'),
        paddingBottom: hp('2%'),
        marginTop: 5,
        marginBottom: 5
        
        
    },
    qrLabel:{
        textAlign: "center",
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10
    },
    titleTransact: {
        textAlign: "center",
        marginLeft: 3,
        marginTop: 5,
        fontSize: 16,
        fontWeight: "bold"
    },
    titleTransactContainer: {
        alignSelf: "center",  
        flexDirection: "row",
        marginTop: 10,
        width: wp('90%'),
    },
    transactBannerBgImage: {
        alignSelf: "center",
        borderRadius: 30,
        marginTop: 5,
        marginBottom: 15,
        height: 70,
        width: wp('90%'),
    },
    transactBannerDarken:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.15)',
        borderRadius: 30,
    },
    transactBannerLabel: {
        textAlign: "center",
        marginTop: 10,
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    transactBannerLabelSmall: {
        textAlign: "center",
        marginTop: 2,
        color: "#fff",
        fontSize: 12,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    titleAllItems: {
        alignSelf: "center",
        marginLeft: 3,
        marginTop: 8,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: "bold"
    },    
})

export default profile;