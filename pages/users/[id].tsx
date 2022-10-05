// import stores
import useUIstore from "../../lib/store/UIstore";
import Router from "next/router";
import env from "../../lib/config";
import { GetServerSideProps } from "next";
import React, { useRef } from "react";
import { users } from "@prisma/client";

interface Props {
    user: users
}

export default function User(props: Props) {
    const usernameInputRef = useRef<HTMLInputElement>(null)
    const emailInputRef = useRef<HTMLInputElement>(null)

    const showNotification = useUIstore(store => store.setNotificationContent)
    const id = props.user.id;

    async function updateUser(event: React.FormEvent) {
        event.preventDefault();
        const usernameInputValue = usernameInputRef.current!.value;
        const emailInputValue = emailInputRef.current!.value;

        const response = await fetch('/api/users/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                username: usernameInputValue,
                email: emailInputValue,
            })
        })
        if (response.ok) {
            showNotification(true, 'user updated successfully')
            Router.push('/users')
        } else {
            const data = await response.json()
            showNotification(false, data.message)
        }
    }

    async function deleteHandler(event: React.FormEvent) {
        event.preventDefault();
        const response = await fetch('/api/users/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        if (response.ok) {
            showNotification(true, 'user deleted successfully')
            Router.push('/users')
        } else {
            const data = await response.json()
            showNotification(false, data.message)
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-5">
            <h1 className="font-caveat text-4xl">Edit username and email by clicking on their values</h1>
            <form onSubmit={updateUser} className="bg-[#00000088] backdrop-blur-sm text-white rounded-md  pt-34">
                <div className="p-6">
                    <p className="text-sm">User ID: <span className="text-xl">{props.user.id}</span></p>
                    <p className="text-sm w-full">Username: <input type="text" ref={usernameInputRef} className="bg-transparent w-max text-xl" defaultValue={props.user.username} /></p>
                    <p className="text-sm w-full">Email: <input type="text" ref={emailInputRef} className="bg-transparent w-max text-xl" defaultValue={props.user.email} /></p>
                    <p className="text-sm">Created: <span className="text-xl">{String(props.user.createdAt)}</span></p>
                    <p className="text-sm">Last Updated: <span className="text-xl">{String(props.user.updatedAt)}</span></p>
                </div>
                <button className='bg-pink-200 w-full p-2 self-stretch text-center text-xl cursor-pointer'>Save Changes</button>
                <button type="button" onClick={deleteHandler} className='bg-pink-400 rounded-b-md w-full p-2 self-stretch text-center text-xl cursor-pointer'>Delete Product</button>
            </form>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const param = String(context.params!.id)
    const product = await env.prisma.users.findFirst({
        where: {
            id: param
        }
    });
    env.prisma.$disconnect;

    return {
        props: {
            user: {
                id: product!.id,
                username: product!.username,
                email: product!.email,
                createdAt: product!.createdAt.toISOString(),
                updatedAt: product!.updatedAt.toISOString()
            }
        }
    }
}
