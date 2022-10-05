import Router from "next/router";
import useUIstore from "../../lib/store/UIstore";

interface Props {
    id: string,
    username: string,
    email: string,
    createdAt: string,
    updatedAt: string
}

export default function UserCard(props: Props) {
    const showNotification = useUIstore(store => store.setNotificationContent)

    async function deleteHandler(event: React.FormEvent) {
        event.preventDefault();
        const response = await fetch('/api/users/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: props.id })
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
        <div className="bg-[#00000088] backdrop-blur-sm text-white rounded-md" >
            <div className="p-6">
                <p className="text-sm">User ID: <span className="text-xl">{props.id}</span></p>
                <p className="text-sm">Username: <span className="text-xl">{props.username}</span></p>
                <p className="text-sm">Email: <span className="text-xl">{props.email}</span></p>
                <p className="text-sm">Created: <span className="text-xl">{props.createdAt}</span></p>
                <p className="text-sm">Last Updated: <span className="text-xl">{props.updatedAt}</span></p>
            </div>
            <button onClick={deleteHandler} className='bg-pink-400 rounded-b-md w-full p-2 self-stretch text-center text-xl cursor-pointer'>Delete User</button>
        </div>
    )
}
