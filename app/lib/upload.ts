import packageData from "../../package.json";
import dataUriToBuffer from "@/app/lib/utils/data-uri-to-buffer";
import * as Bytescale from "@bytescale/sdk";

const UPLOAD_IO_ACCOUNT_ID = "12a1yt2";
const UPLOAD_IO_PUBLIC_API_KEY = "public_12a1yt28a4vroZEB8amjTX7JjMnk";

export default async function uploadFile(scribbleDataURI: string) {

    const uploadManager = new Bytescale.UploadManager({
        // fetchApi: nodeFetch,
        apiKey: UPLOAD_IO_PUBLIC_API_KEY
    });


    const { fileUrl } = await uploadManager.upload({
        data: dataUriToBuffer(scribbleDataURI),
        mime: "image/png",
        originalFileName: "scribble_input.png",
        path: {
            // See path variables: https://www.bytescale.com/docs/path-variables
            folderPath: `/uploads/${packageData.name}/${packageData.version}/{UTC_DATE}`,
            fileName: "{ORIGINAL_FILE_NAME}_{UNIQUE_DIGITS_8}{ORIGINAL_FILE_EXT}",
        },
        metadata: {
            userAgent: navigator.userAgent,
        },
    });

    return fileUrl;
}
