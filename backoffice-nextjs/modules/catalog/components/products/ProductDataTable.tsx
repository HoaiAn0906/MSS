"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Product } from "../../models/Product";
import { TableCell, TableHead, TableHeader } from "@/components/ui/table";
import { TableBody, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "@/components/common/table/DataTablePagination";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  PRODUCT_URL,
} from "@/constants/Common";
import { Button } from "@/components/ui/button";
import { flexRender } from "@tanstack/react-table";
import { getPageableProducts } from "../../services/ProductService";
import TableSkeleton from "@/components/common/table/TableSkeleton";

interface DataTableProps {
  columns: ColumnDef<Product>[];
}

interface DataResponse {
  productContent: Product[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}

export function ProductDataTable({ columns }: DataTableProps) {
  const router = useRouter();
  const [pagination, setPagination] = useState({
    pageIndex: DEFAULT_PAGE_NUMBER,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const fetchData = async ({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number;
    pageSize: number;
  }) => {
    return await getPageableProducts(pageIndex, pageSize, "", "").catch(
      (error) => {
        console.error("Failed to fetch data", error);
        throw new Error("Failed to fetch data");
      }
    );
  };

  const { data, isLoading, isError } = useQuery<DataResponse>({
    queryKey: ["products", pagination],
    queryFn: () => fetchData(pagination),
    placeholderData: keepPreviousData,
  });

  const table = useReactTable({
    data: data?.productContent || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: data?.totalElements || 0,
    onPaginationChange: setPagination,
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

        {/*button create product option*/}
        <Button
          className="btn btn-primary"
          onClick={() => {
            router.push(PRODUCT_URL + "/create");
          }}
        >
          Create Product Option
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
