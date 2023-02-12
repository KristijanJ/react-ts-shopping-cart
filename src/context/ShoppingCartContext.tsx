import { createContext, useContext, ReactNode, FC, useState } from 'react';

interface ShoppingCartProviderProps {
    children: ReactNode
}

interface ShoppingCartContext {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    cartQuantity: number;
    cartItems: CartItem[];
    isOpen: boolean;
}

interface CartItem {
    id: number;
    quantity: number;
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCartContext = () => {
    return useContext(ShoppingCartContext);
}

export const ShoppingCartProvider: FC<ShoppingCartProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const getItemQuantity = (id: number): number => {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    const increaseCartQuantity = (id: number): void => {
        setCartItems(currentCartItems => {
            if (!currentCartItems.find(item => item.id === id)) {
                return [...currentCartItems, { id, quantity: 1 }];
            }

            return currentCartItems.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 }
                }

                return item;
            })
        });
    }

    const decreaseCartQuantity = (id: number): void => {
        setCartItems(currentCartItems => {
            if (currentCartItems.find(item => item.id === id)?.quantity === 1) {
                return currentCartItems.filter(item => item.id !== id);
            }

            return currentCartItems.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity - 1 }
                }

                return item;
            })
        });
    }

    const removeFromCart = (id: number): void => {
        setCartItems(currentCartItems => {
            return currentCartItems.filter(item => item.id !== id);
        });
    }
    
    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            openCart,
            closeCart,
            cartItems,
            cartQuantity,
            isOpen
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}