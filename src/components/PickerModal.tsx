//@ts-nocheck
import { View, Text, Modal, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { hp, wp } from '../utils/ResponsiveLayout'
import { COLORS, FONTS } from '../utils/Constant'
import { Feather } from '@expo/vector-icons'
import { AnimatePresence, MotiView } from 'moti'
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
interface PickerModalProps {
    visible: boolean;
    onPressCancel: () => void;
    onSelectItem: (item: ImagePicker.ImagePickerResult | DocumentPicker.DocumentPickerResult) => void;

}

const PickerModal = (props: PickerModalProps) => {

    const pickerItems = [
        {
            id: 0,
            value: 'Photos or Videos',
            icon: 'image'
        },
        {
            id: 1,
            value: 'Files',
            icon: 'file'
        },
    ]

    const {visible, onPressCancel, onSelectItem} = props;


    const openPicker = async(index: number) => {
        
        let file:ImagePicker.ImagePickerResult | DocumentPicker.DocumentPickerResult;

        if (index === 0) {
            file = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                quality: 1,
            })
            file = {name: file.assets[0].fileName, size: file.assets[0].fileSize, type: file.assets[0].mimeType, uri: file.assets[0].uri}
        } else {
            file = await DocumentPicker.getDocumentAsync()
            file = {name: file.assets[0].name, size: file.assets[0].size, type: file.assets[0].mimeType, uri: file.assets[0].uri}
        }


        onPressCancel()
        onSelectItem(file)
        
        
    }



  return (
    <AnimatePresence>
    {visible && <MotiView
        style={[styles.container, StyleSheet.absoluteFillObject]}
        from={{ opacity: 0.5, translateY: 150}}
        animate={{ opacity: 1, translateY: 0}}
        exitTransition={{ type: 'timing'}}
        exit={{opacity: 0, translateY: 150}}
        transition={{
            type: 'timing',
            duration: 200,

        }}
    >
        <View style={styles.pickerContainer}>
            <View style={styles.pickerInnerContainer}>
            {pickerItems.map((e,i) => {
                return (
                    <Pressable 
                        key={i} 
                        style={[styles.pickerItem, {marginBottom: i == 0 ? hp(14) : 0}]}
                        onPress={() => openPicker(i)}
                    >
                        <Feather 
                            //@ts-ignore
                            name={e.icon}
                            size={wp(26)}
                            color={COLORS.BLUE_COLOR}
                            style={{ marginRight: wp(8)}}
                        />
                        <Text style={styles.pickerItemText}>{e.value}</Text>
                    </Pressable>
                )
            })}

            

            </View>
            <Pressable onPress={() => onPressCancel()} style={[styles.pickerInnerContainer,{ marginTop: hp(12), alignItems: 'center'}]}>
                <Text style={[styles.pickerItemText, {color: COLORS.RED_COLOR}]}>Cancel</Text>
            </Pressable>
        </View>
      
    </MotiView>}
    </AnimatePresence>
  )
}

export default PickerModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',

    },
    pickerContainer: {
        flex: 1,
        marginHorizontal: wp(26),
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: hp(30)
    },
    pickerInnerContainer: {
        borderRadius: 12,
        backgroundColor: COLORS.WHITE_COLOR,
        padding: wp(10),
        width: "100%",
    },
    pickerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    pickerItemText: {
        fontSize: wp(18),
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.BG_COLOR,
    }
})