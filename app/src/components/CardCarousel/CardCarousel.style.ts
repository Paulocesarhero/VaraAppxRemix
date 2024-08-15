import { StyleSheet } from 'react-native';
import {COLORS} from "../../Constants/Colors";

export const CardCarouselStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    textHeading:{
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.gradientEnd,
        textAlign: 'center',
        letterSpacing: 1,
        textTransform: 'uppercase',
        borderBottomWidth: 2,
        paddingBottom: 10,

    },
    textDescription:{
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.gradientStart,
        textAlign: 'center',
        letterSpacing: 1,
        textTransform: 'capitalize',
        borderBottomWidth: 2,
        paddingBottom: 10,

    },
    ImageStyle:{
        marginHorizontal: 10,
        marginVertical: 10,
        width: 200,
        height: 200,
        borderRadius: 15,
        borderWidth: 8,
        borderColor: '#d31414',
        shadowColor: '#357e1c',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,

    }

});