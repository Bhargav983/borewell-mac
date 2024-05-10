import { StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    padding: responsiveWidth(5),
    marginTop: responsiveHeight(10),
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: responsiveHeight(1),
  },
  infoText: {
    fontSize: responsiveFontSize(2.25),
    marginLeft: responsiveWidth(2),
    color:'black',
  },
  logoutButton: {
    marginTop: responsiveHeight(2.5),
    backgroundColor: 'red',
    padding: responsiveWidth(3),
    borderRadius: responsiveWidth(1.25),
  },
  buttonText: {
    color: 'white',
    fontSize: responsiveFontSize(2.5),
  },
  userIcon: {
    width: responsiveWidth(40),
    height: responsiveWidth(40),
    marginBottom: responsiveHeight(2),
  },
});

export default styles;
