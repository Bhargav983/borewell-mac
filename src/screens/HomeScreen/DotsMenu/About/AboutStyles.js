import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

export const AboutStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'white', 
    },
    title: {
      marginTop: responsiveHeight(2), 
      fontSize: responsiveFontSize(3), 
      fontWeight: 'bold',
      marginBottom: responsiveHeight(2), 
      color: 'black'
    },
    body: {
      color: 'black',
      fontSize: responsiveFontSize(2.2), 
      textAlign: 'center',
      marginBottom: responsiveHeight(1), 
    },
    link: {
      fontSize: responsiveFontSize(2.2), 
      color: 'black'
    }
});

export default AboutStyles;
