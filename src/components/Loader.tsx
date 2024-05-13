//@ts-nocheck
import { View, Text, Modal, StyleSheet, SafeAreaView } from 'react-native'
import React, { useRef, useState } from 'react'
import { MotiText, MotiView } from 'moti'
import { Easing } from 'react-native-reanimated'
import { COLORS, FONTS } from '../utils/Constant'
import LottieView from 'lottie-react-native'
import { DEVICE_WIDTH, hp, wp } from '../utils/ResponsiveLayout'
import { Feather } from '@expo/vector-icons'
import { UploadResType } from '../utils/types'
import * as Clipboard from 'expo-clipboard'

interface LoaderProps {
    isVisible: boolean;
    fileRes: UploadResType;
    onLoaderClose: () => void;
}

const Loader = (props: LoaderProps) => {

    const { isVisible, fileRes, onLoaderClose } = props

    const [isCopy, setIsCopy] = useState<boolean>(false);
    const copyAnimeRef = useRef();

    const onCopLink = async() => {
        await Clipboard.setUrlAsync(fileRes?.link)
        setIsCopy(true)
        copyAnimeRef.current?.play();
    }
  return (
    <Modal
        visible={isVisible}
        animationType='slide'
    >
        {/* <StatusBar backgroundColor={COLORS.BLUE_COLOR} /> */}
        <View style={styles.container}>
            <LottieView 
                source={require('../../assets/loader.json')}
                autoPlay
                style={{
                    height: wp(230),
                    width: wp(230)
                }}
            />
            {fileRes == undefined && <MotiText 
                style={styles.uploadText}
                from={{opacity: 0.5, scale: 1}}
                animate={{ opacity: 1, scale: 1.2}}
                transition={{
                    type: 'timing',
                    duration: 1200,
                    easing: Easing.out(Easing.ease),
                    loop: true
                }}
            >
                    Uploading
            </MotiText>}
            {fileRes &&
            <MotiText 
                style={styles.uploadSuccessText}
                from={{opacity: 0, scale: 1}}
                animate={{ opacity: 1, scale: 1}}
                transition={{
                    type: 'timing',
                    duration: 1200,
                    delay: 50,
                    easing: Easing.out(Easing.ease),
                }}
            >
                Your file has been uploaded
            </MotiText>
            }
            {fileRes && <MotiView 
                style={styles.linkView}
                from={{opacity: 0,}}
                animate={{ opacity: 1,}}
                transition={{
                    type: 'timing',
                    duration: 1200,
                    delay: 50,
                    easing: Easing.out(Easing.ease),
                }}
            >
                <Text style={styles.linkText}>{fileRes?.link}</Text>
                {!isCopy && <Feather 
                    name='copy'
                    size={wp(24)}
                    color={COLORS.WHITE_COLOR}
                    onPress={onCopLink}
                />}
                {isCopy && <LottieView 
                    source={require('../../assets/check.json')}
                    style={{
                        height: 24,
                        width: 24,
                        
                    }}
                    ref={copyAnimeRef}
                    onAnimationFinish={() => {
                        // copyAnimeRef.current?.reset();
                        copyAnimeRef.current?.reset();
                        setIsCopy(false)
                    }}
                    loop={false}
                    
                />}
            </MotiView>}
            

            {fileRes && <Text onPress={onLoaderClose} style={styles.closeText}>Close</Text>}
        </View>
    </Modal> 

  )
}

export default Loader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BG_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadText: {
        fontSize: wp(26),
        fontFamily: FONTS.POPPINS_BOLD,
        color: COLORS.WHITE_COLOR,
        textTransform: 'uppercase',
        letterSpacing: 3
    },
    successView: {
        width: wp(230),
        height: wp(230),
        borderRadius: 300,
        backgroundColor: COLORS.BLUE_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadSuccessText: {
        fontSize: wp(18),
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.WHITE_COLOR
    },
    linkView: {
        width: DEVICE_WIDTH - wp(24),
        paddingVertical: hp(10),
        paddingHorizontal: wp(18),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.BLUE_COLOR,
        marginTop: hp(16)
    },
    linkText: {
        fontSize: wp(16),
        fontFamily: FONTS.POPPINS_REGULAR,
        color: COLORS.WHITE_COLOR
    },
    closeText: {
        fontSize: wp(20),
        fontFamily: FONTS.POPPINS_BOLD,
        color: COLORS.BLUE_COLOR,
        textAlign: 'center',
        bottom: hp(40),
        position: 'absolute'
    }
})