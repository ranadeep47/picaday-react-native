import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import PictureCard from '../../components/PictureCard';
import {colors} from '../../utils/constants';
import {initialiseState, setLocation} from '../../redux/actions/home';
import Geolocation from '@react-native-community/geolocation';

function Loader() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={colors.secondary} />
    </View>
  );
}

const Home = ({navigation}) => {
  const {pictures} = useSelector(state => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialiseState());
    Geolocation.getCurrentPosition(info => {
      dispatch(
        setLocation({lat: info.coords.latitude, lon: info.coords.longitude}),
      );
    });
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <PictureCard
        data={item}
        onPress={() =>
          navigation.navigate('DayView', {day: item.date.toString()})
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      {pictures.isFetching ? (
        <Loader />
      ) : (
        <FlatList
          initialNumToRender={4}
          renderItem={renderItem}
          data={[...pictures.data.rows].reverse()}
          keyExtractor={item => item.picture}
          removeClippedSubviews={true}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
