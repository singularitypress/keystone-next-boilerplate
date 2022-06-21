import { list } from "@keystone-6/core";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import dotenv from "dotenv";
import { text } from "@keystone-6/core/fields";

dotenv.config();

export const Hero = list({
  fields: {
    title: text({ validation: { isRequired: true } }),
    subTitle: text(),
    ctaText: text(),
    ctaURL: text(),
    slug: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    bgLight: cloudinaryImage({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        apiKey: process.env.CLOUDINARY_API_KEY ?? "",
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
        folder: process.env.CLOUDINARY_API_FOLDER,
      },
    }),
    bgDark: cloudinaryImage({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        apiKey: process.env.CLOUDINARY_API_KEY ?? "",
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
        folder: process.env.CLOUDINARY_API_FOLDER,
      },
    }),
  },
});
