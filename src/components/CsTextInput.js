import React, {useState} from 'react';
import {View, Text, TextInput, Image} from 'react-native';

const CsTextInput = props => {
  const [colorBorder, setColorBorder] = useState('transparent');
  const [textinput, setTextInput] = useState();

  const onSearch = event => {
    event.preventDefault();
    setTextInput('');
    props.onQuickSearch(textinput);
  };

  return (
    <View style={[{position: 'relative', flex: 1}, props.style]}>
      <Image
        source={require('../assets/images/find.png')}
        style={{
          tintColor: '#8e8e8e',
          height: 16,
          width: 16,
          position: 'absolute',
          left: 10,
          top: 10,
          zIndex: 1,
        }}
      />
      <TextInput
        value={textinput}
        onChangeText={text => setTextInput(text)}
        onSubmitEditing={onSearch}
        style={[
          {
            paddingTop: 3,
            paddingBottom: 3,
            paddingLeft: 35,
            paddingRight: 10,
            borderBottomColor: '#efefef',
            backgroundColor: '#efefef',
            borderRadius: 8,
          },
          props.inputStyle,
        ]}
        onFocus={() => setColorBorder('#7FC1FF')}
        onBlur={() => setColorBorder('transparent')}
      />
    </View>
  );
};

export default CsTextInput;
