import { StyleSheet } from 'react-native';

export const BottomMenuStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        width: '100%',
    }, image: {
        width: 25,
        height: 25,
        contentFit: 'contain',
    },
    containerImage: {
        alignItems: 'center'
    },
    containerBottom: {
        flex: 1,
        justifyContent: 'flex-end'
    }
});