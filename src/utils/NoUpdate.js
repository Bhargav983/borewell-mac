import React from 'react';
import { View, Text } from 'react-native';

const NoUpdateReceived = ({ marginTop = 0, msg = "There is no update received today" }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop }}>
      <Text style={{ fontSize: 18, textAlign: 'center', color: 'black' }}>
        {msg}
      </Text>
    </View>
  );
};

export default NoUpdateReceived;
