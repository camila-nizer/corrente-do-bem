import React from 'react';
import { View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const GradientBackground = ({ children }) => {
    return (
        <LinearGradient
            colors={['#ffffff', '#B0DDAE']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0.5 }} // Canto superior esquerdo
            end={{ x: 1, y: 0.5 }} // Canto superior direito
        >
            {children}
        </LinearGradient>
    );
};

export default GradientBackground;