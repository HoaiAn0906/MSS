"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/modules/catalog/models/Product";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { PRODUCT_URL } from "@/constants/Common";
import { useRouter } from "next/navigation";
export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isFeatured",
    header: "Is Featured",
  },
  {
    accessorKey: "isAllowedToOrder",
    header: "Is Allowed To Order",
  },
  {
    accessorKey: "isPublished",
    header: "Is Published",
  },
  {
    accessorKey: "createdOn",
    header: "Created Date",
  },
  {
    id: "actions",
    cell: function ActionsCell({ row }) {
      const router = useRouter();
      const product = row.original;

      const handleEdit = () => {
        router.push(`${PRODUCT_URL}/${product.id}`);
      };

      const handleDelete = async () => {
        // todo
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
