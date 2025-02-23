import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { ProductFormData } from "@/modules/catalog/validations/ProductFormSchema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGeneralInfoForm from "./ProductGeneralInfoForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema } from "@/modules/catalog/validations/ProductFormSchema";
import ProductVariationsForm from "./ProductVariationsForm";
import ProductImagesForm from "./ProductImagesForm";

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: SubmitHandler<ProductFormData>;
  formRef?: React.Ref<HTMLFormElement>;
}

const tabs = [
  {
    label: "General Info",
    value: "general-info",
    component: ProductGeneralInfoForm,
  },
  {
    label: "Product Variations",
    value: "product-variations",
    component: ProductVariationsForm,
  },
  {
    label: "Product Images",
    value: "product-images",
    component: ProductImagesForm,
  },
  // {
  //   label: "Attributes",
  //   value: "attributes",
  // },
  // {
  //   label: "Category Mapping",
  //   value: "category-mapping",
  // },
  // {
  //   label: "Related Products",
  //   value: "related-products",
  // },
  // {
  //   label: "Cross-Sell Products",
  //   value: "cross-sell-products",
  // },
  // {
  //   label: "SEO",
  //   value: "seo",
  // },
];

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  formRef,
}) => {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialData || {
      isVisibleIndividually: true,
      isPublished: true,
      isAllowedToOrder: true,
      productOptionValueDisplays: [],
      productOptionValues: [],
      variations: [],
    },
  });

  const onSubmitTest = (data: ProductFormData) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...form}>
      <Tabs defaultValue="general-info">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.component && (
              <form ref={formRef} onSubmit={form.handleSubmit(onSubmitTest)}>
                <tab.component form={form} initialData={initialData} />
              </form>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </FormProvider>
  );
};

export default ProductForm;
