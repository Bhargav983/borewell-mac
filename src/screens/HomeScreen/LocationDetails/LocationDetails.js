import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useUser } from '../../../context/userContext';
import styles from './LocationStyles';
import CustomModal from '../../../utils/CustomModal';
import Loader from '../../../utils/Loader';

const INIT_REGION = {
  latitude: 13.20004715316415,
  longitude: 77.572,
  latitudeDelta: 20,
  longitudeDelta: 20,
};

const MyMapView = () => {
  const { user } = useUser(); // Move the hook call outside of useEffect
  const isMounted = useRef(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [isDataValid, setIsDataValid] = useState(false); 
  const [data, setData] = useState([]); // Move state declaration to the top
  const [mapRegion, setMapRegion] = useState(INIT_REGION); // State for map region

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
    } else {
      setErrorMsg('User context is missing.');
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://nimblevision.io/public/api/getUserDeviceIds?key=chinnu&token=257bbec888a81696529ee979804cca59&user_phone=${user.phone}&user_email=${user.email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const fetchedData = await response.json();
      
      // Filter out data points with invalid latitude and longitude values
      const filteredData = fetchedData.filter(device => device.lat !== 0 && device.lng !== 0);
      
      if (filteredData.length === 0) {
        // No valid data points found
        setModalVisible(true);
        setErrorMsg('No valid location data available');
        setIsDataValid(false);
        setLoading(false);
        return;
      }
      
      // Map the filtered data to the required format
      const mappedData = filteredData.map(device => ({
        id: `${device.device_id}`,
        location: { latitude: device.lat, longitude: device.lng },
        name: `${device.device_name}`,
      }));
  
      setModalVisible(true);
      setErrorMsg(1);
      setData(mappedData);
      setIsDataValid(true);
      setLoading(false);
      // Set the map region to fit all markers
      fitToMarkers(mappedData);
    } catch (error) {
      setErrorMsg('Error fetching device data: ' + error.message);
      setModalVisible(false);
      setErrorMsg(2);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setModalVisible(false);
  }

  const fitToMarkers = (markers) => {
    if (markers.length > 0) {
      let minLat = markers[0].location.latitude;
      let maxLat = markers[0].location.latitude;
      let minLng = markers[0].location.longitude;
      let maxLng = markers[0].location.longitude;

      markers.forEach(marker => {
        minLat = Math.min(minLat, marker.location.latitude);
        maxLat = Math.max(maxLat, marker.location.latitude);
        minLng = Math.min(minLng, marker.location.longitude);
        maxLng = Math.max(maxLng, marker.location.longitude);
      });

      const region = {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLng + maxLng) / 2,
        latitudeDelta: Math.abs(minLat - maxLat) + 0.02,
        longitudeDelta: Math.abs(minLng - maxLng) + 0.02,
      };

      setMapRegion(region);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!isDataValid) { 
    return (
      <View style={{flex:1, textAlign: 'center',justifyContent:'center'}}>
        <Text style={{ color:'black', fontSize: 18, textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
          There is no proper location data available
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, marginTop: 10, marginBottom: 90 }}>
      {isDataValid && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={INIT_REGION}
          provider={PROVIDER_GOOGLE}
          region={mapRegion} // Set the region to the state value
          onMapReady={() => console.log("Map ready")}
        >
          {data.map((dataItem) => (
            <Marker
              key={dataItem.id}
              coordinate={dataItem.location}
            >
              <Callout>
                <View style={styles.calloutView}>
                  <Text style={styles.calloutText}>{dataItem.name}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
      <CustomModal visible={modalVisible} errorMsg={errorMsg} onClose={handleClose} />
    </View>
  );
};

export default MyMapView;
