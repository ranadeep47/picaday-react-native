import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

const {width, height} = Dimensions.get('window');
const IMAGE_HEIGHT = height / 4;

const PhotoView = ({route: {params}}) => (
  <View style={styles.container}>
    <ImageZoom
      cropWidth={width}
      cropHeight={height}
      imageWidth={width}
      imageHeight={IMAGE_HEIGHT}>
      <Image
        style={styles.image}
        source={{
          uri: params.picture,
        }}
      />
    </ImageZoom>
  </View>
);

export default PhotoView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width,
    height: height / 4,
  },
});
