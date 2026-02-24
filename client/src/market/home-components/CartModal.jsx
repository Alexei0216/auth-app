import { useCart } from "./CartProvider";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const CartModal = () => {
    const { cart, removeFromCart, clearCart } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-white px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-white/10 transition"
            >
                <FaShoppingCart /> ({cart.length})
            </button>

            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
                    }`}
            />
            <div
                className={`fixed top-0 right-0 h-full w-96 bg-black/85 shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-lg font-bold text-white">Your Cart</h2>
                    <button onClick={() => setIsOpen(false)} className="cursor-pointer text-black bg-white px-4 py-2 rounded-xl">Close</button>
                </div>

                <div className="p-4 space-y-4 overflow-y-auto h-[80%] text-white">
                    {cart.length === 0 ? (
                        <p>Cart is empty</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center">
                                <p>{item.title}</p>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 cursor-pointer text-white"
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>
                <div className="p-4 border-t">
                    <button onClick={clearCart} className="w-full bg-white text-black px-4 py-2 rounded-xl cursor-pointer">
                        Clear Cart
                    </button>
                </div>
            </div>
        </>
    )
}

export default CartModal;