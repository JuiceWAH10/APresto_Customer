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
import Icon2 from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';


function likedShopList(props) {
    const navigation = useNavigation();
    
    return (
        <SafeAreaView style={styles.droidSafeArea}>
            {/* Top Navigation */}
            <View style={styles.topNav}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon2 name="left" size={30} color="#ee4b43" />
                </TouchableOpacity>
                <Text style={styles.title}>APresto FAQs</Text>   
            </View>  
            {/* End of Top Navigation */}

            <ScrollView>
                {/* Banner */}
                <ImageBackground style={styles.bannerBgImage}
                    imageStyle={{ borderRadius: 30}}
                    source={require('../../../assets/bannerImages/banner_LikedShops.jpg')}>
                    <View style={styles.darken}>
                        <Text style={styles.bannerLabel}>APresto? It's new to my ears</Text>
                        <Text style={styles.bannerLabelSmall}>What is APresto?</Text>
                    </View>    
                </ImageBackground>
                {/* End of Banner */}

                <Text style={styles.textTitle}>What is APresto?</Text>
                <Text style={styles.textContent}>   Having the stores online, finding where to buy the products 
                they need will be easier for you instead of looking out all around the town. Spending
                 a huge amount on your favorite store will not be in vain with the use of the APresto, for
                  every purchase you make with the application can accumulate points for redeeming
                   rewards posted by the shops. Shops provide variety of rewards that will met your satisfaction.</Text>

                {/* Banner */}
                <ImageBackground style={styles.bannerBgImage}
                    imageStyle={{ borderRadius: 30}}
                    source={require('../../../assets/bannerImages/banner_Reward.jpg')}>
                    <View style={styles.darken}>
                        <Text style={styles.bannerLabel}>Getting Started</Text>
                        <Text style={styles.bannerLabelSmall}>Is it really easy?</Text>
                    </View>    
                </ImageBackground>
                {/* End of Banner */}

                <Text style={styles.textTitle}>Getting Started</Text>   
                <Text style={styles.textContent}>   The customer’s APresto application allows every customer to 
                register an account where allows them to gain perks of being a suki of the store they repeatedly shopping
                with. You can explore several shops and add available items you selected on your cart with just the use of
                your hand! Presenting the QR code generated to the shop during your purchase or transaction allows you to 
                either gain points or gather rewards! And lastly APresto gives you the ebility to personalize your information.
                All of that functionality on this one app. Isn't it AMAZING?! </Text>

                {/* Banner */}
                <ImageBackground style={styles.bannerBgImage}
                    imageStyle={{ borderRadius: 30}}
                    source={require('../../../assets/bannerImages/banner_Product.jpg')}>
                    <View style={styles.darken}>
                        <Text style={styles.bannerLabel}>Rewards and Reward Points?</Text>
                        <Text style={styles.bannerLabelSmall}>How can I acquire it?</Text>
                    </View>    
                </ImageBackground>
                {/* End of Banner */}

                <Text style={styles.textTitle}>How can I gain reward points?</Text>   
                <Text style={styles.textContent}>   Every amount of purchased varies on the shop that you will having a 
                transaction. The corresponding reward point of the products you purchased will be saved in a QR Code 
                where the shop will scan it. Once scanned the points you gain will be added to your account.</Text>

                <Text style={styles.textTitle}>How can I exchange my points as a reward?</Text>
                <Text style={styles.textContent}>   You cann select from variety of rewards shops offers. The 
                points you accumulated can be exchanged to rewards that the shops you selected and transaction
                will be done also with the used of QR code. Sufficient points are needed to redeem the reward and 
                the used point/s will be deducted to your account. You can gain points again by purchasing products 
                from the shops.</Text>

            </ScrollView>

        </SafeAreaView>
    );
}

export default likedShopList;

const styles = StyleSheet.create({
    bannerBgImage: {
        alignSelf: "center",
        borderRadius: 30,
        marginBottom: 10,
        marginTop: 10,
        height: 150,
        width: wp('90%'),
    },
    bannerLabel: {
        textAlign: "center",
        marginTop: 50,
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
        backgroundColor: 'rgba(0,0,0,0.12)',
        borderRadius: 30,
    },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 32 : 0,
        paddingBottom: 10
    },
    textTitle: {
        alignSelf: "center",
        marginTop: 5,
        marginBottom: 5,
        marginLeft: wp('10%'),
        width: wp('90%'),
        fontSize: 18,
        fontWeight: "bold"
    },
    textContent: {
        alignSelf: "center",
        marginTop: 2,
        marginBottom: 5,
        marginLeft: wp('10%'),
        marginRight: wp('10%'),
        width: wp('90%'),
        fontSize: 14,
        textAlign: "justify"
        
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