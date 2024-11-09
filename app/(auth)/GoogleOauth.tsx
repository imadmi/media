import { Button } from '@/components/Button';
import { Image } from 'expo-image';
import React from 'react';

function GoogleOauth() {
    return (
        <Button
            text="Sign in with Google"
            onPress={() => alert('Button Pressed!')}
            className="bg-white text-white w-full flex-row justify-center
            items-center h-12 rounded-[9999px]"
            fontStyling="text-md font-normal"
            startIcon={
                <Image
                    source={require('../../assets/images/google-icon-logo.svg')}
                    style={{
                        height: 24,
                        width: 24,
                    }}
                />
            }
        />
    );
}

export default GoogleOauth;
