import React, { useState, useEffect } from 'react';
import { View, Animated } from 'react-native';

import { styles, progressStyle, deviceDector } from './styles';

const startAnimation = progress => {
  let running = false;
  const onFinishedAnimation = o => {
    if (running && o.finished) {
      progress.setValue(0);
      animate();
    }
  }
  const animate = () => {
    var wsize = deviceDector.calculateMarkerSize();
    Animated.timing(progress,
      {
        toValue: wsize,
        duration: 4000,
        useNativeDriver: false
      }).start(onFinishedAnimation);
  };
  running = true;
  animate();
  return () => running = false;
};

export default ({ markerContainer }) => {
  const [data, setData] = useState({ progress: new Animated.Value(10) });
  useEffect(() => startAnimation(data.progress), []);
  return (
    <View style={markerContainer}>
      <View style={styles.marker}>
        <Animated.View style={{ ...progressStyle, height: data.progress }}>

        </Animated.View>
      </View>

    </View>

  );
}
