import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import { toastError } from "@/components/service/ToastService";
import { toastSuccess } from "@/components/service/ToastService";
import { CartItemPostVm } from "@/modules/cart/models/CartItemPostVm";
import { addCartItem } from "@/modules/cart/services/CartService";
import { MssError } from "@/components/service/MssError";
import { useCartContext } from "@/context/CartContext";

interface ProductProps {
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  productId: number;
}

const ProductCard = ({
  image,
  title,
  price,
  oldPrice,
  discount,
  productId,
}: ProductProps) => {
  const { fetchNumberCartItems } = useCartContext();

  const handleAddToCart = async () => {
    const payload: CartItemPostVm = {
      productId: productId,
      quantity: 1,
    };
    try {
      await addCartItem(payload);
    } catch (error) {
      if (error instanceof MssError && error.status === 403) {
        toastError("You need to login first before adding to cart");
      } else {
        toastError("Add to cart failed. Try again");
      }
      return;
    }
    toastSuccess("Add to cart success");
    fetchNumberCartItems();
  };

  return (
    <Card className="shadow-md border border-gray-200 overflow-hidden relative transition-transform duration-300 hover:scale-105">
      <CardHeader className="p-0 overflow-hidden relative">
        <div className="relative w-full h-[180px] bg-white flex justify-center items-center">
          <Image
            src={image}
            alt={title}
            width={150}
            height={150}
            className="rounded-t-lg object-contain"
          />
        </div>

        {discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-md">
            {discount}
          </div>
        )}

        {/* <div className="absolute top-2 right-2 space-y-1 text-gray-600 text-xs text-right">
          <div className="bg-white px-2 py-1 rounded-md shadow">
            🔋 Pin 20 ngày
          </div>
          <div className="bg-white px-2 py-1 rounded-md shadow">
            🛡️ Kính cường lực
          </div>
          <div className="bg-white px-2 py-1 rounded-md shadow">
            📞 Có nghe gọi
          </div>
        </div> */}
      </CardHeader>

      <CardContent className="px-4 py-3">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>

        <div className="mt-2 text-red-500 text-lg font-bold">${price}</div>
        {oldPrice && (
          <div className="text-gray-400 text-sm line-through">{oldPrice}₫</div>
        )}

        <div className="flex justify-between">
          <div className="text-gray-400 text-sm mt-2">Đã bán 100+</div>

          <div className="flex items-center gap-1 mt-2">
            <Star className="w-4 h-4" color="yellow" />
            <span className="text-gray-400 text-sm">4.5</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4">
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold"
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
