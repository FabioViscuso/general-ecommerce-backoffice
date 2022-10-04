// import stores
import React from 'react';
import useCartStore, { CartItemWithStats } from '../../lib/store/cartStore';
import useLoginStore from '../../lib/store/loginStore';

export const CartItemComponent = (props: CartItemWithStats) => {
    const { id, title, description, imgUrl, quantity, totalAmount, price } = props;
    const user = useLoginStore(store => store.currentUser);
    const items = useCartStore(store => store.items)
    const currentItem = {
        id: props.id,
        title: props.title,
        description: props.description,
        imgUrl: props.imgUrl,
        quantity: props.quantity,
        totalAmount: props.totalAmount,
        price: props.price
    }
    const addItem = useCartStore(state => state.addToCart);
    const removeItem = useCartStore(state => state.removeFromCart);

    function removeHandler(event: React.MouseEvent) {
        event.stopPropagation()
        removeItem(id)
        localStorage.setItem(`cartFor${user.username}`, JSON.stringify(items))
    }
    function addHandler(event: React.MouseEvent) {
        event.stopPropagation()
        addItem(currentItem)
        localStorage.setItem(`cartFor${user.username}`, JSON.stringify(items))
    }

    return (
        <li className='flex flex-row justify-between rounded-md bg-slate-200 font-caveat'>
            <header className='py-4 px-3'>
                <h3 className='text-4xl'>{title}</h3>
                <div className='text-2xl'>
                    ${totalAmount.toFixed(2)}{' '}
                    <span>(${price.toFixed(2)}/item)</span>
                </div>
                <div className='text-2xl'>
                    x <span>{quantity}</span>
                </div>
            </header>
            <div className='flex flex-col justify-center'>
                <button className='bg-pink-200 rounded-tr-md px-3 py-2 h-1/2' onClick={removeHandler}>-</button>
                <button className='bg-emerald-200 rounded-br-md px-3 py-2 h-1/2' onClick={addHandler}>+</button>
            </div>
        </li>
    );
};
