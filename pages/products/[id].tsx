// import stores
import useUIstore from "../../lib/store/UIstore";
import Link from "next/link";
import Router from "next/router";
import env from "../../lib/config";
import { GetServerSideProps } from "next";
import React, { useRef } from "react";

export default function ProductItem(props: any) {
    const titleInputRef = useRef<HTMLInputElement>(null)
    const descriptionInputRef = useRef<HTMLInputElement>(null)
    const priceInputRef = useRef<HTMLInputElement>(null)
    const imgUrlInputRef = useRef<HTMLInputElement>(null)


    const showNotification = useUIstore(store => store.setNotificationContent)
    console.log(props.product)
    const id = props.product.id;

    async function updateItem(event: React.FormEvent) {
        event.preventDefault();
        const titleInputValue = titleInputRef.current!.value;
        const descriptionInputValue = descriptionInputRef.current!.value;
        const priceInputValue = priceInputRef.current!.value;
        const imgUrlInputValue = imgUrlInputRef.current!.value;

        console.log(JSON.stringify({
            title: titleInputValue,
            description: descriptionInputValue,
            price: priceInputValue,
            imgUrl: imgUrlInputValue
        }))

        const response = await fetch('/api/products/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                title: titleInputValue,
                description: descriptionInputValue,
                price: priceInputValue,
                imgUrl: imgUrlInputValue
            })
        })
        if (response.ok) {
            showNotification(true, 'product updated successfully')
            Router.push('/')
        } else {
            const data = await response.json()
            showNotification(false, data.message)
        }
    }

    async function deleteHandler(event: React.FormEvent) {
        event.preventDefault();
        const response = await fetch('/api/products/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        if (response.ok) {
            showNotification(true, 'product deleted successfully')
            Router.push('/')
        } else {
            const data = await response.json()
            showNotification(false, data.message)
        }
    }

    return (
        <div className="min-h-screen">

            <form onSubmit={updateItem} className='flex flex-col flex-wrap rounded-md bg-slate-100 max-w-lg mx-auto mt-32 font-indieflower'>
                <img className='w-full h-40 object-cover rounded-tl-md rounded-tr-md' src={props.product.imgUrl} alt="" />
                <div className='flex flex-col items-start py-4 px-4'>
                    <input ref={titleInputRef} className='text-3xl bg-slate-100 w-full' defaultValue={props.product.title} required />
                    <span className='text-2xl bg-slate-100'>$ <input ref={priceInputRef} type="number" min={1} max={30} step={0.01} className="text-2xl bg-slate-100" defaultValue={props.product.price} required /></span>
                    <input ref={descriptionInputRef} className='text-xl bg-slate-100 w-full' defaultValue={props.product.description} required />
                </div>
                <input ref={imgUrlInputRef} className='bg-gray-200 w-full p-2 self-stretch text-center text-xl' type="text" defaultValue={props.product.imgUrl} required />
                <p className='bg-slate-200 w-full p-2 self-stretch text-center text-xl cursor-pointer'>Prod. ID: {id}</p>
                <button className='bg-slate-200 w-full p-2 self-stretch text-center text-xl cursor-pointer'>Save Changes</button>
                <button type="button" onClick={deleteHandler} className='bg-slate-400 rounded-b-md w-full p-2 self-stretch text-center text-xl cursor-pointer'>Delete Product</button>
            </form>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const param = String(context.params!.id)
    console.log(param)
    const product = await env.prisma.products.findFirst({
        where: {
            id: param
        }
    });
    env.prisma.$disconnect;

    return {
        props: {
            product: {
                id: product!.id,
                imgUrl: product!.imgUrl,
                title: product!.title,
                price: product!.price,
                description: product!.description,
                createdAt: product!.createdAt.toISOString(),
                updatedAt: product!.updatedAt.toISOString()
            }
        }
    }
}
