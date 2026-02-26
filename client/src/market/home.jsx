import MarketLayout from "../layouts/MarketLayout";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import HomeSlider from "./home-components/HomeSlider";


const slides = [
    {
        title: "Black Myth: Wukong",
        subtitle: "AHORA CON UN 25% DE DESCUENTA",
        description: "Que ni el frío ni la nieve os afecten y que vuestro año rebose seguridad",
        image: "/blackmyth.jpg",
    },
    {
        title: "Honkai: Star Rail",
        subtitle: "NUEVA TEMPORADA",
        description: "Explora nuevos mundos y personajes.",
        image: "/starrail.webp",
    },
    {
        title: "Battlefield 6",
        subtitle: "YA DISPONIBLE",
        description: "Vive la guerra como nunca antes.",
        image: "/battlefield6.jpg",
    },
]

export default function Home() {
    const [active, setActive] = useState(0)
    const [fade, setFade] = useState(false)


    useEffect(() => {
        const timer = setInterval(() => {
            setFade(true)
            setTimeout(() => {
                setActive(prev => (prev + 1) % slides.length)
                setFade(false)
            }, 500)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const current = slides[active]

    return (
        <MarketLayout>
            <div className="flex flex-col items-center w-full m-10">

                <div className="w-full max-w-sm relative bg-[#404044] my-15 flex justify-center items-center rounded-3xl">
                    <FaSearch className="ml-4 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Buscar en la tienda"
                        className="w-full max-w-sm py-2 px-4 bg-[#404044] rounded-3xl text-left-2 placeholder-white/55 text-sm text-gray-50 border-none focus:outline-none"
                    />
                </div>

                <div className="flex gap-6 h-[520px] w-full max-w-6xl">

                    <div className="relative flex-1 rounded-2xl overflow-hidden">

                        {slides.map((slide, index) => (
                            <img
                                src={slide.image}
                                key={index}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700
                                            ${index === active ? "opacity-100" : "opacity-0"}
                                    `}
                            />
                        ))}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/40 to-transparent" />

                        <div className={`absolute bottom-0 left-0 p-8 text-white z-10 w-full max-w-xl transition-opacity duration-700 
                                    ${fade ? "opacity-0" : "opacity-100"}`}
                        >
                            <h2 className="text-3xl font-bold mb-2">{current.title}</h2>
                            <p className="text-sm uppercase tracking-widest text-white/70">{current.subtitle}</p>
                            <p className="text-lg text-white/90 mb-4">{current.description}</p>
                            <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition cursor-pointer">
                                Comprar ahora
                            </button>
                        </div>

                    </div>

                    <div className="w-[300px] flex flex-col gap-3">
                        {slides.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setActive(index)}
                                className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition
                                                ${active === index
                                        ? "bg-[#2a2a35]"
                                        : "bg-[#1a1a22] hover:bg-[#252530]"
                                    }`}
                            >
                                <div className="w-14 h-14 bg-gray-600 rounded-lg overflow-hidden">
                                    <img
                                        src={item.image}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="text-white text-sm">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <HomeSlider />
        </MarketLayout>
    )
}
