// import stores
import { CartItem } from "../../lib/store/cartStore";
import useUIstore from "../../lib/store/UIstore";
import Link from "next/link";
import Router from "next/router";

export const ProductItem = (props: CartItem) => {
    const showNotification = useUIstore(store => store.setNotificationContent)

    const id = props.id;

    async function deleteHandler() {
        const response = await fetch('/api/products/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        if (response.ok) {
            showNotification(true, 'product added successfully')
            Router.push('/')
        } else {
            const data = await response.json()
            showNotification(true, data.message)
        }
    }

    return (
        <li className='flex flex-col flex-wrap rounded-md bg-slate-100 w-full font-indieflower'>
            <img className='w-full h-40 object-cover rounded-tl-md rounded-tr-md' src={props.imgUrl} alt="" />
            <div className='py-4 px-4'>
                <header>
                    <h3 className='text-3xl'>{props.title}</h3>
                    <div className='text-2xl'>$ {props.price}</div>
                </header>
                <p className='text-xl'>{props.description}</p>
            </div>
            <Link href={'/'}>
                <p className='bg-pink-200 w-full p-2 self-stretch text-center text-xl cursor-pointer'>Edit Product</p>
            </Link>
            <button onClick={() => deleteHandler()} className='bg-pink-400 rounded-b-md w-full p-2 self-stretch text-center text-xl cursor-pointer'>Delete Product</button>
        </li>
    );
};
