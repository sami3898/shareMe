import axios from "axios";
import { Alert } from "react-native";

const BASE_URL = "https://file.io/";

export const uploadFileApi = async(fileUri: any, fileName: string) => {

    try {
      const form = new FormData();
      form.append("file", { name: fileName, uri: fileUri, type: 'image/jpeg'} as any);

      const res = await axios.post(BASE_URL, form, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
        
      });

      return res.data;
    } catch (error) {
      Alert.alert("Error", error?.response?.data)
    }
    
}
