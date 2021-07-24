import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import dayjs from 'dayjs';
import RemixIcon from '../RemixIcon';

const {height} = Dimensions.get('window');
const CARD_HEIGHT = height / 4 - 20;

const PictureCard = ({data, ...props}) => {
  const date = dayjs(data.date).format('D');
  const month = dayjs(data.data).format('MMM');

  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Image style={styles.picture} source={{uri: data.picture}} />
      <View style={styles.textOverlayContainer}>
        <View>
          <View>
            <Text style={styles.month}>{month}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
        <View style={styles.metadata}>
          <View style={styles.row}>
            <RemixIcon name={'map-pin-3-line'} color={'#fff'} size={12} />
            <Text style={styles.location}>{data.location}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.temperature}>{data.temperature}&#176;</Text>
            <RemixIcon name={'sun-line'} color={'#fff'} size={12} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PictureCard;

const styles = StyleSheet.create({
  container: {
    height: CARD_HEIGHT,
  },
  picture: {
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
  },
  textOverlayContainer: {
    height: CARD_HEIGHT,
    justifyContent: 'space-between',
    padding: 12,
  },
  month: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  date: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    lineHeight: 26,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  location: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
  },
  temperature: {
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginRight: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
