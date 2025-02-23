"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { AutoComplete } from "@/components/common/AutoComplete";
import { getBrands } from "@/modules/catalog/services/BrandService";
import { Option } from "@/components/common/AutoComplete";
import { Switch } from "@/components/ui/switch";
import { getTaxClasses } from "@/modules/tax/services/TaxClassService";
import slugify from "slugify";
import { Input } from "@/components/ui/input";
import { ProductFormData } from "@/modules/catalog/validations/ProductFormSchema";
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  form: UseFormReturn<ProductFormData>;
  initialData?: ProductFormData;
};

const dimensionUnits = [
  {
    value: "CM",
    label: "Centimeter",
  },
  {
    value: "INCH",
    label: "Inch",
  },
];

const ProductGeneralInfoForm: React.FC<Props> = ({
  form,
  initialData,
}: Props) => {
  const [brands, setBrands] = useState<Option[]>([]);
  const [valueBrand, setValueBrand] = useState<Option>();
  const [taxClasses, setTaxClasses] = useState<Option[]>([]);
  const [valueTaxClass, setValueTaxClass] = useState<Option>();
  const [initialBrand, setInitialBrand] = useState<Option>();
  const [initialTaxClass, setInitialTaxClass] = useState<Option>();

  /*eslint-disable*/
  useEffect(() => {
    const fetchBrands = () => {
      getBrands().then((res) => {
        const brandOptions = res.map((brand) => ({
          value: brand.id.toString(),
          label: brand.name,
        }));
        setBrands(brandOptions);
        if (initialData) {
          brandOptions.forEach((brand) => {
            if (+brand.value === initialData.brandId) {
              setInitialBrand(brand);
            }
          });
        }
      });
    };

    const fetchTaxClasses = () => {
      getTaxClasses().then((res) => {
        const taxClassOptions = res.map((taxClass) => ({
          value: taxClass.id.toString(),
          label: taxClass.name,
        }));
        setTaxClasses(taxClassOptions);
        if (initialData) {
          setInitialTaxClass(
            taxClassOptions.find(
              (taxClass) => +taxClass.value === initialData.taxClassId
            )
          );
        }
      });
    };

    fetchBrands();
    fetchTaxClasses();
  }, []);

  const handleBrandChange = useCallback(
    (value: Option) => {
      setValueBrand(value);
      form.setValue("brandId", parseInt(value.value));
    },
    [form]
  );

  const handleTaxClassChange = useCallback(
    (value: Option) => {
      setValueTaxClass(value);
      form.setValue("taxClassId", parseInt(value.value));
    },
    [form]
  );

  const onNameChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const newSlug = slugify(event.target.value, {
        lower: true,
        strict: true,
      });
      form.setValue("slug", newSlug);
    },
    [form]
  );

  return (
    <>
      {/* Name Field */}
      <FormField
        control={form.control}
        name="name"
        render={() => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                {...form.register("name", {
                  onChange: onNameChange,
                })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Slug Field */}
      <FormField
        control={form.control}
        name="slug"
        render={() => (
          <FormItem>
            <FormLabel>Slug</FormLabel>
            <FormControl>
              <Input {...form.register("slug")} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* SKU Field */}
      <FormField
        control={form.control}
        name="sku"
        render={() => (
          <FormItem>
            <FormLabel>SKU</FormLabel>
            <FormControl>
              <Input {...form.register("sku")} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* GTIN Field */}
      <FormField
        control={form.control}
        name="gtin"
        render={() => (
          <FormItem>
            <FormLabel>GTIN</FormLabel>
            <FormControl>
              <Input {...form.register("gtin")} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Description Field */}
      <FormField
        control={form.control}
        name="description"
        render={() => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...form.register("description")} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Short Description Field */}
      <FormField
        control={form.control}
        name="shortDescription"
        render={() => (
          <FormItem>
            <FormLabel>Short Description</FormLabel>
            <FormControl>
              <Textarea {...form.register("shortDescription")} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Specification Field */}
      <FormField
        control={form.control}
        name="specification"
        render={() => (
          <FormItem>
            <FormLabel>Specification</FormLabel>
            <FormControl>
              <Textarea {...form.register("specification")} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Price Field */}
      <FormField
        control={form.control}
        name="price"
        render={() => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...form.register("price", { valueAsNumber: true })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Weight Field */}
      <FormField
        control={form.control}
        name="weight"
        render={() => (
          <FormItem>
            <FormLabel>Weight</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...form.register("weight", { valueAsNumber: true })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Dimension Unit Field */}
      <FormField
        control={form.control}
        name="dimensionUnit"
        render={() => (
          <FormItem>
            <FormLabel>Dimension Unit</FormLabel>
            <FormControl>
              <Select
                {...form.register("dimensionUnit")}
                onValueChange={(value) => form.setValue("dimensionUnit", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a dimension unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {dimensionUnits.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Length Field */}
      <FormField
        control={form.control}
        name="length"
        render={() => (
          <FormItem>
            <FormLabel>Length</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...form.register("length", { valueAsNumber: true })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Width Field */}
      <FormField
        control={form.control}
        name="width"
        render={() => (
          <FormItem>
            <FormLabel>Width</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...form.register("width", { valueAsNumber: true })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Height Field */}
      <FormField
        control={form.control}
        name="height"
        render={() => (
          <FormItem>
            <FormLabel>Height</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...form.register("height", { valueAsNumber: true })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Brand Field */}
      <FormField
        control={form.control}
        name="brandId"
        render={() => (
          <FormItem>
            <FormLabel>Brand</FormLabel>
            <FormControl>
              <AutoComplete
                options={brands}
                emptyMessage="No brands found"
                value={valueBrand}
                onValueChange={handleBrandChange}
                placeholder="Search for a brand"
                initialValue={initialBrand}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Is Allowed To Order Field */}
      <FormField
        control={form.control}
        name="isAllowedToOrder"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mr-2">Is Allowed To Order</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Is Published Field */}
      <FormField
        control={form.control}
        name="isPublished"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mr-2">Publish</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Is Featured Field */}
      <FormField
        control={form.control}
        name="isFeatured"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mr-2">Featured</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Is Visible Field */}
      <FormField
        control={form.control}
        name="isVisibleIndividually"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mr-2">Visible</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Stock Tracking Enabled Field */}
      <FormField
        control={form.control}
        name="stockTrackingEnabled"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mr-2">Stock Tracking Enabled</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Tax Class Field */}
      <FormField
        control={form.control}
        name="taxClassId"
        render={() => (
          <FormItem>
            <FormLabel className="mr-2">Tax Class</FormLabel>
            <FormControl>
              <AutoComplete
                options={taxClasses}
                emptyMessage="No tax classes found"
                value={valueTaxClass}
                onValueChange={handleTaxClassChange}
                placeholder="Search for a tax class"
                initialValue={initialTaxClass}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};

export default ProductGeneralInfoForm;
