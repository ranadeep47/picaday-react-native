import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {isSameDay} from '../../utils';
import {colors, sizes} from '../../utils/constants';
import PhotoCard from '../../components/PictureCard';
import RoundedButton from '../../components/RoundedButton';
import RemixIcon from '../../components/RemixIcon';
import {addOrUpdatePicture} from '../../redux/actions/home';

const DayView = ({navigation, route}) => {
  const day = route.params.day;
  const {pictures} = useSelector(state => state.home);
  const dispatch = useDispatch();
  const selectedPicture = pictures.data.rows.find(row =>
    isSameDay(row.date, day),
  );
  const isToday = isSameDay(new Date(), day);
  const [comment, setComment] = useState(selectedPicture.description);

  const onChangeText = text => {
    setComment(text);
    const updatedPictureItem = {...selectedPicture, description: text};
    dispatch(addOrUpdatePicture(updatedPictureItem));
  };

  const reCapture = () => {
    navigation.navigate('CameraView');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <PhotoCard
          data={selectedPicture}
          onPress={() =>
            navigation.navigate('PhotoView', {picture: selectedPicture.picture})
          }
        />
        {isToday ? (
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <RoundedButton style={styles.floatingButton} onPress={reCapture}>
              <RemixIcon
                name="camera-lens-line"
                color={colors.secondary}
                size={sizes.roundedBtnIconSize}
              />
            </RoundedButton>
          </View>
        ) : null}
      </View>
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        <View>
          <TextInput
            style={styles.input}
            multiline={true}
            editable={isToday}
            placeholder="Type your thoughts..."
            onChangeText={onChangeText}
            value={comment}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default DayView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {},
  floatingButton: {
    position: 'absolute',
    bottom: -32,
    elevation: 2,
  },
  input: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
});
