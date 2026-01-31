import { StyleSheet } from "react-native";
import { ColorMethods } from "../../../ui-design-room/colors/color.methods";
import FontStyles from "../../../ui-design-room/fonts/font.styles";

export default StyleSheet.create({
    slide: {
        flex: 1,
        backgroundColor: ColorMethods.GetColorFromColorCode('slate_100'),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 30,
        resizeMode: 'contain',
    },
    title: {
        ...FontStyles.fontMedium,
        color: ColorMethods.GeSecondarytColorFromColorCode('primaryFontColor'),
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 10,
    },
    text: {
        ...FontStyles.fontRegular,
        color: ColorMethods.GeSecondarytColorFromColorCode('secondaryFontColor'),
        fontSize: 16,
        textAlign: 'center',
    },
    dot: {
        backgroundColor: ColorMethods.GetColorFromColorCode('slate_300'),
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: ColorMethods.GetColorFromColorCode('purple_200'),
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
    },
    button: {
        backgroundColor: ColorMethods.GetColorFromColorCode('purple_300'),
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        ...FontStyles.fontRegular,
        color: ColorMethods.GetColorFromColorCode('slate_20'),
        fontSize: 16,
    },
});