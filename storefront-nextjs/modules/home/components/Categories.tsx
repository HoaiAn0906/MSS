"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/modules/catalog/models/Category";
import { getCategories } from "@/modules/catalog/services/CategoryService";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Categories = () => {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 20;
  const totalPages = useMemo(
    () => Math.ceil(categories.length / itemsPerPage),
    [categories.length]
  );
  const startIndex = useMemo(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage]
  );
  const endIndex = useMemo(() => startIndex + itemsPerPage, [startIndex]);

  const currentItems: Category[] = categories.slice(startIndex, endIndex);
  const chunkedItems = [];
  for (let i = 0; i < currentItems.length; i += 2) {
    chunkedItems.push(currentItems.slice(i, i + 2));
  }

  useEffect(() => {
    getCategories().then((data) => {
      setCategories([...data]);
    });
  }, []);

  const handleClick = (slug: string) => {
    console.log(slug);
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-w-[1000px] bg-white">
      <div className="text-xl uppercase text-left h-16 leading-[60px] pl-5 text-gray-800">
        Categories
      </div>
      <div className="relative">
        {currentPage > 1 && (
          <div
            className="w-8 h-8 flex items-center justify-center absolute top-1/2 left-[-14px] transform -translate-y-1/2 bg-white rounded-full shadow cursor-pointer hover:bg-black hover:text-white transition"
            onClick={() => goToPage(currentPage - 1)}
          >
            <ArrowLeft />
          </div>
        )}
        <ul className="flex border border-black/5 p-0">
          {chunkedItems.map((chunk, index) => (
            <li
              key={index}
              className="w-1/10 flex flex-col transition border-l border-black/5 first:border-l-0 last:border-r border-black/5"
            >
              {chunk.map((item) => (
                <div
                  className="h-36 w-36 cursor-pointer flex flex-col items-center transition hover:shadow-md"
                  key={item.id}
                  onClick={() => handleClick(item.slug)}
                >
                  <div className="flex-shrink-0 mt-[10%] w-[70%] h-[60%]">
                    {item.categoryImage ? (
                      <div
                        className="h-full bg-contain bg-no-repeat bg-center" 
                        style={{
                          backgroundImage: `url(${item.categoryImage.url})`,
                        }}
                      ></div>
                    ) : (
                      <div className="h-full bg-gray-200 flex items-center justify-center">
                        No image
                      </div>
                    )}
                  </div>
                  <p className="text-sm mt-2">{item.name}</p>
                </div>
              ))}
            </li>
          ))}
        </ul>
        {currentPage < totalPages && (
          <div
            className="w-8 h-8 flex items-center justify-center absolute top-1/2 right-[-14px] transform -translate-y-1/2 bg-white rounded-full shadow cursor-pointer hover:bg-black hover:text-white transition"
            onClick={() => goToPage(currentPage + 1)}
          >
            <ArrowRight />
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
