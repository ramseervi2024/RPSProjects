import React from 'react';
import { Text, StyleSheet } from 'react-native';

import {
    fontFamilies,
    fontSizes,
    fontColor,
} from './fonts';

const RNF = ({
    children,

    // Font
    variant = 'regular',

    // Size
    size = fontSizes.size16,

    // Color
    color = fontColor.CHINESEBLACK,

    // Alignment
    align = 'left',

    // Text props
    numberOfLines,

    // Custom style
    style,

    ...props
}) => {
    return (
        <Text
            {...props}
            numberOfLines={numberOfLines}
            style={[
                styles.base,

                // Selected Inter font
                {
                    fontFamily:
                        fontFamilies[variant] ||
                        fontFamilies.regular,

                    fontSize: size,

                    color,

                    textAlign: align,
                },

                style,
            ]}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    base: {
        includeFontPadding: false,
    },
});

export default RNF;