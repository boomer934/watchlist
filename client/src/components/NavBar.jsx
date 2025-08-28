export default function Navbar(){

    return(
        <>
            <nav className="bg-gray-900 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                    {/* Logo / Titolo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold tracking-wide text-red-500">WATCHLIST</h1>
                    </div>
                    </div>
                </div>
            </nav>

        </>
    )
}