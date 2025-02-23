export type ProductAttribute = {
  id: number;
  name: string;
  productAttributeGroupId: number;
  productAttributeGroup?: {
    id: number;
    name: string;
  };
};
