import Banner from "@/modules/home/components/Banner";
import Categories from "@/modules/home/components/Categories";
import FeaturedProducts from "@/modules/home/components/FeaturedProducts";

export default async function Page() {
  return (
    <main>
      <div className="bg-[#f5f5f5]">
        <div className="container mx-auto pb-10 block">
          <Banner />

          <Categories />

          <FeaturedProducts />
        </div>
      </div>
    </main>
  );
}
