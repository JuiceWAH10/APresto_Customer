import React from 'react';
import { 
    Image,
    StyleSheet,
    Text, 
    TouchableOpacity, 
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function indivLikedShops(props) {
    return (
        <View style={styles.container}>
                <TouchableOpacity onPress={() => console.log("pressed")} >
                    <Image style={styles.shopImage}
                        source={require('../../../assets/DummyShop.jpg')}>
                    </Image>
                </TouchableOpacity>
                <View style={styles.shopLine1}>
                    <Text style={styles.shopName}>Shop Name</Text>
                    <TouchableOpacity style={styles.button} onPress={()=>console.log("Pressed Unfollow")} >
                            <Icon2 name="heart-off" size={15} color="#fd4140" />
                            <Text style={styles.buttonLabel}>Unfollow</Text>
                        </TouchableOpacity>
                </View>
                <Text style={styles.shopAddress}>Address</Text>
                <Text style={styles.shopSpecialty}>Specialty</Text>
            </View>
    );
}

export default indivLikedShops;

const styles = StyleSheet.create({
    button: {
        borderColor: "#fd4140",
        borderRadius: 30,
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginRight: 20,
        marginTop: 3,
        width: 80,
        height: 25,
    },
    buttonContainer: {
        alignSelf: "center",
        flexDirection: "row",
        justifyContent:"space-between",
        width: '60%',
    },
    buttonLabel: {
        color: "#fd4140",
        fontSize: 12
    },
    container: {
        alignSelf: "center",
        flexDirection: "column",
        marginBottom: 2,
        marginTop: 2,
        height: 210,
        width: wp('90%'),
    },
    shopAddress: {
        marginBottom: 2,
        marginLeft: 20,
        fontSize: 14,
        opacity: .5
    },
    shopImage: {
        alignSelf: "center",
        borderRadius: 15,
        flexDirection: "column",
        height: 140,
        width: wp('90%'),
        borderWidth: 1
    },
    shopLine1: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: wp('90%'),
    },
    shopName: {
        marginBottom: 2,
        marginLeft: 20,
        marginTop: 5,
        fontSize: 16,
        fontWeight: "bold"
    },
    shopReview: {
        flexDirection: "row",
        marginBottom: 2,
        marginRight: 20,
        marginTop: 5,
    },
    shopReviewScore: {
        flexDirection: "row",
        fontSize: 12,
        marginBottom: 2,
        marginLeft: 5,
        marginTop: 1
    },
    shopSpecialty: {
        marginBottom: 2,
        marginLeft: 20,
        fontSize: 12,
    },
})