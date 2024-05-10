import React, { useState, useEffect } from 'react';
import {  View, Text,  processColor } from 'react-native';
import { BarChart } from 'react-native-charts-wrapper';
import { fetchBarChartData } from '../../../apiUtils/apiServices';
import CustomModal from '../../../utils/CustomModal';
import Loader from '../../../utils/Loader';
import { fetchLastUpdate } from '../../../apiUtils/apiServices';
import styles from './ChartStyles';
const ChartComponent = ({ profileType, deviceId, tankId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [showWave, setShowWave] = useState(false);
  const [errorMsg, setErrorMsg] = useState(0); 
  const [lastUpdateTime,setLastUpdateTime] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, updateAvailable } = await fetchBarChartData(profileType, deviceId, tankId);
        const { lastUpdate  } = await fetchLastUpdate(profileType, deviceId, tankId);
        console.log("inside fetch Last Update ",lastUpdate);
        setLastUpdateTime(lastUpdate);
        // console.log("in line data ",data)
        if (data === undefined || !updateAvailable) {
          setModalVisible(true);
          setErrorMsg(2);
          setIsUpdate(false);
        } else {
          const reversedData = [...data].reverse();
          setChartData(reversedData);
          setModalVisible(true);
          setErrorMsg(1);
          setIsUpdate(true);
        }
      } catch (error) {
        setModalVisible(true);
        setErrorMsg(2);
        console.error('An error occurred:', error);
        setIsUpdate(false);
      }
      setLoading(false);
    }
    fetchData();
  }, [deviceId, tankId, profileType])

  if (loading || !chartData) {
    return <Loader/>
  }

  if (!isUpdate) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>
          There is no update received today
        </Text>
      </View>
    )
  }

  const handleClose = () => {
    setModalVisible(false);
    setShowWave(true); 
  }

  const dates = chartData.map(item => item.created_at.substring(0, 10)); // Extract dates from chart data

  // Define an array of colors to assign to each bar
  const colors = [
    'rgba(244, 143, 177, 0.8)',
    'rgba(129, 199, 132, 0.8)',
    'rgba(79, 195, 247, 0.8)',
    'rgba(255, 238, 88, 0.8)',
    'rgba(255, 138, 101, 0.8)',
    'rgba(129, 199, 132, 0.4)',
    'rgba(255, 238, 88, 0.5)'
  ];
  let colorIndex = 0; 

  return (
    <View style={styles.container}>
     {/* { showWave && <Text style={styles.lastUpdate}>Server received last update on </Text>}
     {  showWave && <Text style={styles.updatedDate}> {lastUpdateTime}</Text>} */}
      <CustomModal visible={modalVisible} errorMsg={errorMsg} onClose={handleClose} />
      {showWave && (
        <View style={styles.chartContainer}>
          <BarChart
            style={styles.chart}
          // Update the data structure passed to the BarChart component to include labels for each dataset
              data={{
                dataSets: [{
                  label: 'One Day Night', // Add a label for the dataset
                  values: chartData.map((item, index) => ({ y: item.oneday_night })),
                  config: {
                    colors: chartData.map(() => {
                      const color = colors[colorIndex];
                      colorIndex = (colorIndex + 1) % colors.length;
                      return processColor(color);
                    }),
                    barShadowColor: processColor('lightgrey'),
                    highlightAlpha: 90,
                    highlightColor: processColor('red'),
                    drawValues: true
                  }
                }],
              }}

            xAxis={{
              valueFormatter: dates,
              granularityEnabled: true,
              granularity: 1,
              zoomEnabled: true, // Enable zooming on x-axis
              labelRotationAngle: 0, // Rotate labels by 45 degrees
            }}
            yAxis={{
              left: {
                enabled: true,
                zoomEnabled: true, // Disable zooming on y-axis
              },
              right: {
                enabled: false,
                zoomEnabled: false, // Disable zooming on y-axis
              }
            }}
            legend={{
              enabled: false // Hide legend
            }}
            doubleTapToZoomEnabled={false}
            highlights={[]}
            drawGridBackground={false} // Disable grid background
            drawBorders={false} // Disable borders
            marker={{ enabled: true, markerColor: processColor('black'), textColor: processColor('white') }} // Show marker on tap
            onChange={(event) => console.log("on cahnge",event.nativeEvent)}
            description= {{
                text: 'Past Data',
                textSize: 15,
                textColor: processColor('darkgray'),
        }
              }
          />
        </View>
      )}

      <View style={{backgroundColor:'white',paddingTop:25,marginTop:-25}}></View>
      <View style={{ marginBottom:tankId===1?-15:85 }}></View>
      {/* <View style={{ marginBottom:tankId===1?-5:0  ,backgroundColor:'tomato',}}></View> */}
    </View>
  );
};


export default ChartComponent;
