import { X } from "lucide-react";
import { useState } from "react";
import ConfirmationDialog from "@/components/common/ConfirmationDialog";
import { ProductVariation } from "@/modules/catalog/validations/ProductVariationSchema";
import ChooseImages from "@/modules/catalog/components/products/ChooseImages";
import ChooseThumbnail from "@/modules/catalog/components/products/ChooseThumbnail";
import { deleteProduct } from "@/modules/catalog/services/ProductService";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import styles from "@/styles/ProductVariant.module.css";
type ProductVariantProps = {
  index: number;
  variant: ProductVariation;
  onDelete: (variant: ProductVariation) => void;
};

export default function ProductVariant({
  variant,
  index,
  onDelete,
}: ProductVariantProps) {
  const [isOpenRemoveDialog, setIsOpenRemoveDialog] = useState<boolean>(false);

  const deleteVariation = () => {
    if (variant.id) {
      setIsOpenRemoveDialog(true);
    } else {
      onDelete(variant);
    }
  };

  const deleteExistingVariation = () => {
    deleteProduct(variant.id!).then(() => onDelete(variant));
  };

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    switch (event.target.name) {
      case "optionSku":
        variant.optionSku = value;
        break;
      case "optionGtin":
        variant.optionGTin = value;
        break;
      case "optionPrice":
        variant.optionPrice = +value;
        break;
      default:
        return;
    }
  };

  return (
    <div className={styles["product-variant"]}>
      <span
        className={styles["delete-button"]}
        onClick={() => deleteVariation()}
      >
        <X />
      </span>
      <div className="flex">
        <div className="pr-3">
          <ChooseThumbnail
            id={`sub-thumbnail-${index}`}
            image={
              variant.optionThumbnail
                ? {
                    id: variant.optionThumbnail.id,
                    url: variant.optionThumbnail.url,
                  }
                : null
            }
            name="productVariations"
            variation={variant}
            wrapperStyle={{
              width: "120px",
              height: "150px",
            }}
            iconStyle={{
              fontSize: "12px",
              width: "20px",
              height: "20px",
            }}
            actionStyle={{
              top: "-10px",
              right: "-8px",
            }}
          />
        </div>
        <div className="flex-grow flex flex-col gap-2">
          <div className="flex gap-4">
            <div className="w-1/2">
              <Label className="font-bold">Name</Label>
              <Input
                type="text"
                className="w-full"
                readOnly
                value={variant.optionName}
                disabled
              />
            </div>
            <div className="w-1/2">
              <Label className="font-bold">
                Price (<span className="text-red-500">*</span>)
              </Label>
              <Input
                type="number"
                min={1}
                className="w-full"
                name="optionPrice"
                defaultValue={variant.optionPrice}
                onChange={onChangeValue}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <Label className="font-bold">GTIN</Label>
              <Input
                type="text"
                className="w-full"
                name="optionGtin"
                defaultValue={variant.optionGTin}
                onChange={onChangeValue}
              />
            </div>
            <div className="w-1/2">
              <Label className="font-bold">SKU</Label>
              <Input
                type="text"
                className="w-full"
                name="optionSku"
                defaultValue={variant.optionSku}
                onChange={onChangeValue}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mt-3">
        <ChooseImages
          id={`sub-images-${index}`}
          images={variant.optionImages || []}
          name="productVariations"
          variation={variant}
          wrapperStyle={{
            width: "100px",
            height: "100px",
            fontSize: "12px",
          }}
          iconStyle={{
            fontSize: "12px",
            width: "20px",
            height: "20px",
          }}
          actionStyle={{
            top: "-12px",
            right: "-8px",
          }}
        />
      </div>
      <ConfirmationDialog
        isOpen={isOpenRemoveDialog}
        okText="Yes"
        cancelText="No"
        cancel={() => setIsOpenRemoveDialog(false)}
        ok={() => deleteExistingVariation()}
      >
        Do you want to remove variant {variant.optionName} ?
      </ConfirmationDialog>
    </div>
  );
}
