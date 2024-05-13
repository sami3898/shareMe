import axios from "axios";
import * as FileSystem from 'expo-file-system'

const BASE_URL = "https://file.io/";

export const uploadFileApi = async(fileUri: any, fileName: string) => {

    try {
      const form = new FormData();
      form.append("file", { name: fileName, uri: fileUri, type: 'image/jpeg'} as any);

      const res = await axios.post(BASE_URL, form, {
        onUploadProgress: ({ loaded, total }) => {
            // return progressEvent.loaded
            // console.log({ progressEvent })
            const progress = Math.round((loaded / total) * 100);
            console.log(`Upload Progress: ${progress}%`);
            // console.log("UPLOAD PROGRESS ", progressEvent.loaded)
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
        
      });

      return res.data;

      // console.log("API RES ", JSON.stringify(res.data));
    } catch (error) {
      console.log("Error ", JSON.stringify(error));
    }
    
}
