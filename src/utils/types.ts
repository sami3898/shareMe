export interface UploadResType {
    autoDelete:      boolean;
    created:         string;
    description:     null;
    downloads:       number;
    expires:         string;
    id:              string;
    key:             string;
    link:            string;
    maxDownloads:    number;
    mimeType:        string;
    modified:        string;
    name:            string;
    nodeType:        string;
    path:            string;
    planId:          number;
    private:         boolean;
    screeningStatus: string;
    size:            number;
    status:          number;
    success:         boolean;
    title:           null;


}

export type fileType = {
    name: string,
    size: number,
    type: string,
    uri: string
  }