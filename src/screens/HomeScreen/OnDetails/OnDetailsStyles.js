import { StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  leftcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e91e63',
    paddingVertical: responsiveHeight(1),
    
  },
  
  title: {
    color: 'white',
    fontSize: responsiveFontSize(3),
  }, 
  container: {
    flex:1
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    //  backgroundColor: '#e91e63',
    // paddingVertical: responsiveHeight(1.5), 
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    // zIndex:20,
  },
  deviceName: {marginTop:10,backgroundColor:'#e91e63',alignItems:'center',justifyContent:'center',padding:10},
  label: {
    fontSize: responsiveFontSize(2), 
    marginTop: responsiveHeight(0.4), 
    marginBottom: responsiveHeight(0.6), 
    color: 'black', 
  },
  timeGraph:{height:responsiveHeight(50.5),marginTop:responsiveHeight(6),marginBottom: responsiveHeight(4)},
  onOffButtonContainer:{marginTop: responsiveHeight(1.5)}
});

export default styles;
