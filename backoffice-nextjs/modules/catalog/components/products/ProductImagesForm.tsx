import { Label } from "@/components/ui/label";
import ChooseThumbnail from "./ChooseThumbnail";
import ChooseImages from "./ChooseImages";
import { ProductFormData } from "../../validations/ProductFormSchema";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<ProductFormData>;
};

const ProductImagesForm = ({ form }: Props) => {
  const { getValues, setValue } = form;
  const thumbnail = getValues("thumbnailMedia");
  const productImageMedias = getValues("productImageMedias");

  return (
    <div>
      <Label>Thumbnail</Label>
      <ChooseThumbnail
        id="thumbnail"
        image={thumbnail ? { id: +thumbnail.id, url: thumbnail.url } : null}
        setValue={setValue}
        name="thumbnailMedia"
      />
      <Label>Product Images</Label>
      <ChooseImages
        id="productImages"
        images={
          productImageMedias
            ? productImageMedias.map((image) => ({
                id: +image.id,
                url: image.url,
              }))
            : []
        }
        setValue={setValue}
        name="productImageMedias"
      />
    </div>
  );
};

export default ProductImagesForm;
