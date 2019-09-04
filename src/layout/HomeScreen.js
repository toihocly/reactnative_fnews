import React, {useState, useEffect, Fragment} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  FlatList,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Fonts from '../utils/fonts.js';
import {callAPIeverything, callAPItop} from '../services/apiServices';
import CsTextInput from '../components/CsTextInput';
import CsButtonType from '../components/CsButtonType';

const {height: heightSreen, width: widthSreen} = Dimensions.get('window');

const FlatListItem = ({item, navigate}) => {
  const {title, urlToImage} = item;

  const onDetails = (item, title) => {
    navigate('Detail', {
      item,
      title,
    });
  };
  return (
    <TouchableOpacity onPress={() => onDetails(item, title)}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          width: 150,
          height: 180,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'grey',
          margin: 4,
          position: 'relative',
        }}>
        <ImageBackground
          imageStyle={{borderRadius: 10}}
          source={{uri: urlToImage}}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,.5)',
              borderRadius: 10,
            }}></View>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.4)',
              flex: 1,
              justifyContent: 'flex-end',
              borderRadius: 10,
            }}>
            <Text
              numberOfLines={2}
              style={{
                padding: 5,
                color: '#fff',
                fontFamily: Fonts.CabinBold,
                fontSize: 18,
              }}>
              {title}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState();
  const [dataTopHeadlines, setDataTopHeadlines] = useState([]);
  const [dataTopHeadlines2, setDataTopHeadlines2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const callApi = async () => {
      const result = await callAPIeverything('bbc-news');
      setData(result);
      const array1 = [];
      const array2 = [];
      for (let index = 0; index < 20; index++) {
        array1.push(result.articles[index]);
        array2.push(result.articles[index]);
      }
      setDataTopHeadlines(array1);
      setDataTopHeadlines2(array2);
      setIsLoading(false);
    };
    callApi();
  }, []);

  const onQuickSearch = name => {
    navigation.navigate('Search', {
      title: name,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        //  backgroundColor: '#bff098',
        paddingLeft: 15,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: 8,
        }}>
        <Image
          source={require('../assets/images/ic_launcher_round.png')}
          style={{width: 32, height: 32}}
        />
        <CsTextInput
          onQuickSearch={onQuickSearch}
          style={{marginLeft: 10}}
          inputStyle={{width: '90%'}}
        />
      </View>
      <View style={{marginTop: 10, flexDirection: 'row'}}>
        <CsButtonType onPress={() => onQuickSearch('bbc-sport')}>
          Sport
        </CsButtonType>
        <CsButtonType onPress={() => onQuickSearch('bbc-reel')} color="#A15E1D">
          Reel
        </CsButtonType>
        <CsButtonType
          onPress={() => onQuickSearch('bbc-worklife')}
          color="#9A83CE">
          Worklife
        </CsButtonType>
      </View>
      <View style={{flex: 1, marginTop: 10}}>
        {!isLoading ? (
          <ScrollView>
            <View>
              <Text style={styless.textTitle}>Popular</Text>
              <FlatList
                horizontal={true}
                data={dataTopHeadlines}
                renderItem={item => (
                  <FlatListItem {...item} navigate={navigation.navigate} />
                )}
                keyExtractor={(item, key) => key.toString()}
              />
            </View>
            <View style={{marginTop: 10}}>
              <Text style={styless.textTitle}>Sport</Text>
              <FlatList
                horizontal={true}
                data={dataTopHeadlines2.sort((a, b) => -1)}
                renderItem={item => (
                  <FlatListItem {...item} navigate={navigation.navigate} />
                )}
                keyExtractor={(item, key) => key.toString()}
              />
            </View>
            <View style={{marginTop: 10}}>
              <Text style={styless.textTitle}>Worklife</Text>
              <FlatList
                horizontal={true}
                data={dataTopHeadlines}
                renderItem={item => (
                  <FlatListItem {...item} navigate={navigation.navigate} />
                )}
                keyExtractor={(item, key) => key.toString()}
              />
            </View>
          </ScrollView>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </View>
  );
};

const styless = StyleSheet.create({
  colorPri: {
    color: '#fff',
    fontFamily: Fonts.LoraBold,
  },
  colorSec: {
    color: '#fff',
  },
  textTitle: {
    fontFamily: Fonts.CabinBold,
    fontSize: 18,
  },
});

export default HomeScreen;
