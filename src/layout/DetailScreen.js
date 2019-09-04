import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Fonts from '../utils/fonts';
import {convertInttoDate} from '../utils/base';

const {height: heightSreen, width: widthSreen} = Dimensions.get('window');

const DetailScreen = ({navigation}) => {
  const {
    source,
    author,
    title,
    description,
    urlToImage,
    publishedAt,
    content,
  } = navigation.getParam('item');
  return (
    <View style={{flex: 1}}>
      <ScrollView minimumZoomScale={0.5} maximumZoomScale={3}>
        <View style={{flex: 1, padding: 10, height: heightSreen}}>
          <View style={{alignItems: 'center'}}>
            <Text style={styless.textTitle}>{title}</Text>
            <View style={{width: 200, borderTopWidth: 1}}></View>
            <View
              style={{borderBottomWidth: 3, width: 140, marginTop: 3}}></View>
          </View>
          <Image
            style={{
              resizeMode: 'cover',
              height: null,
              width: null,
              flex: 1,
              marginTop: 5,
              marginBottom: 5,
              borderRadius: 3,
            }}
            source={{uri: urlToImage}}
          />
          <Text
            style={[{color: 'blue', textAlign: 'center'}, styless.fontView]}
            onPress={() => {}}>
            Link source
          </Text>
          <Text style={styless.fontView}>{description}</Text>
          {content && (
            <Text style={[styless.fontView, {marginTop: 10}]}>{content}</Text>
          )}
          <View style={{alignItems: 'flex-end', marginTop: 10}}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={[{color: 'blue'}, styless.fontView]}
                onPress={() => Linking.openURL(author)}>
                {author}
              </Text>
              <Text style={styless.fontView}>
                {convertInttoDate(publishedAt)}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.GreatVibesRegular,
                  fontSize: 18,
                }}>
                {source.name}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styless = StyleSheet.create({
  textTitle: {
    fontFamily: Fonts.CabinBold,
    textAlign: 'center',
    fontSize: 20,
  },
  fontView: {
    fontFamily: Fonts.CabinRegular,
    fontSize: 13,
  },
});

export default DetailScreen;
