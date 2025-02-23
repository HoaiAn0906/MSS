"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Brand } from "@/modules/catalog/models/Brand";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { deleteBrand } from "@/modules/catalog/services/BrandService";
import { handleDeletingResponse } from "@/components/service/ResponseStatusHandlingService";
import { useQueryClient } from "@tanstack/react-query";
import { BRAND_URL } from "@/constants/Common";

export const brandColumns: ColumnDef<Brand>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "isPublish",
    header: "Publish",
  },
  {
    id: "actions",
    cell: function ActionsCell({ row }) {
      const brand = row.original;
      const router = useRouter();
      const queryClient = useQueryClient();

      const handleEdit = () => {
        router.push(`${BRAND_URL}/${brand.id}`);
      };

      const handleDelete = () => {
        if (brand.id) {
          deleteBrand(brand.id)
            .then((response) => {
              handleDeletingResponse(response, brand.name);
              queryClient.invalidateQueries({ queryKey: ["brands"] });
            })
            .catch((error) => {
              console.error("Error deleting brand:", error);
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
