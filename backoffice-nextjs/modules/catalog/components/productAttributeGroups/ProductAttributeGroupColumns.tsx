"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductAttributeGroup } from "@/modules/catalog/models/ProductAttributeGroup";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteProductAttributeGroup } from "@/modules/catalog/services/ProductAttributeGroupService";
import { handleDeletingResponse } from "@/components/service/ResponseStatusHandlingService";
import { useQueryClient } from "@tanstack/react-query";
import { PRODUCT_ATTRIBUTE_GROUPS_URL } from "@/constants/Common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const productAttributeGroupColumns: ColumnDef<ProductAttributeGroup>[] =
  [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      id: "actions",
      cell: function ActionsCell({ row }) {
        const productAttributeGroup = row.original;
        const router = useRouter();
        const queryClient = useQueryClient();

        const handleEdit = () => {
          router.push(
            `${PRODUCT_ATTRIBUTE_GROUPS_URL}/${productAttributeGroup.id}`
          );
        };

        const handleDelete = async () => {
          if (productAttributeGroup.id) {
            deleteProductAttributeGroup(productAttributeGroup.id)
              .then((response) => {
                handleDeletingResponse(response, productAttributeGroup.name);
                queryClient.invalidateQueries({
                  queryKey: ["productAttributeGroups"],
                });
              })
              .catch((error) => {
                console.error("Error deleting product attribute group:", error);
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
