import React from 'react';
import { 
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text, 
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import IndivLikedShops from '../importScreens/indivLikedShops';

function likedShopList(props) {
    const navigation = useNavigation();
    
    return (
        <SafeAreaView style={styles.droidSafeArea}>
            {/* Top Navigation */}
            <View style={styles.topNav}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon2 name="left" size={30} color="#ee4b43" />
                </TouchableOpacity>
                <Text style={styles.title}>Liked Shops</Text>   
            </View>  
            {/* End of Top Navigation */}

                {/* Banner */}
                <ImageBackground style={styles.bannerBgImage}
                    imageStyle={{ borderRadius: 30}}
                    source={require('../../../assets/bannerImages/banner_LikedShops.jpg')}>
                    <View style={styles.darken}>
                        <Text style={styles.bannerLabel}>All shops that you followed is here !</Text>
                        <Text style={styles.bannerLabelSmall}>It's easier than looking for it again right?</Text>
                    </View>    
                </ImageBackground>
                {/* End of Banner */}

                {/* Reposition this inside the flatlist */}
                {/* Guide only for how it should looked like */}
                <IndivLikedShops/>

            <FlatList
                style={[styles.container, {flex:1}]}
                ListHeaderComponent={
                    <View style={styles.shopListTitleContainer}>
                        <Text style={styles.textInfo}>You can stop from seeing certain shops. Just click unfollow.</Text>
                    </View>
                }

                
            />
            
            {/* </View> */}
            {/* End of Shop List */}

        </SafeAreaView>
    );
}

export default likedShopList;

const styles = StyleSheet.create({
    bannerBgImage: {
        alignSelf: "center",
        borderRadius: 30,
        marginBottom: 10,
        marginTop: 5,
        height: 150,
        width: wp('90%'),
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
    darken:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 30,
    },
    container: {
        flexDirection: "column",
        width: wp('100%'),
        backgroundColor: "#fff"
    },   
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 32 : 0
    },
    searchBar: {
        alignSelf: "center",
        color: "#fd4140",
        width: wp('90%'),
        borderColor: "#fd4140",
        
    },
    searchBarContainer: {
        paddingTop: 6,

        backgroundColor: 'white',
        height: 70,
        borderBottomWidth: 4,
        borderColor: "#ee4b43",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    shopListContainer:{
        alignSelf: "center",  
        marginTop: 5,
        marginBottom: 5,
        width: wp('100%'),
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
        paddingTop: 10,
        paddingBottom: 10,

        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 3,
    },
    shopListTitle: {
        textAlign: "center",
        marginLeft: 10,
        marginTop: 10,
        fontSize: 20,
        fontWeight: "bold"
    },
    shopListTitleIcon: {
        marginTop: 10,
    },
    shopListTitleContainer: {
        alignSelf: "center",  
        flexDirection: "row",
        marginBottom: 10,
        marginLeft: 8,
        height: 40,
        width: wp('90%'),
    },
    textInfo: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 12,
        opacity: .5,
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
        textAlign: "center",
    },
    title: {
        color: "#ee4b43",
        textAlign: "center",
        marginBottom: 5,
        marginTop: 5,
        fontSize: 20,
        fontWeight: "bold"
    },
    topNav: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,

        backgroundColor: 'white',
        height: 50,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
})