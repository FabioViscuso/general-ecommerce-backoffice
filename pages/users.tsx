import { users } from '@prisma/client'
import type { GetServerSideProps } from 'next'
import Router from 'next/router'
import React, { useRef } from 'react'
import UserCard from '../components/UI/UserCard'
import env from '../lib/config'
import useUIstore from '../lib/store/UIstore'

interface Props {
    users: users[]
}

export default function Home(props: Props) {
    const showNotification = useUIstore(store => store.setNotificationContent)

    const inputNameRef = useRef<HTMLInputElement>(null)
    const inputEmailRef = useRef<HTMLInputElement>(null)
    const inputPasswordRef = useRef<HTMLInputElement>(null)

    async function insertUserInDB(event: React.FormEvent) {
        event.preventDefault();
        const inputNameValue = inputNameRef.current!.value;
        const inputEmailValue = inputEmailRef.current!.value;
        const inputPasswordValue = inputPasswordRef.current!.value;

        const response = await fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: inputNameValue,
                email: inputEmailValue,
                password: inputPasswordValue,
            })
        })

        if (response.ok) {
            showNotification(true, 'user created successfully')
            Router.push('/users')
        } else {
            const data = await response.json()
            showNotification(false, data.message)
        }
    }

    return (
        <div className="flex flex-col items-center px-2 pt-32 w-full">
            <h1 className='text-4xl mb-6'>Add new user</h1>
            <form onSubmit={insertUserInDB} className=" flex flex-col items-center gap-8 w-full px-4 mb-20">
                <div className="w-full flex gap-10 justify-between items-center">
                    <input type="text" ref={inputNameRef} required className="text-gray-600 focus:outline-none focus:border focus:border-blue-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Username" />
                    <input type="text" ref={inputEmailRef} required className="text-gray-600 focus:outline-none focus:border focus:border-blue-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Email" />
                    <input type="password" ref={inputPasswordRef} required className="text-gray-600 focus:outline-none focus:border focus:border-blue-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Password" />
                </div>
                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 transition duration-150 ease-in-out hover:bg-blue-300 bg-blue-200 rounded text-gray-900 hover:text-gray-900 w-max px-12 py-4 text-md">Insert new User</button>
            </form>
            <section className="flex flex-col justify-start items-center overflow-x-hidden overflow-y-auto w-full py-4">
                <h2 className='text-4xl mb-8'>{"Registered users"}</h2>
                <ul className='users-grid gap-5 justify-between items-center w-full px-5'>
                    {
                        props.users.map((item: any) =>
                            <UserCard
                                key={item.id}
                                id={item.id}
                                username={item.username}
                                createdAt={item.createdAt}
                                updatedAt={item.updatedAt}
                            />
                        )
                    }
                </ul>
            </section>

        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {

    const users = await env.prisma.users.findMany();
    env.prisma.$disconnect;

    return {
        props: {
            users: users.map(user => ({
                id: user.id,
                username: user.username,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString()
            }))
        }
    }
}
