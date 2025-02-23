"use client";

import { ColumnDef } from "@tanstack/react-table";
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
import { Category } from "@/modules/catalog/models/Category";
import Image from "next/image";
import { handleDeletingResponse } from "@/components/service/ResponseStatusHandlingService";
import { deleteCategory } from "../../services/CategoryService";
import { useQueryClient } from "@tanstack/react-query";
import { CATEGORIES_URL } from "@/constants/Common";
export const categoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "parentId",
    header: "Parent Category",
  },
  {
    accessorKey: "categoryImage.url",
    header: "Image",
    cell: function ImageCell({ row }) {
      const category = row.original;

      if (!category.categoryImage) {
        return <div>No image</div>;
      }

      return (
        <Image
          src={category.categoryImage?.url || ""}
          alt={category.name}
          width={100}
          height={100}
          priority
        />
      );
    },
  },
  {
    id: "actions",
    cell: function ActionsCell({ row }) {
      const category = row.original;
      const router = useRouter();
      const queryClient = useQueryClient();
      const handleEdit = () => {
        router.push(`${CATEGORIES_URL}/${category.id}`);
      };

      const handleDelete = () => {
        if (category.id) {
          deleteCategory(category.id)
            .then((response) => {
              handleDeletingResponse(response, category.name);
              queryClient.invalidateQueries({ queryKey: ["categories"] });
            })
            .catch((error) => {
              console.error("Error deleting category:", error);
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
