"use client";

import ProductCard from "./ProductCard";
import { ProductFeature } from "@/modules/catalog/models/ProductFeature";
import { getFeaturedProducts } from "@/modules/catalog/services/ProductsService";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 12;

const FeaturedProducts = () => {
  const [products, setProducts] = useState<ProductFeature | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const response: ProductFeature = await getFeaturedProducts(
        page,
        PAGE_SIZE
      );
      console.log("res", response);
      setProducts(response);
      setTotalPages(response.totalPage);
    };
    fetchProducts();
  }, [page]);

  return (
    <>
      <div className="min-w-[1000px] bg-white mt-8">
        <div className="text-xl h-14 leading-[60px] text-gray-800 text-center">
          Featured Products
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 mt-4">
        {products?.productList.map((product) => (
          <div key={product.id} className="col-span-2">
            <ProductCard
              image={product.thumbnailUrl}
              title={product.name}
              price={product.price}
              productId={product.id}
            />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <span>Page {page + 1}</span>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages - 1}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default FeaturedProducts;
