import create from 'zustand';

export interface CartSlice {
    items: CartItemWithStats[],
    totalQuantity: number,
    totalAmount: number,
    addToCart: (newItem: CartItem) => void,
    removeFromCart: (itemToRemove: CartItem['id']) => void,
    replaceCart: (newCart: CartItemWithStats[]) => void,
}

export interface CartItem {
    id: string,
    imgUrl: string,
    title: string,
    description: string,
    price: number,
}

export interface CartStats {
    quantity: number,
    totalAmount: number
}

export type CartItemWithStats = CartItem & CartStats;

const useCartStore = create<CartSlice>(
    (set, get) =>
    (
        {
            /* CART */
            items: [],
            totalQuantity: 0,
            totalAmount: 0,
            addToCart: (newItem: CartItem) => {
                // check if item is already in the cart
                const existingItem = get().items.find(item => item.id === newItem.id)
                // if not, add it to state with initial qty and amount
                if (!existingItem || typeof existingItem === 'undefined') {
                    const toAdd: CartItemWithStats = { ...newItem, quantity: 1, totalAmount: newItem.price };
                    set(state => {
                        return {
                            items: [...state.items, toAdd]
                        }
                    })
                } else {
                    // if it exists, just add to the quantity
                    existingItem.totalAmount += newItem.price;
                    existingItem.quantity++;
                }
                set(state => { return { totalAmount: Number((state.totalAmount + newItem.price).toFixed(2)) } })
                set(state => { return { totalQuantity: state.totalQuantity + 1 } })
            },
            removeFromCart: (itemToRemove: CartItem['id']) => {
                // extract the ID
                const id = itemToRemove;

                const item = get().items.find((item) => item.id === id);

                if (item!.quantity === 1) {
                    set((state) => { return { items: state.items.filter((item) => item.id !== id) } })
                } else {
                    item!.totalAmount -= item!.price;
                    item!.quantity--;
                }
                set(state => { return { totalAmount: Number((state.totalAmount - item!.price).toFixed(2)) } })
                set((state) => { return { totalQuantity: state.totalQuantity - 1 } })
            },
            replaceCart: (newCart: CartItemWithStats[]) => {
                set((state) => {
                    return {
                        items: newCart,
                        totalQuantity: newCart.reduce((acc, obj) => {
                            return acc + obj.quantity
                        }, 0),
                        totalAmount: newCart.reduce((acc, obj) => {
                            return acc + obj.price * obj.quantity
                        }, 0)
                    }
                })
            },
        }
    )
)

export default useCartStore;
