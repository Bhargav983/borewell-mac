import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginTop:responsiveHeight(1)
      },
      chartContainer: {
        flex: 1
      },
      chart: {
        flex: 1
      },
      loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export default styles;
