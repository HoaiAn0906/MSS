import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton() {
    return (
        <div className="space-y-4">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-10 w-24" />
            </div>

            {/* Table Skeleton */}
            <div className="w-full border border-gray-300 rounded-lg">
                {/* Table Head */}
                <div className="grid grid-cols-4 gap-4 p-4 border-b">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                </div>

                {/* Table Rows */}
                <div className="space-y-2 p-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-4 gap-4 items-center"
                        >
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Skeleton */}
            <div className="flex justify-between items-center mt-4">
                <Skeleton className="h-6 w-32" />
                <div className="flex space-x-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                </div>
            </div>
        </div>
    );
}