import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

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
  rightcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e91e63',
    paddingVertical: responsiveHeight(1),
    marginTop: responsiveHeight(0.5),
  },
 
});

export default styles;
