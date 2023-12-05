import { H1, View } from 'native-base';
import React from 'react';
import {
    Alert,
    BackHandler,
    Image,
    StatusBar,
    StyleSheet,
    Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import deviceDimesions from '../../helper/DeviceDimensions/DeviceDimensions';
import ImagesPathVariable from '../../helper/ImagesPathVariable/ImagesPathVariable';
import { NeuBorderView, } from 'react-native-neu-element';
import Icon from 'react-native-vector-icons/FontAwesome';
import { goToLoginScreen } from '../../helper/NavigationFunctions/NavigationFunctions';
import LoaderOnButtonPress from '../../component/LoaderOnButtonPress/LoaderOnButtonPress';


export default class LandingScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            entries: [
                { image: ImagesPathVariable.LandingImage1 },
                { image: ImagesPathVariable.LandingImage2 },
                { image: ImagesPathVariable.LandingImage3 },
            ],
            activeDotIndex: 0,
            LoaderProperties: {
                isLoading: false,
                LoadingTitle: ""
            },
        }
    }

    backAction = () => {
        if (!this.props.navigation.isFocused()) {
            return false;
        }
        else {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        }
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }
    _renderItem = ({ item, index }) => {
        return (
            <View>
                <Image source={item.image} style={styles.carouselItem} />
            </View>
        );
    }

    ToggleLoader(name, title) {
        this.setState({
            LoaderProperties: {
                ...this.state.LoaderProperties,
                LoadingTitle: name,
                isLoading: title,
            }
        })
    }

    onSkipButtonPress() {
        goToLoginScreen({ openModel: false })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                {/* Loader */}
                <LoaderOnButtonPress showLoader={this.state.LoaderProperties.isLoading} LoadingText={this.state.LoaderProperties.LoadingTitle} />

                {/* Slide Show */}
                <View style={styles.carouselContainer}>
                    <Carousel
                        initialScrollIndex={2}
                        data={this.state.entries}
                        renderItem={this._renderItem}
                        sliderWidth={deviceDimesions.width}
                        itemWidth={deviceDimesions.width}
                        onSnapToItem={(index) => { this.setState({ activeDotIndex: index }); index + 1 == this.state.entries.length ? this.onSkipButtonPress() : null }}
                    />
                    <Pagination
                        dotsLength={this.state.entries.length}
                        activeDotIndex={this.state.activeDotIndex}
                        containerStyle={{ backgroundColor: '#ffffff' }}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 10,
                            marginHorizontal: 1,
                            backgroundColor: 'rgb(255,139,3)'
                        }}
                        inactiveDotStyle={{
                            backgroundColor: 'rgb(255,139,3)'

                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                    />
                </View>

                <View style={styles.skipButtonContainer}>
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPressIn={() => this.onSkipButtonPress()}
                    >
                        <NeuBorderView
                            color="#ffffff"
                            height={30}
                            width={30}
                            borderRadius={20}
                            inset
                        >
                            <Icon name="step-forward" size={14} color="orange" />
                        </NeuBorderView>
                        <Text>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    carouselContainer: {
        alignItems: "center"
    },
    carouselItem: {
        width: deviceDimesions.width,
        top: deviceDimesions.Height * 0.0,
        height: deviceDimesions.Height * 0.9,
        resizeMode: "stretch"
    },
    textView: {
        alignItems: 'center',
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        alignItems: 'center',
    },
    skipButtonContainer: {
        position: "absolute",
        bottom: 20,
        right: -2,
        alignItems: "flex-end"
    },
    skipButton: {
        width: deviceDimesions.width * 0.3,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: "center",
        elevation: 4,
        paddingRight: 20,
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#ffffff"
    }
});
