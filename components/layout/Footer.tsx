export const Footer = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between px-2 md:px-10 py-4 font-indieflower text-xl">
            <h6 className="mb-10 md:m-0">Sweet Bakery, a Next.js + Zustand boilerplate project</h6>
            <p>Made by
                <a
                    className="ml-2 text-red-400"
                    href="https://github.com/FabioViscuso/sweet-bakery-next"
                    target="_blank"
                    rel="noopener noreferrer">
                    Fabio Viscuso
                </a>
            </p>
        </div>
    )
}
