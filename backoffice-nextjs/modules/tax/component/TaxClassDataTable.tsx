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
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER, TAX_CLASS_URL } from "@/constants/Common";
import { useQuery } from "@tanstack/react-query";
import { TaxClass } from "@/modules/tax/models/TaxClass";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TableSkeleton from "@/components/common/table/TableSkeleton";
import { getPageableTaxClasses } from "@/modules/tax/services/TaxClassService";
interface DataResponse {
  taxClassContent: TaxClass[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}

interface DataTableProps {
  columns: ColumnDef<TaxClass>[];
}

export function TaxClassDataTable({ columns }: DataTableProps) {
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
    return await getPageableTaxClasses(pageIndex, pageSize).catch((error) => {
      console.error("Failed to fetch data", error);
      throw new Error("Failed to fetch data");
    });
  };

  const { data, isLoading, isError } = useQuery<DataResponse>({
    queryKey: ["taxClasses", pagination],
    queryFn: () => fetchData(pagination),
  });

  const table = useReactTable({
    data: data?.taxClassContent || [],
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
            router.push(TAX_CLASS_URL + "/create");
          }}
        >
          Create Tax Class
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
