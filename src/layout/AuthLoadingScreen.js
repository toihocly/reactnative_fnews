import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import background from '../assets/images/background.jpg';
import Fonts from '../utils/fonts.js';
import {convertInttoTime, colorSecond, colorPrimary} from '../utils/base';

const {height: heightSreen, width: widthSreen} = Dimensions.get('window');

const AuthLoadingScreen = ({navigation}) => {
  const [timeScale, setTimeScale] = useState(new Animated.Value(0));
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const anim = new Animated.timing(timeScale, {
      toValue: 2,
      duration: 1000,
    });
    Animated.loop(anim).start();
  }, []);

  const scaleWidth = timeScale.interpolate({
    inputRange: [0, 2],
    outputRange: [50, 100],
  });
  const scaleHeight = timeScale.interpolate({
    inputRange: [0, 2],
    outputRange: [50, 100],
  });

  const onGo = () => {
    setTimeout(() => {
      navigation.navigate('App');
    }, 1000);
  };

  return (
    <View
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      // onResponderMove={onMove}
      onResponderGrant={onGo}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
        position: 'relative',
      }}>
      <Image
        style={{
          position: 'absolute',
          left: -50,
          top: -70,
          flex: 1,
          // height: '100%',
        }}
        source={background}
        resizeMode="cover"
      />
      <Text
        style={[
          styless.colorSec,
          {
            fontSize: 40,
            position: 'absolute',
            width: widthSreen,
            textAlign: 'center',
            bottom: 30,
            fontFamily: Fonts.GreatVibesRegular,
            color: '#B50C29',
          },
        ]}>
        Wish you a happy working day
      </Text>
      <Animated.Image
        source={require('../assets/images/ic_launcher_round.png')}
        style={{width: scaleWidth, height: scaleHeight}}
      />
    </View>
  );
};

const styless = StyleSheet.create({
  colorPri: {
    color: colorPrimary,
    fontFamily: Fonts.LoraRegular,
  },
  colorSec: {
    color: '#03A9F4',
    fontFamily: Fonts.LoraBold,
  },
});

export default AuthLoadingScreen;
