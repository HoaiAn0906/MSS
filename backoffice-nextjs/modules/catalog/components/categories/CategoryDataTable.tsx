"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import React from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TableSkeleton from "@/components/common/table/TableSkeleton";
import { Category } from "@/modules/catalog/models/Category";
import { getCategories } from "@/modules/catalog/services/CategoryService";

interface DataTableProps {
  columns: ColumnDef<Category>[];
}

interface DataResponse {
  categoryContent: Category[];
}

export function CategoryDataTable({ columns }: DataTableProps) {
  const router = useRouter();

  const fetchData = async (): Promise<DataResponse> => {
    const categories = await getCategories().catch((error) => {
      console.error("Failed to fetch data", error);
      throw new Error("Failed to fetch data");
    });

    return {
      categoryContent: categories,
    };
  };

  const { data, isLoading, isError } = useQuery<DataResponse>({
    queryKey: ["categories"],
    queryFn: () => fetchData(),
    placeholderData: keepPreviousData,
  });

  const table = useReactTable<Category>({
    data: data?.categoryContent || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading)
    return (
      <div>
        <TableSkeleton />
      </div>
    );
  if (isError) return <div>Error loading data.</div>;

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="w-1/2"
        />

        {/*button create brand*/}
        <Button
          className="btn btn-primary"
          onClick={() => {
            router.push("/catalog/categories/create");
          }}
        >
          Create category
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
