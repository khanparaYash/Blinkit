import { v2 as cloudinary } from "cloudinary";

import streamifier from "streamifier";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
});

export const uploadImageClodinary = async (image) => {
  const buffer =image.buffer|| Buffer.from(await image.arrayBuffer());

  const uploadImage = await new Promise((resolve, reject) => {
    const stream=cloudinary.uploader.upload_stream(
      { folder: "blink" },
      (error, uploadResult) => {
        return resolve(uploadResult);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

  return uploadImage;
};
