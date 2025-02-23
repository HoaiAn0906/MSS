import ChooseImageCommon from "@/components/common/ChooseImageCommon";
import { UseFormSetValue } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "@/styles/ChooseImage.module.css";
import { uploadMedia } from "@/modules/catalog/services/MediaService";
import {
  isValidFile,
  validTypes,
} from "@/modules/catalog/components/ChooseThumbnail";
import { CategoryFormData } from "@/modules/catalog/validations/CategorySchema";

type CategoryImageProps = {
  id: string;
  image: Image | null;
  setValue: UseFormSetValue<CategoryFormData>;
};

type Image = {
  id: number;
  url: string;
};

const CategoryImage = ({ id, image, setValue }: CategoryImageProps) => {
  const [imageURL, setImageURL] = useState<Image | null>(image);
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
      const response = await uploadMedia(file);
      const url = URL.createObjectURL(file);
      setValue?.("imageId", response.id);
      setImageURL({
        id: response.id,
        url: url,
      });
    } catch (e) {
      console.log(e);
      toast.error("Upload image failed");
    }
  };

  const onDeleteImage = () => {
    setImageURL(null);
    setValue("categoryImage", undefined);
    setValue("imageId", null);
  };

  return (
    <>
      {!imageURL && (
        <div className="mb-3">
          <label className={styles["image-label"]} htmlFor={id}>
            Choose category image
          </label>
        </div>
      )}

      <input
        hidden
        type="file"
        multiple
        id={id}
        onChange={(event) => onChangeImage(event)}
      />
      {imageURL && (
        <div className="mb-3">
          <ChooseImageCommon
            id={id}
            url={imageURL.url}
            onDeleteImage={onDeleteImage}
          />
        </div>
      )}
    </>
  );
};

export default CategoryImage;
