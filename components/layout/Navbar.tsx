// import core dependencies
import Link from 'next/link';

// import assets
import { useRouter } from 'next/router';

export const Navbar = () => {
    const router = useRouter()
    return (
        <>
            <nav className="flex flex-row justify-between items-center px-2 md:px-10 h-24 fixed top-0 left-0 right-0 z-40 bg-[#272727] bg-opacity-70 backdrop-blur-sm">
                <Link href='/'><p className="text-4xl cursor-pointer">Simple CMS</p></Link>
                {router.pathname !== '/users' && <Link href='/users'><p className="text-4xl cursor-pointer">Manage Users</p></Link>}
                {router.pathname !== '/' && <Link href='/'><p className="text-4xl cursor-pointer">Manage Products</p></Link>}
            </nav>
        </>
    )
}
