import { Label } from "@/components/ui/label";
import { AutoComplete } from "@/components/common/AutoComplete";
import { useEffect, useMemo, useState } from "react";
import { Option } from "@/components/common/AutoComplete";
import { getProductOptions } from "../../services/ProductOptionService";
import { Button } from "@/components/ui/button";
import CustomOptionInput from "./CustomOptionInput";
import { toast } from "react-toastify";
import { UseFormReturn } from "react-hook-form";
import { ProductFormData } from "../../validations/ProductFormSchema";
import { ProductOptionValuePost } from "../../validations/ProductOptionValuePostSchema";
import { ProductOptionFormData } from "@/modules/catalog/validations/ProductOptionSchema";
import { ProductVariation } from "../../validations/ProductVariationSchema";
import ProductVariant from "./ProductVariant";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import { getVariationsByProductId } from "@/modules/catalog/services/ProductService";
import { getProductOptionValueByProductId } from "@/modules/catalog/services/ProductService";
import DisplayTypeModal from "./DisplayTypeModal";

type Props = {
  form: UseFormReturn<ProductFormData>;
};

type SelectedOptionValue = {
  id: string;
  name: string;
  value?: string;
};

const ProductVariationsForm = ({ form }: Props) => {
  const { id } = useParams();
  const [productOptions, setProductOptions] = useState<Option[]>([]);
  const [valueProductOption, setValueProductOption] = useState<Option>();
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionValue[]>(
    []
  );
  const [optionCombines, setOptionCombines] = useState<string[]>([]);
  const [customOptionInputValues, setCustomOptionInputValues] = useState<
    Record<string, string[]>
  >({});
  const [productOptionValuePost, setProductOptionValuePost] = useState<
    ProductOptionValuePost[]
  >([]);
  const [currentModelOption, setCurrentModelOption] =
    useState<ProductOptionFormData | null>(null);
  const [showDisplayStyleModel, setShowDisplayStyleModel] = useState(false);

  const listVariant = useMemo(() => {
    return form.getValues("productVariations") || [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionCombines]);

  const handleProductOptionChange = (value: Option) => {
    setValueProductOption(value);
  };

  useEffect(() => {
    getProductOptions().then((res) => {
      const productOptionOptions = res.map((productOption) => ({
        value: productOption?.id?.toString() || "",
        label: productOption?.name || "",
      }));
      setProductOptions(productOptionOptions);
    });
  }, []);

  const onAddOption = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!valueProductOption) {
      toast.info("Select options first");
    } else {
      const index = selectedOptions.find(
        (t) => t.name === valueProductOption.label
      );
      if (!index) {
        const newOption: SelectedOptionValue = {
          id: valueProductOption.value,
          name: valueProductOption.label,
        };
        setSelectedOptions([...selectedOptions, newOption]);
      } else {
        toast.info(`${valueProductOption.label} is selected. Select Other`);
      }
    }
  };

  const onDeleteOption = (
    event: React.MouseEvent<HTMLElement>,
    name: string
  ) => {
    event.preventDefault();
    setSelectedOptions(
      selectedOptions.filter((option) => option.name !== name)
    );
  };

  const handleCustomOptionInputChange = (
    optionName: string,
    value: string[]
  ) => {
    setCustomOptionInputValues((prevValues) => ({
      ...prevValues,
      [optionName]: value,
    }));
    updateProductOptionValue(optionName, value);
  };

  const updateProductOptionValue = (
    optionName: string,
    optionValues: string[]
  ) => {
    const productOption = productOptions.find(
      (productOption) => productOption.label === optionName
    );
    setProductOptionValuePost((productOptions) => {
      const currentOptions = [...productOptions];
      const index = currentOptions.findIndex(
        (t) =>
          t.productOptionId ===
          (productOption?.value !== undefined ? +productOption.value : null)
      );
      if (index !== -1) {
        // Update the existing entry
        const existingValue = currentOptions[index].value;
        const updatedValue: Record<string, string> = {};
        // Loop through option values to create a new value object
        optionValues.forEach((optionValue) => {
          updatedValue[optionValue] = existingValue[optionValue] || "#000000";
        });
        currentOptions[index] = {
          ...currentOptions[index],
          value: updatedValue,
        };
      } else {
        // Create a new entry if it doesn't exist
        const newProductOptionValuePost: ProductOptionValuePost = {
          productOptionId: productOption?.value
            ? +productOption.value
            : undefined,
          displayOrder: 1,
          displayType: "text",
          value: optionValues.reduce((acc, optionValue) => {
            acc[optionValue] = "#000000";
            return acc;
          }, {} as Record<string, string>),
        };
        currentOptions.push(newProductOptionValuePost);
      }
      form.setValue("productOptionValuePost", currentOptions);
      return currentOptions;
    });
  };

  const openSelectOptionModel = (
    event: React.MouseEvent<HTMLElement>,
    option: string
  ) => {
    event.preventDefault();
    const optionValues = customOptionInputValues[option];
    if (!optionValues || optionValues.length === 0) {
      return toast.warning("Please insert option value");
    }
    const productOption = productOptions.find(
      (productOption) => productOption.label === option
    );
    updateProductOptionValue(option, optionValues);
    setCurrentModelOption({
      id:
        productOption?.value !== undefined ? Number(productOption.value) : null,
      name: productOption?.label ?? "",
    });
    setShowDisplayStyleModel(true);
  };

  const onGenerate = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const formProductVariations = form.getValues("productVariations") || [];
    const optionValuesByOptionIds = generateDistinctProductOptionCombinations();
    const productOptionValues = generateProductOptionValue();

    if (optionValuesByOptionIds.length === 0) {
      return toast.warn("Please Input Values Option");
    }
    optionValuesByOptionIds.forEach((optionValuesByOptionId) => {
      const productName = form.getValues("name");
      const variationName = [
        productName,
        ...Array.from(optionValuesByOptionId.values()),
      ]
        .join(" ")
        .trim();

      const checkVariationName = formProductVariations.some(
        (variation) => variation.optionName == variationName
      );

      if (checkVariationName) {
        return toast.warning("Combined Option Values are Duplicated");
      }

      const newVariation: ProductVariation = {
        optionName: variationName,
        optionGTin: form.getValues("gtin") ?? "",
        optionSku: form.getValues("sku") ?? "",
        optionPrice: form.getValues("price") ?? 0,
        optionValuesByOptionId: Object.fromEntries(optionValuesByOptionId),
      };
      setOptionCombines([variationName]);
      form.setValue("productVariations", [
        ...formProductVariations,
        newVariation,
      ]);
      formProductVariations.push(newVariation);
    });
    form.setValue("productOptionValuePost", productOptionValues);
  };

  const generateDistinctProductOptionCombinations = (): Array<
    Map<number, string>
  > => {
    const optionValuesArray = generateProductOptionCombinations();
    if (optionValuesArray.length === 0) {
      return [];
    }

    // Group values by option ID
    const groupedByOptionId: Map<number, string[]> = new Map();

    optionValuesArray.forEach((optionMap) => {
      optionMap.forEach((value, key) => {
        if (!groupedByOptionId.has(key)) {
          groupedByOptionId.set(key, []);
        }
        const existingValues = groupedByOptionId.get(key)!;
        if (!existingValues.includes(value)) {
          existingValues.push(value);
        }
      });
    });

    // Get all unique keys (option IDs)
    const optionIds = Array.from(groupedByOptionId.keys());

    // Generate all combinations using recursive helper function
    const combine = (
      index: number,
      currentCombination: Map<number, string>
    ): Array<Map<number, string>> => {
      if (index === optionIds.length) {
        return [new Map(currentCombination)];
      }

      const id = optionIds[index];
      const values = groupedByOptionId.get(id)!;
      const combinations: Array<Map<number, string>> = [];

      values.forEach((value) => {
        currentCombination.set(id, value);
        combinations.push(...combine(index + 1, currentCombination));
        currentCombination.delete(id);
      });

      return combinations;
    };

    return combine(0, new Map());
  };

  const generateProductOptionCombinations = (): Array<Map<number, string>> => {
    const optionValuesArray: Array<Map<number, string>> = [];
    let isEmptyOptions = false;

    selectedOptions.forEach((option) => {
      if (isEmptyOptions) return;
      const optionValues = customOptionInputValues[option.name];
      if (optionValues.length === 0) {
        isEmptyOptions = true;
        return;
      }
      updateOptionValuesForCombinations(
        optionValues,
        option.name,
        optionValuesArray
      );
    });

    return isEmptyOptions ? [] : optionValuesArray;
  };

  const updateOptionValuesForCombinations = (
    optionValues: string[],
    optionName: string,
    optionValuesArray: Array<Map<number, string>>
  ) => {
    const productOption = productOptions.find(
      (productOption) => productOption.label === optionName
    );
    const productOptionId = productOption?.value ?? -1;

    optionValues.forEach((value) => {
      const optionMap = new Map<number, string>();
      optionMap.set(+productOptionId, value);
      optionValuesArray.push(optionMap);
    });
  };

  const generateProductOptionValue = (): ProductOptionValuePost[] => {
    const result = productOptionValuePost;
    let isEmptyOptions = false;
    selectedOptions.forEach((option) => {
      if (isEmptyOptions) return;
      const optionValues = customOptionInputValues[option.name];
      if (optionValues.length === 0) {
        isEmptyOptions = true;
        return;
      }
      updateAllOptionValues(optionValues, option.name, result);
    });
    return result;
  };

  const updateAllOptionValues = (
    optionValues: string[],
    optionName: string,
    result: ProductOptionValuePost[]
  ) => {
    const productOption = productOptions.find(
      (productOption) => productOption.label === optionName
    );
    const productOptionId = productOption?.value ? +productOption.value : -1;
    optionValues.forEach((value) => {
      const productOptionValue = productOptionValuePost.find(
        (t) => t.productOptionId === +productOptionId
      );

      if (!productOptionValue) {
        result.push({
          productOptionId: productOptionId,
          value: { [`${value}`]: "#000000" },
          displayType: "text",
          displayOrder: 1,
        });
      } else {
        if (!(value in productOptionValue.value)) {
          productOptionValue.value = {
            ...productOptionValue.value,
            [`${value}`]: "#000000",
          };
        }
      }
    });
  };

  const onDeleteVariation = (variant: ProductVariation) => {
    const result = optionCombines.filter(
      (optionName) => optionName !== variant.optionName
    );
    setOptionCombines(result);

    let productVar = form.getValues("productVariations") || [];
    productVar = productVar.filter(
      (item) => item.optionName !== variant.optionName
    );
    form.setValue("productVariations", productVar);
  };

  useEffect(() => {
    if (id) {
      loadExistingVariant(+id);
      loadExistingProductOptionValue(+id);
    }
  }, [id]);

  const loadExistingVariant = (id: number) => {
    getVariationsByProductId(id).then((results) => {
      if (results) {
        const listOptionCombine: string[] = [];
        const productVariants: ProductVariation[] = [];
        results.forEach((item) => {
          listOptionCombine.push(item.name || "");
          productVariants.push({
            id: item.id,
            optionName: item.name || "",
            optionGTin: item.gtin || "",
            optionSku: item.sku || "",
            optionPrice: item.price || 0,
            optionThumbnail: item.thumbnail,
            optionImages: item.productImages,
            optionValuesByOptionId: item.options,
          });
        });

        setOptionCombines(listOptionCombine);
        form.setValue("productVariations", productVariants);
      }
    });
  };

  const loadExistingProductOptionValue = (id: number) => {
    getProductOptionValueByProductId(id).then((results) => {
      if (results) {
        const productOptionValuePosts: ProductOptionValuePost[] = [];
        results.forEach((item) => {
          productOptionValuePosts.push({
            productOptionId: item.productOptionId,
            displayType: item.displayType ?? "text",
            displayOrder: item.displayOrder ?? 0,
            value: item.productOptionValue
              ? JSON.parse(item.productOptionValue)
              : {},
          });

          updateSelectedOptions(item);
          updateCustomOptionInputValues(item);
        });
        form.setValue("productOptionValuePost", productOptionValuePosts);
        setProductOptionValuePost(productOptionValuePosts);
      }
    });
  };

  /*eslint-disable */
  const updateSelectedOptions = (item: any) => {
    setSelectedOptions((prevSelectedOptions) => {
      const option: SelectedOptionValue = {
        id: item.productOptionId ? item.productOptionId : 0,
        name: item.productOptionName ? item.productOptionName : "",
        value: item
          ? Object.keys(JSON.parse(item.productOptionValue)).join(",")
          : "",
      };

      if (!prevSelectedOptions.find((t) => t.name === option.name)) {
        return [...prevSelectedOptions, option];
      }
      return prevSelectedOptions;
    });
  };

  const updateCustomOptionInputValues = (item: any) => {
    setCustomOptionInputValues((prevInputValues) => {
      const newValues = item.productOptionValue
        ? Object.keys(JSON.parse(item.productOptionValue))
            .join(",")
            .split(",")
            .map((v) => v.trim())
        : [];
      return {
        ...prevInputValues,
        [item.productOptionName ?? ""]: [
          ...(prevInputValues[item.productOptionName ?? ""] || []),
          ...newValues,
        ],
      };
    });
  };

  const handleCloseDisplayModel = () => setShowDisplayStyleModel(false);

  const handleColorChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    optionValueKey: string
  ) => {
    event.preventDefault();
    const displayColor = event.target.value;
    setProductOptionValuePost((preProductOptionValuePost) => {
      let updatedProductOptionValuePost;
      const existingProductOptionValuePost = preProductOptionValuePost.find(
        (t) => t.productOptionId === currentModelOption?.id
      );
      if (existingProductOptionValuePost) {
        updatedProductOptionValuePost = preProductOptionValuePost.map((post) =>
          post.productOptionId === currentModelOption?.id
            ? {
                ...post,
                value: { ...post.value, [optionValueKey]: displayColor },
              }
            : post
        );
      } else {
        updatedProductOptionValuePost = [
          ...preProductOptionValuePost,
          {
            productOptionId: currentModelOption?.id
              ? Number(currentModelOption.id)
              : undefined,
            displayType: "text",
            displayOrder: 1,
            value: { [optionValueKey]: displayColor },
          },
        ];
      }
      form.setValue("productOptionValuePost", updatedProductOptionValuePost);
      return updatedProductOptionValuePost;
    });
  };

  const handleChangeDisplayType = (type: string) => {
    setProductOptionValuePost((prevProductOptionValuePost) => {
      const updatedPosts = prevProductOptionValuePost.map((post) => {
        if (post.productOptionId === currentModelOption?.id) {
          return { ...post, displayType: type };
        }
        return post;
      });
      form.setValue("productOptionValuePost", updatedPosts);
      return updatedPosts;
    });
  };

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <Label className="w-40">Available Options</Label>
        <AutoComplete
          options={productOptions}
          emptyMessage="No product options found"
          value={valueProductOption}
          onValueChange={handleProductOptionChange}
          placeholder="Search for a product option"
        />
        <Button
          type="button"
          onClick={onAddOption}
          style={{ marginLeft: "12px" }}
        >
          Add Option
        </Button>
      </div>
      {selectedOptions.length > 0 && (
        <>
          <div className="text-xl font-bold my-3">Value Options:</div>
          <div>
            {(selectedOptions || []).map((option) => (
              <div key={option.id} className="mb-3 flex gap-4 items-center">
                <label
                  className="block text-sm font-medium text-gray-700 flex-grow flex flex-col items-center"
                  htmlFor={option.name}
                >
                  {option.name}
                </label>
                <CustomOptionInput
                  defaultValue={option.value}
                  onChange={(value) =>
                    handleCustomOptionInputChange(option.name, value)
                  }
                  productVariations={listVariant}
                />
                <Button
                  className="py-0"
                  variant="outline"
                  onClick={(event) => openSelectOptionModel(event, option.name)}
                >
                  Display Style
                </Button>
                <DisplayTypeModal
                  show={showDisplayStyleModel}
                  handleCloseModel={handleCloseDisplayModel}
                  handleColorChange={handleColorChange}
                  currentModelOption={currentModelOption}
                  productOptionValuePost={productOptionValuePost}
                  setDisplayType={handleChangeDisplayType}
                />
                <Button
                  variant="destructive"
                  onClick={(event) => onDeleteOption(event, option.name)}
                >
                  <X />
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="text-center">
        <Button onClick={onGenerate}>Generate Combine</Button>
      </div>

      {/* Product variations */}
      {listVariant.length > 0 && (
        <div className="mb-3">
          <h5 className="mb-3">Product Variations</h5>

          {listVariant.map((variant, index) => (
            <ProductVariant
              key={variant.optionName}
              index={index}
              variant={variant}
              onDelete={onDeleteVariation}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductVariationsForm;
