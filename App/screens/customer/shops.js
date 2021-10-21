import React, {useEffect, useContext} from 'react';
import { 
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text, 
    View,
    FlatList
} from 'react-native';
import useState from 'react-usestateref';
import Icon from 'react-native-vector-icons/Entypo';
import { Searchbar } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AuthContext } from '../../functions/authProvider';
import firebase from 'firebase';

import { useDispatch, useSelector } from 'react-redux';

import IndivShop from '././importScreens/indivShop';

function shops(props) {
    const [storeList, setStoreList, storeListRef] = useState([]);
    const [shopData, setShopData,shopDataRef] = useState([]);
    const {user} = useContext(AuthContext)

    const onChangeSearch = (query) => {
        if(query != " "){
            setShopData(
                storeList.filter((shop) => {
                    return shop.store_Name.toLowerCase().includes(query.toLowerCase()) || shop.specialty.toLowerCase().includes(query.toLowerCase()) || shop.address.toLowerCase().includes(query.toLowerCase())
                })
            );       
        }
        if(query==""){
            setShopData(storeListRef.current);
        }
    }

    useEffect(() => {
        firebase.firestore()
            .collection('Stores')
            .onSnapshot(result => {
                const st = [];
                result.forEach(function (store){         
                    st.push(store.data());
                });
                console.log(st);
                setStoreList(st);
                setShopData(storeListRef.current)
            });
    }, []); 

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <View style={styles.searchBarContainer}>
                <Searchbar
                    style={styles.searchBar}
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                />
            </View>

                {/* Banner */}
                {/* <ImageBackground style={styles.bannerBgImage}
                    imageStyle={{ borderRadius: 30}}
                    source={require('../../assets/bannerDarkBlue.jpg')}>
                    <View style={styles.darken}>
                        <Text style={styles.bannerLabel}>All shops here are certified APrestoed!</Text>
                        <Text style={styles.bannerLabelSmall}>We guarantee you that shops here bring happiness.</Text>
                    </View>    
                </ImageBackground> */}
                {/* End of Banner */}

                {/* Shop List */}
                {/* <View style={styles.shopListContainer}> */}

            {/* (juswa) used this instead scrollview arte ng expo may warning */}

            <FlatList
                style={[styles.container, {flex:1}]}
                ListHeaderComponent={
                    <View style={styles.shopListTitleContainer}>
                        <Icon style={styles.shopListTitleIcon} name="shop" size={25} color="#fd4140" />
                        <Text style={styles.shopListTitle}>APresto Shops</Text>
                    </View>
                }
                data={shopData}
                keyExtractor={item => item.store_ID}
                renderItem={itemData => 
                    <IndivShop 
                        store_ID = {itemData.item.store_ID}
                        owner_ID = {itemData.item.owner_ID}
                        store_Name = {itemData.item.store_Name}
                        address = {itemData.item.address}
                        specialty = {itemData.item.specialty}
                        imgLink = {itemData.item.imgLink}
                    />}
            />
            
            {/* </View> */}
            {/* End of Shop List */}

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
export default shops;