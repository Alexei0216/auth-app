export default function MarketLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="py-3 px-10 bg-black flex items-center">
                <img src="/marketLogo.svg" className="w-9 h-9 cursor-pointer mr-5" />
                <h3 className="font-bold text-white text-2xl">CATALOG</h3>
            </header>

            <main className="flex-1 bg-[#101014]">
                {children}
            </main>

            <footer className="">
                <header className="py-5 px-10 bg-black flex items-center justify-center">
                    <img src="/marketLogo.svg" className="w-12 h-12 cursor-pointer mr-5" />
                </header>
            </footer>
        </div>
    ) 
}