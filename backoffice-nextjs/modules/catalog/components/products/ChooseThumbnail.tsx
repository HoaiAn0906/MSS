import clsx from "clsx";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { toast } from "react-toastify";

import { ProductFormData } from "@/modules/catalog/validations/ProductFormSchema";
import { ProductVariation } from "@/modules/catalog/validations/ProductVariationSchema";
import { uploadMedia } from "@/modules/catalog/services/MediaService";

import styles from "@/styles/ChooseImage.module.css";
import Image from "next/image";
import { RotateCcw, X } from "lucide-react";

type ChooseThumbnailProps = {
  id: string;
  image: Image | null;
  name: "thumbnailMedia" | "productVariations";
  setValue?: UseFormSetValue<ProductFormData>;
  variation?: ProductVariation;
  wrapperStyle?: React.CSSProperties;
  actionStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
};

type Image = {
  id: number;
  url: string;
};

export const isValidFile = (file: File, validTypes: string[]) => {
  return validTypes.indexOf(file.type) !== -1;
};

export const validTypes = ["image/jpeg", "image/png"];

export default function ChooseThumbnail({
  id,
  image,
  setValue,
  name,
  variation,
  wrapperStyle,
  actionStyle,
  iconStyle,
}: ChooseThumbnailProps) {
  const [thumbnailURL, setThumbnailURL] = useState<Image | null>(image);

  const onChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) {
      return;
    }

    const filesList = event.target.files;
    const isAllValidImages =
      filesList &&
      Array.from(filesList).every((file) => isValidFile(file, validTypes));

    if (!isAllValidImages) {
      toast.error("Please select an image file (jpg or png)");
      return;
    }

    try {
      const file = filesList[0];

      const response = await uploadMedia(filesList[0]);

      if (name === "thumbnailMedia") {
        setValue?.("thumbnailMedia", {
          id: response.id,
          url: URL.createObjectURL(file),
        });
      } else if (name === "productVariations" && variation) {
        variation.optionThumbnail = {
          id: response.id,
          url: URL.createObjectURL(file),
        };
      }

      setThumbnailURL({
        id: response.id,
        url: URL.createObjectURL(file),
      });
    } catch (error) {
      console.error(error);
      toast.error("Upload image failed");
    }
  };

  const onDeleteImage = () => {
    setThumbnailURL(null);
    if (name === "thumbnailMedia") {
      setValue?.("thumbnailMedia", undefined);
    } else if (name === "productVariations" && variation) {
      variation.optionThumbnail = undefined;
    }
  };

  return (
    <>
      {!thumbnailURL && (
        <label
          className={styles["image-label"]}
          htmlFor={id}
          style={wrapperStyle}
        >
          <div>Choose an thumbnail</div>
        </label>
      )}

      <input
        hidden
        type="file"
        id={id}
        onChange={(event) => onChangeImage(event)}
      />

      {thumbnailURL && (
        <div className={styles["product-image"]} style={wrapperStyle}>
          <div className={styles["actions"]} style={actionStyle}>
            <label className={styles["icon"]} htmlFor={id} style={iconStyle}>
              <RotateCcw />
            </label>

            <div
              onClick={onDeleteImage}
              className={clsx(styles["icon"], styles["delete"])}
              style={iconStyle}
            >
              <X />
            </div>
          </div>
          <Image
            width={100}
            height={100}
            src={thumbnailURL.url}
            alt="Thumbnail"
          />
        </div>
      )}
    </>
  );
}
