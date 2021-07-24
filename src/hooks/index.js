import React, {useEffect, useState} from 'react';
import Config from 'react-native-config';

const LOCATION_API = 'https://nominatim.openstreetmap.org/reverse?';
const TEMPERATURE_API = 'https://api.openweathermap.org/data/2.5/weather?';

function querystring(params) {
  let query = Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
  return query;
}

function useMetadata(location) {
  const [metadata, setMetadata] = useState(null);
  useEffect(() => {
    const fetchPlace = async () => {
      const params = {
        lat: location.lat,
        lon: location.lon,
        format: 'json',
        zoom: '18',
        addressdetails: 1,
      };
      const url = LOCATION_API + querystring(params);
      let place = 'NA';
      try {
        const response = await fetch(url);
        const json = await response.json();
        const city = json.address.city || json.address.town;
        place = `${city}, ${json.address.country}`;
      } catch (error) {
        console.error(error);
      }

      return place;
    };

    const fetchTemperature = async () => {
      const params = {
        lat: location.lat,
        lon: location.lon,
        appid: Config.WEATHER_API_KEY,
        units: 'metric',
      };
      let temperature = 'NA';
      try {
        const response = await fetch(TEMPERATURE_API + querystring(params));
        const json = await response.json();
        temperature = parseInt(json.main.temp);
      } catch (error) {
        console.error(error);
      }

      return temperature;
    };

    const fetchMetadata = async () => {
      const [location, temperature] = await Promise.all([
        await fetchPlace(),
        await fetchTemperature(),
      ]);
      setMetadata({location, temperature});
    };

    if (metadata === null) {
      fetchMetadata();
    }
  }, [location, metadata]);

  return metadata;
}

export {useMetadata};
