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
import React, { useState } from "react";
import { DataTablePagination } from "@/components/common/table/DataTablePagination";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER } from "@/constants/Common";
import { getPageableBrands } from "@/modules/catalog/services/BrandService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Brand } from "@/modules/catalog/models/Brand";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TableSkeleton from "@/components/common/table/TableSkeleton";

interface DataTableProps {
  columns: ColumnDef<Brand>[];
}

interface DataResponse {
  brandContent: Brand[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}

export function BrandDataTable({ columns }: DataTableProps) {
  const router = useRouter();
  const [pagination, setPagination] = useState({
    pageIndex: DEFAULT_PAGE_NUMBER, //initial page index
    pageSize: DEFAULT_PAGE_SIZE, //default page size
  });

  const fetchData = async ({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number;
    pageSize: number;
  }) => {
    return await getPageableBrands(pageIndex, pageSize).catch((error) => {
      console.error("Failed to fetch data", error);
      throw new Error("Failed to fetch data");
    });
  };

  const { data, isLoading, isError } = useQuery<DataResponse>({
    queryKey: ["brands", pagination],
    queryFn: () => fetchData(pagination),
    placeholderData: keepPreviousData,
  });

  const table = useReactTable({
    data: data?.brandContent || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: data?.totalElements || 0,
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    state: {
      pagination,
    },
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
            router.push("/catalog/brands/create");
          }}
        >
          Create brand
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

      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
