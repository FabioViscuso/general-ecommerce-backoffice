// import core dependencies
import Link from 'next/link';
import Image from 'next/image';

// import assets
import topbarIcon from '../../public/images/bakery-logo.png';

export const Navbar = () => {

    return (
        <>
            <nav className="flex flex-row justify-between items-center px-2 md:px-10 h-24 fixed top-0 left-0 right-0 z-40 bg-[#e2c3c8] bg-opacity-70 backdrop-blur-sm">
                <Image width={60} height={60} className="border-2 border-red-200 cursor-pointer" src={topbarIcon} alt="nav-logo" />
                <Link href='/'><p className="font-caveat text-4xl cursor-pointer">Sweet Bakery CMS</p></Link>
            </nav>
        </>
    )
}
