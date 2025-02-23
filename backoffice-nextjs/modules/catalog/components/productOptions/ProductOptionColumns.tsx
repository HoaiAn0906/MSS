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
import { ProductOption } from "@/modules/catalog/models/ProductOption";
import { ColumnDef } from "@tanstack/react-table";
import { PRODUCT_OPTIONS_URL } from "@/constants/Common";
import { deleteProductOption } from "@/modules/catalog/services/ProductOptionService";
import { handleDeletingResponse } from "@/components/service/ResponseStatusHandlingService";
import { useQueryClient } from "@tanstack/react-query";
export const productOptionColumns: ColumnDef<ProductOption>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: function ActionsCell({ row }) {
      const productOption = row.original;
      const router = useRouter();
      const queryClient = useQueryClient();

      const handleEdit = () => {
        router.push(`${PRODUCT_OPTIONS_URL}/${productOption.id}`);
      };

      const handleDelete = async () => {
        if (productOption.id) {
          deleteProductOption(productOption.id)
            .then((response) => {
              handleDeletingResponse(response, productOption.name);
              //call refetch react query with key productOptions
              queryClient.invalidateQueries({ queryKey: ["productOptions"] });
            })
            .catch((error) => {
              console.error("Error deleting product option:", error);
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
