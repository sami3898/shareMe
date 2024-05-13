//@ts-nocheck
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS } from "../utils/Constant";
import { Feather } from "@expo/vector-icons";
import { hp, wp } from "../utils/ResponsiveLayout";
import { StatusBar } from "expo-status-bar";
import { Easing } from "react-native-reanimated";
import { MotiView } from "moti";
import PickerModal from "../components/PickerModal";
import { uploadFileApi } from "../utils/ApiHelper";
import Loader from "../components/Loader";
import { UploadResType, fileType } from "../utils/types";

const HomeScreen = () => {
    const [isPickerVisible, setIsPickerVisbile] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fileUploadRes, setFileUploadRes] = useState<UploadResType>();

    const [file, setFile] = useState<fileType>();

    const togglePicker = () => {
        setIsPickerVisbile(!isPickerVisible);
    };

    const uploadFile = async () => {
        setIsLoading(true);
        let res = await uploadFileApi(file.uri, file.name);
        if (res) {
            setFileUploadRes(res);
        }
    };


    useEffect(() => {
      // clear file response after modal is close
      if (!isLoading) {
        setFileUploadRes()
        setFile()
      }
    },[isLoading])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />

            <View style={styles.logoContainer}>
                <Feather name="send" size={54} color={COLORS.BLUE_COLOR} />
                <Text style={styles.logoText}>ShareMe</Text>
            </View>
            <Text style={styles.uploadText}>Upload your files</Text>
            <Text style={styles.uploadSubText}>Maximum file size - 2 GB</Text>
            <View style={styles.uploadView}>
                <Text style={styles.fileName}>{file?.name}</Text>
                {file && (
                    <Pressable
                        onPress={() => uploadFile()}
                        style={styles.uploadButton}
                    >
                        <Feather
                            name="upload"
                            size={wp(20)}
                            color={COLORS.WHITE_COLOR}
                        />
                        <Text style={styles.uploadButtonText}>Upload</Text>
                    </Pressable>
                )}
            </View>
            <View style={styles.noteContainer}>
                <Feather name="alert-triangle" size={wp(20)} color={"yellow"} />
                <Text numberOfLines={2} style={styles.alertText}>
                    Your file will be deleted after 1 download
                </Text>
            </View>
            <Text style={styles.browseText}>
                Browse and choose the file you want to upload
            </Text>
            <View style={styles.buttonContainer}>
                {(!isPickerVisible && !isLoading) &&
                    [...Array(3).keys()].map((index) => {
                        return (
                            <MotiView
                                from={{ opacity: 0.7, scale: 1 }}
                                animate={{ opacity: 0, scale: 2 }}
                                transition={{
                                    type: "timing",
                                    duration: 2000,
                                    easing: Easing.out(Easing.ease),
                                    loop: true,
                                    repeatReverse: false,
                                }}
                                key={index}
                                style={[
                                    StyleSheet.absoluteFillObject,
                                    styles.buttonStyle,
                                ]}
                            />
                        );
                    })}
                <Pressable
                    style={styles.buttonStyle}
                    onPress={() => togglePicker()}
                >
                    <Feather name="plus" size={wp(30)} color={"#fff"} />
                </Pressable>
            </View>

            <PickerModal
                visible={isPickerVisible}
                onPressCancel={() => setIsPickerVisbile(false)}
                onSelectItem={(item) => {
                    setFile(item);
                }}
            />
            <Loader isVisible={isLoading} fileRes={fileUploadRes} onLoaderClose={() => setIsLoading(false)} />
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BG_COLOR,
        alignItems: "center",
    },
    logoContainer: {
        marginVertical: hp(26),
        alignItems: "center",
    },
    logoText: {
        fontSize: wp(26),
        color: COLORS.BLUE_COLOR,
        fontWeight: "bold",
        letterSpacing: 2,
        fontFamily: FONTS.POPPINS_BOLD,
    },
    uploadText: {
        fontSize: wp(18),
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.BLUE_COLOR,
        marginTop: hp(20),
    },
    uploadSubText: {
        fontSize: wp(14),
        fontFamily: FONTS.POPPINS_REGULAR,
        color: "lightgrey",
        marginTop: hp(6),
    },
    uploadView: {
        marginVertical: hp(20),
        marginHorizontal: wp(26),
        height: wp(250),
        width: wp(250),
        borderRadius: 6,
        borderWidth: 6,
        borderStyle: "dashed",
        borderColor: COLORS.BLUE_COLOR,
        justifyContent: "center",
        alignItems: "center",
    },
    uploadButton: {
        paddingVertical: hp(12),
        paddingHorizontal: wp(18),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.BLUE_COLOR,
        flexDirection: "row",
        marginTop: hp(16),
        borderRadius: 8,
    },
    uploadButtonText: {
        fontSize: wp(18),
        fontFamily: FONTS.POPPINS_BOLD,
        color: COLORS.WHITE_COLOR,
        marginLeft: wp(8),
    },
    noteContainer: {
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 4,
        paddingVertical: 6,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    alertText: {
        marginLeft: wp(4),
        fontFamily: FONTS.POPPINS_REGULAR,
        color: "#fff",
        fontSize: wp(12),
    },
    browseText: {
        marginVertical: hp(20),
        fontSize: wp(20),
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.BLUE_COLOR,
        textAlign: "center",
        marginHorizontal: wp(26),
    },
    buttonStyle: {
        height: wp(60),
        width: wp(60),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.BLUE_COLOR,
        borderRadius: 60,
    },
    pulse: {
        backgroundColor: "red",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 60,
    },
    buttonContainer: {
        position: "absolute",
        bottom: hp(50),
        justifyContent: "center",
        alignItems: "center",
    },
    fileName: {
        textAlign: "center",
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.WHITE_COLOR,
        fontSize: wp(20),
        marginHorizontal: wp(6),
    },
});
