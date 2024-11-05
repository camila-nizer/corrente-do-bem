import React from 'react';
import { View, Text } from 'react-native';
import OngFilterByRamo from '../../components/OngSearchByRamo';
import OngSearchInput from '../../components/OngSearchInputName';
import GradientBackground from '../../components/GradientBackground';

const SearchOngsScreen = () => {
  return (
    <GradientBackground>
      <View>
        <OngFilterByRamo/>
        <OngSearchInput/>
      </View>
    </GradientBackground>
  );
};

export default SearchOngsScreen;