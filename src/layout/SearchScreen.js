import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Fonts from '../utils/fonts';
import {convertInttoDate} from '../utils/base';
import {callAPIeverything} from '../services/apiServices';
const {height: heightSreen, width: widthSreen} = Dimensions.get('window');

const xxdata = {
  source: {
    id: null,
    name: 'Bbc.com',
  },
  author: 'https://www.facebook.com/bbcnews',
  title:
    'Yemen conflict: Southern separatists seize control of Aden - BBC News',
  description:
    "Yemen conflict: Southern separatists seize control of Aden BBC News Separatists seize Aden presidential palace, gov't military camps Aljazeera.com Southern Yemen separatists seize presidential palace, tearing coalition apart and sparking fears of new war The …",
  url: 'https://www.bbc.com/news/world-middle-east-49308199',
  urlToImage:
    'https://ichef.bbci.co.uk/news/1024/branded_news/15B5F/production/_108272988_81df3ebd-2be0-49df-90d5-cd7cf6518099.jpg',
  publishedAt: '2019-08-09T07:00:00Z',
  content:
    "Image copyrightReutersImage caption\r\n Aden has been the temporary base of President Abdrabbuh Mansour Hadi's government\r\nYemeni separatists have taken effective control of the port city of Aden after days of fighting with troops loyal to the internationally b… [+2227 chars]",
};

const FlatListItem = ({item, navigate}) => {
  const {title, description, urlToImage} = item;

  const onClick = item => {
    navigate('Detail', {
      item,
      title,
    });
  };
  return (
    <TouchableOpacity style={{marginTop: 8}} onPress={() => onClick(item)}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderBottomColor: '#eee',
          borderBottomWidth: 1,
        }}>
        <Image
          style={{width: 100, height: 100, borderRadius: 3}}
          source={{uri: urlToImage}}
        />
        <View style={{flex: 1, marginLeft: 5}}>
          <Text numberOfLines={1} style={styless.textTitle}>
            {title}
          </Text>
          <Text numberOfLines={3} style={[styless.fontView, {marginTop: 10}]}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SearchScreen = ({navigation}) => {
  const {
    source,
    author,
    title,
    description,
    urlToImage,
    publishedAt,
    content,
  } = xxdata;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [dataTopHeadlines, setDataTopHeadlines] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      const keyValue = navigation.getParam('title', 'bbc-news');
      const result = await callAPIeverything(keyValue);
      setData(result);
      const array1 = [];
      const maxItemInPage = 10;
      const min = page * maxItemInPage;
      const max = (page + 1) * maxItemInPage;
      for (let index = min; index < max; index++) {
        array1.push(result.articles[index]);
      }
      setDataTopHeadlines(array1);
      setIsLoading(false);
    };
    callApi();
  }, []);

  useEffect(() => {
    const array1 = [];
    const maxItemInPage = 10;
    const min = page * maxItemInPage;
    const max = (page + 1) * maxItemInPage;
    if (data.articles ? max <= data.articles.length : false) {
      for (let index = min; index < max; index++) {
        array1.push(data.articles[index]);
      }
      setDataTopHeadlines([...dataTopHeadlines, ...array1]);
    }
  }, [page]);

  const handleLoadMore = () => {
    setPage(value => value + 1);
  };
  return (
    <View style={{flex: 1, marginTop: 5, paddingLeft: 10, paddingRight: 10}}>
      <FlatList
        // onScrollEndDrag={e => console.log(e)}
        data={dataTopHeadlines}
        renderItem={item => (
          <FlatListItem {...item} navigate={navigation.navigate} />
        )}
        keyExtractor={(item, key) => key.toString()}
        onEndReachedThreshold={0.4}
        onEndReached={handleLoadMore}
      />
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
    fontFamily: Fonts.CabinRegularItalic,
    fontSize: 13,
  },
});

export default SearchScreen;
