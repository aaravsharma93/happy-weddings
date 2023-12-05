import {Dimensions} from 'react-native';

const dimensionMethod = Dimensions.get('window');

const deviceDimesions = {
    Height : dimensionMethod.height,
    width : dimensionMethod.width
};

export default deviceDimesions;