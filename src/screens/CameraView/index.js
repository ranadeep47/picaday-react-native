import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, sizes} from '../../utils/constants';
import RoundedButton from '../../components/RoundedButton';
import RemixIcon from '../../components/RemixIcon';
import {RNCamera} from 'react-native-camera';
import {useMetadata} from '../../hooks';
import {useSelector, useDispatch} from 'react-redux';
import {addOrUpdatePicture} from '../../redux/actions/home';
import {isSameDay} from '../../utils';
import RNFS from 'react-native-fs';

function CameraView({navigation, route}) {
  let camera = React.useRef(null);
  const {location, pictures} = useSelector(state => state.home);
  const dispatch = useDispatch();
  let metadata = useMetadata(location);
  if (!metadata) {
    metadata = {location: 'NA', temperature: 'NA'};
  }
  const takePicture = async () => {
    if (camera) {
      const path = `${RNFS.DocumentDirectoryPath}/${Date.now()}.jpg`;
      const options = {quality: 0.5, base64: true, width: 2048, path};
      const data = await camera.takePictureAsync(options);
      let pictureItem = pictures.data.rows.find(row =>
        isSameDay(row.date, new Date()),
      );
      if (pictureItem) {
        //Remove the old picture and replace it with new
        try {
          if (await RNFS.exists(pictureItem.picture)) {
            await RNFS.unlink(pictureItem.picture);
          }
        } catch (error) {
          console.error(error);
        }
        //clone the object returned since you shouldnt mutate objects in state;
        pictureItem = {...pictureItem, ...metadata, picture: `file://${path}`};
      } else {
        pictureItem = {
          date: new Date().toString(),
          picture: `file://${path}`,
          temperature: metadata.temperature,
          location: metadata.location,
          description: '',
        };
      }
      dispatch(addOrUpdatePicture(pictureItem)).then(() => {
        navigation.pop();
        navigation.navigate('DayView', {day: pictureItem.date});
      });
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {
          camera = ref;
        }}
        captureAudio={false}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        <RoundedButton onPress={takePicture} style={styles.capture}>
          <RemixIcon
            name="camera-lens-line"
            color={colors.secondary}
            size={sizes.roundedBtnIconSize}
          />
        </RoundedButton>
      </View>
    </View>
  );
}

export default CameraView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    position: 'absolute',
    bottom: 32,
  },
});
