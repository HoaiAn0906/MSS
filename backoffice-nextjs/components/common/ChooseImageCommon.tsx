import clsx from "clsx";
import Image from "next/image";
import styles from "../../styles/ChooseImage.module.css";
import { RotateCcw, X } from "lucide-react";

type ChooseImageCommonProps = {
  id: string;
  iconStyle?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  actionStyle?: React.CSSProperties;
  url: string;
  onDeleteImage: React.MouseEventHandler;
};

type Image = {
  id: number;
  url: string;
};

const ChooseImageCommon = ({
  id,
  iconStyle,
  wrapperStyle,
  actionStyle,
  url,
  onDeleteImage,
}: ChooseImageCommonProps) => {
  return (
    <>
      <div style={wrapperStyle} className={styles["product-image"]}>
        <div style={actionStyle} className={styles["actions"]}>
          <label htmlFor={id} className={styles["icon"]} style={iconStyle}>
            <RotateCcw />
          </label>

          <div
            style={iconStyle}
            className={clsx(styles["icon"], styles["delete"])}
            onClick={onDeleteImage}
          >
            <X />
          </div>
        </div>
        <Image width={100} height={100} src={url} alt="image" priority />
      </div>
    </>
  );
};

export default ChooseImageCommon;
