import "../index.css"

export default function MainLayout({ children }) {
    return (
        <>
            <header className="bg-gradient flex flex-row justify-center items-center py-4">
                <img src="/logo.svg" alt="Logo" className="w-50"/>
            </header>

            <main className="flex-1">
                {children}
            </main>
            <footer className="bg-gradient flex flex-row justify-center items-center py-10">
                <img src="/logo.svg" alt="Logo" />
            </footer>
        </>
    )
}