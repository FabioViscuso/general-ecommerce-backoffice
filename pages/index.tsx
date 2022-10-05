import { products } from '@prisma/client'
import type { GetServerSideProps } from 'next'
import Router from 'next/router'
import React, { useRef } from 'react'
import { ProductCard } from '../components/UI/ProductCard'
import env from '../lib/config'
import { CartItem } from '../lib/store/cartStore'
import useUIstore from '../lib/store/UIstore'

interface Props {
  products: products[]
}

export default function Home(props: Props) {
  const showNotification = useUIstore(store => store.setNotificationContent)

  const inputNameRef = useRef<HTMLInputElement>(null)
  const inputDescriptionRef = useRef<HTMLInputElement>(null)
  const inputPriceRef = useRef<HTMLInputElement>(null)
  const inputImageURLRef = useRef<HTMLInputElement>(null)

  async function insertProductInDB(event: React.FormEvent) {
    event.preventDefault();
    const inputNameValue = inputNameRef.current!.value;
    const inputDescriptionValue = inputDescriptionRef.current!.value;
    const inputPriceValue = inputPriceRef.current!.value;
    const inputImageURLValue = inputImageURLRef.current!.value;

    const response = await fetch('/api/products/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: inputNameValue,
        description: inputDescriptionValue,
        price: inputPriceValue,
        imgUrl: inputImageURLValue
      })
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
    <div className="flex flex-col items-center pt-32 w-full">
      <h1 className='font-caveat text-4xl mb-6'>Add product</h1>
      <form onSubmit={insertProductInDB} className=" flex flex-col items-center gap-8 w-full px-4 mb-20">
        <div className="w-full flex gap-10 justify-between items-center">
          <input type="text" ref={inputNameRef} required className="text-gray-600 focus:outline-none focus:border focus:border-pink-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Product name" />
          <input type="text" ref={inputDescriptionRef} required className="text-gray-600 focus:outline-none focus:border focus:border-pink-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Product description" />
          <input type="number" ref={inputPriceRef} required min={1} max={30} step={0.01} className="text-gray-600 focus:outline-none focus:border focus:border-pink-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Price" />
          <input type="text" ref={inputImageURLRef} required className="text-gray-600 focus:outline-none focus:border focus:border-pink-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Image URL" />
        </div>
        <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 transition duration-150 ease-in-out hover:bg-pink-300 bg-pink-200 rounded text-gray-900 hover:text-gray-900 w-max px-12 py-4 text-md">Insert new product</button>
      </form>
      <section className="flex flex-col justify-start items-center overflow-x-hidden overflow-y-auto w-full py-4">
        <h2 className='text-4xl mb-8 font-indieflower'>{"Current products in the database"}</h2>
        <ul className='products-grid gap-5 justify-between items-center w-full px-5'>
          {
            props.products.map((item: CartItem) =>
              <ProductCard
                key={item.id}
                id={item.id}
                imgUrl={item.imgUrl}
                title={item.title}
                price={item.price}
                description={item.description}
              />
            )
          }
        </ul>
      </section>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {

  const products = await env.prisma.products.findMany();
  console.log(products)
  env.prisma.$disconnect;

  return {
    props: {
      products: products.map(product => ({
        id: product.id,
        imgUrl: product.imgUrl,
        title: product.title,
        price: product.price,
        description: product.description,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString()
      }))
    }
  }
}
