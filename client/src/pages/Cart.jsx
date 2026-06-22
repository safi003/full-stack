import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Cart ({cart.length} items)</h1>
        <Button variant="destructive" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>

      <div className="space-y-4">
        {cart.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold truncate">{item.title}</h2>
                <p className="text-sm text-gray-500">${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
              <p className="font-semibold w-20 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <span className="text-lg font-bold">
          Total: ${totalPrice.toFixed(2)}
        </span>
        <Link to="/">
          <Button>Adding another article</Button>
        </Link>
        <Button>Proceed to Checkout</Button>
      </div>
    </div>
  );
}
