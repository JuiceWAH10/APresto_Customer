import React, {useEffect, useState} from 'react';
import { 
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text, 
    View,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Searchbar } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';

import IndivReward from '././importScreens/indivReward';

function rewards(props) {

    const navigation = useNavigation();
    const {store_ID, owner_ID, store_Name, address, specialty, imgLink} = props.route.params;

    const [searchQuery, setSearchQuery] = useState("");
    const [storeList, setStoreList] = useState([]);
    const [shopData, setShopData] = useState(storeList);

    const dispatch = useDispatch();
    //(juswa) fetch data from redux store in App.js using useSelector. the data is from the state managed by reducers

    const onChangeSearch = (query) => {
        setSearchQuery(query);
        
        if(query != " "){
            setShopData(
                storeList.filter((shop) => {
                shop.store_Name.toLowerCase().includes(query.toLowerCase()) ||
                shop.speciality.toLowerCase().includes(query.toLowerCase());
            })
            );       
        }else{
            setShopData(storeList);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await firebase.firestore().collection('Stores').get();
            setStoreList(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
        };

        fetchData();
    },[]); 

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <View style={styles.searchBarContainer}>
                <Searchbar
                    style={styles.searchBar}
                    placeholder="Search"
                    onChangeText={(e) => onChangeSearch(e)}
                    //value={searchQuery}
                />
            </View>

            <FlatList 
                style={[styles.container, {flex:1}]}
                ListHeaderComponent={
                    <View style={styles.shopListTitleContainer}>
                        <Icon style={styles.shopListTitleIcon} name="star-four-points" size={25} color="#fd4140" />
                        <Text style={styles.shopListTitle}>Shops you have Points</Text>
                    </View>
                }
                data={storeList}
                keyExtractor={item => item.store_ID}
                renderItem={itemData => 
                    <IndivReward
                        store_ID = {itemData.item.store_ID}
                        owner_ID = {itemData.item.owner_ID}
                        store_Name = {itemData.item.store_Name}
                        address = {itemData.item.address}
                        specialty = {itemData.item.specialty}
                        imgLink = {itemData.item.imgLink}
                    />}
            />
                {/* Banner */}
                {/* <ImageBackground style={styles.bannerBgImage}
                    imageStyle={{ borderRadius: 30}}
                    source={require('../../assets/bannerViolet.jpg')}>
                    <View style={styles.darken}>
                        <Text style={styles.bannerLabel}>Visit Shops now to claim awesome rewards.</Text>
                        <Text style={styles.bannerLabelSmall}>Spending for the products  you love give you rewards!</Text>
                    </View>    
                </ImageBackground> */}
                {/* End of Banner */}

                {/* Shop List */}
                {/* <View style={styles.shopListContainer}> */}
                    
                {/* </View> */}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bannerBgImage: {
        alignSelf: "center",
        borderRadius: 30,
        marginBottom: 5,
        marginTop: 10,
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
        // flex: 1,
        // backgroundColor: 'rgba(0,0,0,0.15)',
        // borderRadius: 30,
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
})
export default rewards;