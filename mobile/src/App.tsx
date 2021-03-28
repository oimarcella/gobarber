import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar, Text } from 'react-native';

const App: React.FC = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#312e38',
    }}
  >
    <StatusBar barStyle="dark-content" backgroundColor="orange" />
    <Text style={{ color: 'white' }}> Sup Lety s2 </Text>
  </View>
);

export default App;
