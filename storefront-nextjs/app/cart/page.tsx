"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CartItemGetDetailsVm } from "@/modules/cart/models/CartItemGetVm";
import {
  addCartItem,
  deleteCartItem,
  getDetailedCartItems,
  updateCartItem,
} from "@/modules/cart/services/CartService";
import { useCartContext } from "@/context/CartContext";
import {
  toastError,
  toastErrorWithDetails,
} from "@/components/service/ToastService";
import { toastSuccess } from "@/components/service/ToastService";
import { MssError } from "@/components/service/MssError";
import { CartItemPostVm } from "@/modules/cart/models/CartItemPostVm";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "@/components/common/ConfirmationDialog";
import { CartItemPutVm } from "@/modules/cart/models/CartItemPutVm";
import { Checkout } from "@/modules/order/models/Checkout";
import { CheckoutItem } from "@/modules/order/models/CheckoutItem";
import { useUserInfoContext } from "@/context/UserInfoContext";
import { verifyPromotion } from "@/modules/promotion/service/PromotionService";
import { PromotionVerifyResult } from "@/modules/promotion/model/Promotion";
import { createCheckout } from "@/modules/order/services/OrderService";

export default function Page() {
  const { email } = useUserInfoContext();
  const { fetchNumberCartItems } = useCartContext();
  const [cartItems, setCartItems] = useState<CartItemGetDetailsVm[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [cartSubtotal, setCartSubtotal] = useState<number>(0);
  const [cartDiscount, setCartDiscount] = useState<number>(0);
  const [selectedProductIds, setSelectedProductIds] = useState<Set<number>>(
    new Set()
  );
  const router = useRouter();
  const [isDeleteConfirmationModalOpened, setIsDeleteConfirmationModalOpened] =
    useState(false);
  const [productIdToRemove, setProductIdToRemove] = useState<number>(0);
  const [loadingItems, setLoadingItems] = useState<Set<number>>(new Set());
  const [couponCode, setCouponCode] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState<number>(0);
  const [promotionApply, setPromotionApply] = useState<PromotionVerifyResult>();
  const [discountMoney, setDiscountMoney] = useState<number>(0);

  const loadCartItems = async () => {
    try {
      const newCartItems = await getDetailedCartItems();
      setCartItems(newCartItems);
      fetchNumberCartItems();
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  const getSelectedCartItems = useCallback(() => {
    return cartItems.filter((cartItem) =>
      selectedProductIds.has(cartItem.productId)
    );
  }, [cartItems, selectedProductIds]);

  const handleSelectAllCartItemsChange = (checked: boolean) => {
    if (checked) {
      setSelectedProductIds(new Set(cartItems.map((item) => item.productId)));
    } else {
      setSelectedProductIds(new Set());
    }
  };

  const handleDecreaseQuantity = async (productId: number) => {
    const cartItem = cartItems.find((item) => item.productId === productId);
    if (!cartItem) {
      return;
    }
    const newQuantity = cartItem.quantity - 1;
    if (newQuantity < 1) {
      handleOpenDeleteConfirmationModal(productId);
    } else {
      await handleUpdateCartItemQuantity(productId, newQuantity);
    }
  };

  const handleUpdateCartItemQuantity = async (
    productId: number,
    quantity: number
  ) => {
    setLoadingItems((prevLoadingItems) =>
      new Set(prevLoadingItems).add(productId)
    );
    try {
      const payload: CartItemPutVm = {
        quantity: quantity,
      };
      await updateCartItem(productId, payload);
      loadCartItems();
    } catch (error) {
      toastErrorWithDetails("Failed to update cart item quantity", error);
    } finally {
      setLoadingItems((prevLoadingItems) => {
        const newLoadingItems = new Set(prevLoadingItems);
        newLoadingItems.delete(productId);
        return newLoadingItems;
      });
    }
  };

  const handleIncreaseQuantity = async (productId: number) => {
    const cartItem = cartItems.find((item) => item.productId === productId);
    if (!cartItem) {
      return;
    }
    const newQuantity = cartItem.quantity + 1;
    await handleUpdateCartItemQuantity(productId, newQuantity);
  };

  const handleDeleteCartItem = async (productId: number) => {
    try {
      await deleteCartItem(productId);
      loadCartItems();
    } catch (error) {
      toastError("Delete cart item failed. Try again");
    }
    setIsDeleteConfirmationModalOpened(false);
    setProductIdToRemove(0);
  };

  const handleOpenDeleteConfirmationModal = (productId: number) => {
    setProductIdToRemove(productId);
    setIsDeleteConfirmationModalOpened(true);
  };

  const handleCheckout = () => {
    const selectedItems = getSelectedCartItems();
    const checkoutItems = selectedItems.map((item) =>
      convertItemToCheckoutItem(item)
    );

    let checkout: Checkout = {
      email: email,
      note: "",
      couponCode: couponCode,
      totalAmount: totalPrice,
      totalDiscountAmount: discountMoney,
      checkoutItemPostVms: checkoutItems,
    };
    createCheckout(checkout)
      .then((res) => {
        router.push(`/checkout/${res?.id}`); //NOSONAR
      })
      .catch((err) => {
        if (err == 403) toastError("Please login to checkout!");
      });
  };

  const convertItemToCheckoutItem = (
    item: CartItemGetDetailsVm
  ): CheckoutItem => {
    return {
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      productPrice: item.price,
      discountAmount: discountMoney,
    };
  };

  const applyCopounCode = () => {
    console.log("Total Price:", totalPrice); // Log the totalPrice

    verifyPromotion({
      couponCode: couponCode,
      orderPrice: totalPrice,
      productIds: Array.from(selectedProductIds.values()),
    }).then((result) => {
      console.log("Promotion Result:", result); // Log the result
      setPromotionApply(result);
    });
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  useEffect(() => {
    const selectedItems = getSelectedCartItems();
    // Calculate sub total price
    const newTotalPrice = selectedItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);

    setSubTotalPrice(newTotalPrice);
    // Calculate total discount
    const newDiscountMoney = selectedItems.reduce((total, item) => {
      const discount =
        promotionApply?.discountType === "PERCENTAGE"
          ? item.price * (promotionApply.discountValue / 100)
          : promotionApply?.discountValue ?? 0;

      return total + discount;
    }, 0);
    setDiscountMoney(newDiscountMoney);
    console.log("discountMoney: " + newDiscountMoney);

    // Calculate total price
    const totalPriceLast = newTotalPrice - newDiscountMoney;
    setTotalPrice(totalPriceLast);
  }, [cartItems, selectedProductIds, promotionApply, getSelectedCartItems]);

  return (
    <div>
      <div className="container mx-auto pb-10 block">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Table */}
          <div className="lg:col-span-2">
            <Table>
              <TableHeader>
                <TableRow className="border-t border-b">
                  <TableHead className="w-[50px]">
                    <Checkbox
                      onCheckedChange={handleSelectAllCartItemsChange}
                      checked={selectedProductIds.size === cartItems.length}
                    />
                  </TableHead>
                  <TableHead className="font-bold text-black">
                    PRODUCT
                  </TableHead>
                  <TableHead className="font-bold text-black text-right">
                    PRICE
                  </TableHead>
                  <TableHead className="font-bold text-black text-center">
                    QUANTITY
                  </TableHead>
                  <TableHead className="font-bold text-black text-right">
                    TOTAL
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProductIds.has(item.productId)}
                        onCheckedChange={(checked) => {
                          const newSelectedIds = new Set(selectedProductIds);
                          if (checked) {
                            newSelectedIds.add(item.productId);
                          } else {
                            newSelectedIds.delete(item.productId);
                          }
                          setSelectedProductIds(newSelectedIds);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <div className="relative h-20 w-16 overflow-hidden rounded-md border">
                          <Image
                            src={item.thumbnailUrl}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-blue-500">
                            {item.productName}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-red-500">
                      ${item.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-none border-gray-200"
                          onClick={() => handleDecreaseQuantity(item.productId)}
                          disabled={loadingItems.has(item.productId)}
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          className="h-8 w-12 rounded-none border-x-0 text-center min-w-20"
                          readOnly
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-none border-gray-200"
                          onClick={() => handleIncreaseQuantity(item.productId)}
                          disabled={loadingItems.has(item.productId)}
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-red-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500"
                        onClick={() =>
                          handleOpenDeleteConfirmationModal(item.productId)
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-6">
              <Button
                variant="outline"
                className="bg-gray-200 text-black"
                onClick={() => router.push("/")}
              >
                <span className="mr-2">←</span> CONTINUE SHOPPING
              </Button>
            </div>

            <div className="mt-8">
              <h3 className="font-bold mb-4">DISCOUNT CODES</h3>
              <div className="flex w-full max-w-md items-center space-x-2">
                <Input
                  placeholder="Enter your coupon code"
                  className="rounded-l-md"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button
                  className="bg-blue-500 hover:bg-blue-600 rounded-r-md"
                  disabled={selectedProductIds.size === 0}
                  onClick={applyCopounCode}
                >
                  APPLY
                </Button>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <h3 className="font-bold mb-4">CART TOTAL</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span>Subtotal</span>
                    <span className="text-red-500">
                      ${subTotalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Discount</span>
                    <span className="text-red-500">
                      ${discountMoney.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-red-500">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-red-500 hover:bg-red-600 mt-4"
                  onClick={handleCheckout}
                  disabled={selectedProductIds.size === 0}
                >
                  PROCEED TO CHECKOUT
                </Button>
              </CardFooter>
            </Card>

            <ConfirmationDialog
              isOpen={isDeleteConfirmationModalOpened}
              cancel={() => setIsDeleteConfirmationModalOpened(false)}
              ok={() => handleDeleteCartItem(productIdToRemove)}
              title="Delete Cart Item"
              cancelText="Cancel"
              variantOk="destructive"
              okText="Delete"
              variantCancel="outline"
            >
              Are you sure you want to delete{" "}
              {
                cartItems.find((item) => item.productId === productIdToRemove)
                  ?.productName
              }
              ?
            </ConfirmationDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
