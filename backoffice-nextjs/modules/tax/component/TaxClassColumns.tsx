"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TaxClass } from "@/modules/tax/models/TaxClass";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { TAX_CLASS_URL } from "@/constants/Common";
import { deleteTaxClass } from "@/modules/tax/services/TaxClassService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleDeletingResponse } from "@/components/service/ResponseStatusHandlingService";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export const taxClassColumns: ColumnDef<TaxClass>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    cell: function ActionsCell({ row }) {
      const taxClass = row.original;
      const router = useRouter();
      const queryClient = useQueryClient();

      const handleEdit = () => {
        router.push(`${TAX_CLASS_URL}/${taxClass.id}`);
      };

      const handleDelete = async () => {
        if (taxClass.id) {
          deleteTaxClass(taxClass.id)
            .then((response) => {
              handleDeletingResponse(response, taxClass.name);
              //call refetch react query with key productOptions
              queryClient.invalidateQueries({ queryKey: ["taxClasses"] });
            })
            .catch((error) => {
              console.error("Error deleting tax class:", error);
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
