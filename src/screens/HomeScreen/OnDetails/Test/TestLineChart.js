import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, processColor } from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';
import { useDeviceContext } from '../../../../context/DeviceContext';
import CustomModal from '../../../../utils/CustomModal'
import { fetchLastUpdate } from '../../../../apiUtils/apiServices';
import { responsiveFontSize,responsiveHeight } from 'react-native-responsive-dimensions';
const COLOR_PURPLE = processColor('#697dfb');

const TestLineChart = ({ deviceId ,navigation,tankId,profileType }) => {
  const [chartData, setChartData] = useState({});
  const [xAxis, setXAxis] = useState({});
  const [yAxis, setYAxis] = useState({});
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [selectedXIndex, setSelectedXIndex] = useState(null);
  // const { selectedDevice } = useDeviceContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState(0); 
  const [lastUpdateTime,setLastUpdateTime] = useState(null);
  useEffect(() => {
    let timer;
  
    const fetchDataWithDelay = async () => {
      timer = setTimeout(async () => {
        try {
          const { lastUpdate } = await fetchLastUpdate(profileType, deviceId, tankId);
          setLastUpdateTime(lastUpdate);
        } catch (error) {
          console.error('An error occurred while fetching last update:', error);
        }
      }, 2500);
    };
  
    fetchDataWithDelay();
  
    return () => clearTimeout(timer);
  }, [deviceId]);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://nimblevision.io/public/api/getDeviceMotorStatus?key=chinnu&token=257bbec888a81696529ee979804cca59&device_id=${deviceId}&profile_type=1&tank_id=${tankId}`);
        const data = await response.json();
        const reversedData = data.data.reverse();
        
        const size = reversedData.length;
        
        const updatedXAxis = {
          valueFormatter: reversedData.map(item => item.updated_time),
          position: 'BOTTOM',
          granularityEnabled: true,
          granularity: 1,
          axisMinimum: 0,
          axisMaximum: size - 1,
          textColor: processColor('red'),
          textSize: 16,
          gridColor: processColor('red'),
          gridLineWidth: 1,
          axisLineColor: processColor('darkgray'),
          axisLineWidth: 1.5,
          gridDashedLine: {
            lineLength: 10,
            spaceLength: 10
          },
          avoidFirstLastClipping: true,
        };

        const updatedYAxis = {
          left: {
            drawGridLines: false,
            axisMinimum: 0,
            axisMaximum: 1,
          },
          right: {
            enabled: false
          }
        };

        const updatedData = {
          dataSets: [{
            values: reversedData.map(item => ({ y: parseInt(item.motor_status) })),
            label: '',
            config: {
              lineWidth: 1.5,
              drawCircles: false,
              drawCubicIntensity: 0.3,
              drawCubic: true,
              drawHighlightIndicators: false,
              color: COLOR_PURPLE,
              drawFilled: true,
              fillColor: COLOR_PURPLE,
              fillAlpha: 90
            }
          }],
        };
       
        setTimeout(() => {
          setModalVisible(true);
          setErrorMsg(1);
        }, 1500);
        setTimeout(() => {
         
        setXAxis(updatedXAxis);
        setYAxis(updatedYAxis);
        setChartData(updatedData);
        }, 2500);
      } catch (error) {
        console.error('Error fetching motor data:', error);
        setModalVisible(true);
        setErrorMsg(2);
      }
    };

    fetchData();
  }, [deviceId]);

  const handleSelect = (event) => {
    if (event.nativeEvent == null) {
      setSelectedEntry(null);
      setSelectedXIndex(null);
    } else {
      const entry = chartData.dataSets[0].values[event.nativeEvent.x];
      setSelectedEntry(entry);
      setSelectedXIndex(event.nativeEvent.x);
    }
  };
 const handleClose=()=>{
  setModalVisible(false);
 }
 
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
      { lastUpdateTime !== null && lastUpdateTime !== undefined && <Text style={styles.lastUpdate}>Server received last update on </Text>}
     <Text style={styles.updatedDate}> {lastUpdateTime}</Text>
        <LineChart
          style={styles.chart}
          data={chartData}
          chartDescription={{ text: '' }}
          xAxis={xAxis}
          yAxis={yAxis}
          legend={{ enabled: false }}
          onSelect={handleSelect}
          onChange={(event) => console.log(event.nativeEvent)}
          scaleXEnabled={true} 
          scaleYEnabled={true}
          // doubleTapToZoomEnabled={true}
        />
        {/* {renderVerticalLine()} */}
      </View>
      <CustomModal visible={modalVisible} errorMsg={errorMsg} onClose={handleClose} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    position: 'relative',
  },
  chart: {
    flex: 1
  },
  verticalLine: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 1,
    height: '100%',
    zIndex: 1
  },
  lastUpdate: {
    fontSize: responsiveFontSize(2.3), 
    color: '#343a40',
    marginBottom: responsiveHeight(1), 
    textAlign: 'center',
   
  },
  updatedDate:{
    fontSize: responsiveFontSize(2.3), 
    color:'#18059E',
    textAlign:'center',
    marginBottom: responsiveHeight(2), 
  },
});

export default TestLineChart;
