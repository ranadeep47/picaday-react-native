import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors} from '../../utils/constants';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';

const Summary = () => {
  const {
    pictures: {data},
  } = useSelector(state => state.home);
  const totalRecorded = data.rows.length;
  const totalDaysElapsed = dayjs().diff(dayjs(data.installedDate), 'day');
  let coldest = data.rows[0];
  let hottest = data.rows[0];

  data.rows.forEach(row => {
    if (row.temperature > hottest.temperature) {
      hottest = row;
    }
    if (row.temperature < coldest.temperature) {
      coldest = row;
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Days</Text>
        <Text style={styles.statistic}>
          {totalRecorded}/{totalDaysElapsed}
        </Text>
        <Text style={styles.description}>
          You have recored {totalRecorded} days since the first day
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Hottest day</Text>
        <Text style={styles.statistic}>{hottest.temperature}&#176;</Text>
        <Text style={styles.description}>
          {dayjs(hottest.date).format('ddd MMM D, YYYY')}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.title}>Coldest day</Text>
        <Text style={styles.statistic}>{coldest.temperature}&#176;</Text>
        <Text style={styles.description}>
          {dayjs(coldest.date).format('ddd MMM D, YYYY')}
        </Text>
      </View>
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  row: {
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: colors.primary,
  },
  statistic: {
    fontSize: 56,
    fontFamily: 'Inter-Bold',
    color: colors.darkPrimary,
  },
  description: {
    fontSize: 12,
    color: colors.primary,
  },
});
