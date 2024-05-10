import { StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5), // 5% of the screen width
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
  },

  logoContainer: {
    alignItems: 'center', // Center logo container contents horizontally
    width: '100%', // Use full width to center content in the middle
    marginTop: -responsiveHeight(5), // 5% of the screen height
    // borderWidth:2,
    // borderColor:'red'
  },

  logo: {
    width: responsiveWidth(140), // 40% of the screen width
    height: responsiveHeight(50), // 20% of the screen height
    resizeMode: 'contain',
    alignSelf: 'center', // Center logo horizontally
  },

  heading: {
    fontSize: responsiveFontSize(4), // 4% of the screen's font size
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center', // Center text horizontally
  },

  subheading: {
    fontSize: responsiveFontSize(2.4), // 2% of the screen's font size
    color: 'blue',
    marginBottom: responsiveHeight(2), // 2% of the screen height
    fontStyle: 'italic',
    textAlign: 'center', 
    letterSpacing: 1.1,
    
  },

  formContainer: {
    width: '100%',
    alignItems: 'center', // Center form contents horizontally
  },

  input: {
    height: responsiveHeight(6), // 6% of the screen height
    width: '90%', // 90% of the screen width
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: responsiveWidth(2), // 2% of the screen width
    marginBottom: responsiveHeight(2), // 2% of the screen height
    paddingHorizontal: responsiveWidth(3), // 3% of the screen width
    fontSize: responsiveFontSize(2), // 2% of the screen's font size
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)' // 75% white, 25% transparent
},

  button: {
    borderRadius: responsiveWidth(3), // 3% of the screen width
    paddingVertical: responsiveHeight(1.5), // 1.5% of the screen height
    paddingHorizontal: responsiveWidth(5), // 5% of the screen width
    backgroundColor: '#e91e63', // Red color with 90% opacity

    justifyContent: 'center',
    alignItems: 'center',
    width: '90%', // 90% of the container width
    marginTop: responsiveHeight(2),
  },

  buttonText: {
    color: 'white',
    fontSize: responsiveFontSize(2.3),
    fontWeight: '600',
    letterSpacing: 1.5, 

  },

});

export default styles;
