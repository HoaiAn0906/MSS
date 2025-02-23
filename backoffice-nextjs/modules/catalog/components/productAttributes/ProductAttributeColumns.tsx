"use client";

import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { ProductAttribute } from "@/modules/catalog/models/ProductAttribute";
import { ColumnDef } from "@tanstack/react-table";
import { PRODUCT_ATTRIBUTE_URL } from "@/constants/Common";
import { deleteProductAttribute } from "@/modules/catalog/services/ProductAttributeService";
import { handleDeletingResponse } from "@/components/service/ResponseStatusHandlingService";
import { useQueryClient } from "@tanstack/react-query";

export const productAttributeColumns: ColumnDef<ProductAttribute>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "productAttributeGroup",
    header: "Product Attribute Group",
    cell: ({ row }) => {
      const productAttributeGroup = row.original.productAttributeGroup;
      return productAttributeGroup ? productAttributeGroup : "None";
    },
  },
  {
    id: "actions",
    cell: function ActionsCell({ row }) {
      const productAttribute = row.original;
      const router = useRouter();
      const queryClient = useQueryClient();

      const handleEdit = () => {
        router.push(`${PRODUCT_ATTRIBUTE_URL}/${productAttribute.id}`);
      };

      const handleDelete = async () => {
        if (productAttribute.id) {
          deleteProductAttribute(productAttribute.id)
            .then((response) => {
              handleDeletingResponse(response, productAttribute.name);
              queryClient.invalidateQueries({
                queryKey: ["productAttributes"],
              });
            })
            .catch((error) => {
              console.error("Error deleting product attribute:", error);
            });
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
