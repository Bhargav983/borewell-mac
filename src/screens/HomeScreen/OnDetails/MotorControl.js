import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import RIcon from 'react-native-remix-icon';
import NoUpdateReceived from '../../../utils/NoUpdate';
import { responsiveHeight } from 'react-native-responsive-dimensions';
const MotorControl = ({ deviceId,tankId }) => {
  const [onOffStatus, setOnOffStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [displayButton, setDisplayButton] = useState(true);
  const [loading,setLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(true);

console.log("device id in mototr control =",deviceId,tankId)
  useEffect(() => {
    fetchData();
  }, [deviceId]);

  

  const fetchData = async () => {
    try {
      const response = await axios.post('https://nimblevision.io/public/api/getMotorControlStatus', {
        profile_type: 1,
        device_id: deviceId,
        tank_id: tankId,
        key: 'chinnu',
        token: '257bbec888a81696529ee979804cca59'
      });
      
      console.log("tank_id response",response.data);
      if (response.data.msg && response.data.msg === 'No data found.') {
        setOnOffStatus(3);          
         setIsUpdate(false);

      } else {
        setOnOffStatus(response.data.on_off_status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMsg(' ');
      setOnOffStatus(2);
      setIsUpdate(false)
    }
  };

  const toggleMotor = async () => {
    const newStatus = onOffStatus === 1 ? 0 : 1;
    try {
      const response = await axios.post('https://nimblevision.io/public/api/setMotorControlStatus', {
        profile_type: 1,
        device_id: deviceId,
        tank_id: tankId,
        key: 'chinnu',
        token: '257bbec888a81696529ee979804cca59',
        motor_status: newStatus
      });
      
      setOnOffStatus(newStatus);
    } catch (error) {
      console.error('Error toggling motor:', error);
      setErrorMsg('Error toggling motor');
      setOnOffStatus(2); // Set onOffStatus to 2 for error state
    }
  };
console.log("on off starts",onOffStatus)

// if (!isUpdate) {
//   return (
//     <NoUpdateReceived marginTop={responsiveHeight(5)} msg={"There is no update recieved"}/>
//   );
// }
  return (
    <View style={{ alignItems: 'center' }}>
      {/* <Text style={{ fontSize: 20 }}>Device ID: {deviceId}</Text> */}
      {errorMsg && onOffStatus !== 0 && onOffStatus !== 1 && <Text style={{ fontSize: 16, color: 'red' }}>{errorMsg}</Text>}
      {onOffStatus === null && loading && <Text>Loading...</Text>}
      {onOffStatus === 3 && <Text>No data found</Text>}
      {onOffStatus === 2 && <Text>   </Text>}

{onOffStatus !== null &&  onOffStatus !== 2 && displayButton ? (
        <>
          <TouchableOpacity
            style={{
              backgroundColor: onOffStatus === 1 ? 'green' : 'red',
              padding: 15,
              borderRadius: 22,
              marginBottom: tankId == 1 ? 10 : 100,
              width: '100%'
            }}
            onPress={toggleMotor}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <RIcon
                name={onOffStatus === 1 ? 'ri-shut-down-line' : 'ri-shut-down-line'}
                size={24}
                color="white"
                style={{ marginRight: 10 }}
              />
              <Text style={{ color: 'white', fontSize: 20 }}>
                {onOffStatus === 1 ? 'Turn Off Motor' : 'Turn On Motor'}
              </Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <View style={{marginBottom:tankId==2?100:0}}>
        <Text style={{fontSize:20,color:'red'}}>No device to manage remotely </Text>
        </View>
      )}
    </View>
  );
};

export default MotorControl;
