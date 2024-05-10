import { StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
     backgroundColor: '#e91e63',
    paddingVertical: responsiveHeight(1.5), 
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex:20,
  },
  navItem: {
    alignItems: 'center',
  },
  label: {
    fontSize: responsiveFontSize(2), 
    marginTop: responsiveHeight(0.4), 
    marginBottom: responsiveHeight(0.6), 
    color: 'black', 
  },
});

export default styles;
