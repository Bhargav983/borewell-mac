import React, { useState, useEffect } from 'react';
import { View ,Text,ScrollView} from 'react-native';
import MotorControl from './MotorControl';
import { useDeviceContext } from '../../../context/DeviceContext';
import { getDeviceTanksData } from '../../../apiUtils/apiServices';
import Loader from '../../../utils/Loader';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import TestLineChart from './Test/TestLineChart';
import styles from './OnDetailsStyles';
import NoTanks from '../../../utils/NoTanks';
const OnDetails = () => {
  const [loading, setLoading] = useState(true);
  const { selectedDevice } = useDeviceContext();
  const [tankDetails, setTankDetails] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      if (!selectedDevice) return;
      setLoading(true);
      try {
        const data = await getDeviceTanksData(selectedDevice.profile_type,selectedDevice.device_id);
        console.log("Tank details = ",data.length);
        setTankDetails(data);
      } catch (error) {
        console.error('Error fetching tank details:', error);
        setTankDetails([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDevice]);


if (loading) {
  return (
    <Loader/>
  );
}

if (!tankDetails.length) {
  return (
    <NoTanks/>
  );
}
  return (
    <View style={styles.container}>
      {/* <View style={styles.deviceName}>
          <Text style={{fontSize:25,fontWeight:'bold',color:'white'}}>{selectedDevice.device_name}</Text>
    </View> */}
        <ScrollView style={{ flex: 1,backgroundColor:'white' }} contentContainerStyle={{ flexGrow: 1 }}>

    {tankDetails.map((tank, index) => (
        <View key={index} style={{marginTop:7}}>
 
          <View style={[styles.leftcontainer,{marginTop:index==1? responsiveHeight(0) :0}]}>
            <Text style={styles.title}>{tank.tank_name}</Text>
          </View>
         
          <View style={[styles.leftcontainer,{marginTop:7}]}>
            <Text style={styles.title}>{"Motor On/Off Status"}</Text>
          </View>
          
          <View style={{ position: 'relative', height: responsiveHeight(48), width: '100%', marginTop: 7 }}>
            <TestLineChart 
            profileType = {selectedDevice.profile_type}
            tankId={tank.tank_id}
             deviceId={selectedDevice.device_id}
              />
          </View>

          <View style={{marginTop:tankDetails.length===1?40:10}}>
    {selectedDevice && <MotorControl deviceId={selectedDevice.device_id}  tankId={tank.tank_id}  />}
    </View>
    <View style={{marginTop:tankDetails.length===1?30:0}}>
    </View>
        </View>
      ))}
</ScrollView>
    
  </View>
  );
};

export default OnDetails;
