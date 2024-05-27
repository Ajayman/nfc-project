"use client";

import Image from "next/image";
import { UploadButton } from "../utils/uploadthing";
import { useState } from "react"
import { imageRemove } from "app/(auth)/admin/add/ImageRemove";


export default function ImageUpload({sendDataToParent}) {
  const [imageUrl, setImageUrl] = useState("")
  const [imageKey, setImageKey] = useState("")
  const handleRemove=async()=> {
    const res = await imageRemove(imageKey)
   if(res.success){
    alert("One File is removed from server");
   }
   setImageKey("")
   setImageUrl("")
  }
  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setImageUrl(res[0].url);
          setImageKey(res[0].key);
          sendDataToParent(imageUrl)
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <div>
        <h1>Image Preview</h1>
        {
          imageUrl && (
            <div>
              <Image src={imageUrl} alt="Image Upload" height={200} width={300} />
            </div>
          )
        }

        <div>
          <button onClick={handleRemove}>Remove Image</button>
        </div>
      </div>
    </div>
  )
}