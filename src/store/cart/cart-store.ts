import {  CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];

    getTotalItems: () => number;
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        items: number;
    };
    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
}



export const useCartStore = create<State>()(
    persist( 
        (set, get) => ({
            cart: [],
    
            // Methods
            getTotalItems: () => {
                const { cart } = get();

                return cart.reduce((total, item) => total + item.quantity, 0)
            },

            getSummaryInformation: () => {
                
                const { cart } = get();

                const subTotal = cart.reduce((total, item) => {
                    return total + item.price * item.quantity;
                }, 0);

                const tax = subTotal * 0.15;
                const total = subTotal + tax;
                const items = cart.reduce((total, item) => total + item.quantity, 0)

                return {
                    subTotal,
                    tax,
                    total,
                    items
                }

            },

            addProductToCart: (product: CartProduct) => {
                const { cart } = get();
    
                const productInCart = cart.some(
                    (item) => item.id === product.id && item.size === product.size
                )
    
                if (!productInCart) { 
                    set({ cart: [...cart, product] });
                    return;
                } 
    
                const updatedCart = cart.map(item => {
                    if (item.id === product.id && item.size === product.size) {
                        return {
                            ...item,
                            quantity: item.quantity + product.quantity
                        };
                    }
                    return item;
                });
    
                set({ cart: updatedCart });
            },

            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();

                const updatedCart = cart.map(item => {
                    if (item.id === product.id && item.size === product.size) {
                        return {
                            ...item,
                            quantity: quantity
                        };
                    }
                    return item;
                });
    
                set({ cart: updatedCart });

            },

    })
        ,
        {
            name: "shopping-cart",
        }
    )


    )