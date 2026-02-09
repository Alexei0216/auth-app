import "../index.css"

export default function MainLayout({ children }) {
    return (
        <>
            <header className="bg-gradient flex flex-row justify-center items-center py-5">
                <img src="/logo.svg" alt="Logo" className="w-70"/>
            </header>

            <main>
                {children}
            </main>
            <footer className="flex flex-row justify-center items-center py-10">
                <img src="/logo.svg" alt="Logo" />
            </footer>
        </>
    )
}