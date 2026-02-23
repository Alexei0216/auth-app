    import { useRef } from "react";
    import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

    const games = [
        {
            id: 1,
            title: "Go Ape Ship!",
            price: "Gratis",
            image: "/goapeship.webp",
        },
        {
            id: 2,
            title: "Seven Knights Re:BIRTH",
            price: "Gratis",
            image: "/sevenknights.jpg",
        },
        {
            id: 3,
            title: "Half Sword",
            price: "23,99 €",
            image: "/halfsword.jpg",
        },
        {
            id: 4,
            title: "MENACE",
            price: "39,99 €",
            image: "/menace.jpg",
        },
        {
            id: 6,
            title: "REANIMAL",
            price: "39,99 €",
            image: "/reanimal.webp",
        },
        {
            id: 7,
            title: "REANIMAL",
            price: "39,99 €",
            image: "/reanimal.webp",
        },
        {
            id: 8,
            title: "REANIMAL",
            price: "39,99 €",
            image: "/reanimal.webp",
        },
        {
            id: 9,
            title: "REANIMAL",
            price: "39,99 €",
            image: "/reanimal.webp",
        },
    ];

    export default function HomeSlider() {
        const sliderRef = useRef(null);

        const scroll = (direction) => {
            const container = sliderRef.current;
            const scrollAmount = 260;

            if (direction === "left") {
                container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            } else {
                container.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        };

        return (
            <div className="relative my-16 w-full max-w-6xl mx-auto">

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-white text-2xl font semibold">
                        Descubre algo nuevo
                    </h2>

                    <div className="flex gap-2">
                        <button
                            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
                            onClick={() => scroll("left")}
                        >
                            <FaChevronLeft className="text-white cursor-pointer" />
                        </button>

                        <button
                            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
                            onClick={() => scroll("right")}
                        >
                            <FaChevronRight className="text-white cursor-pointer" />
                        </button>
                    </div>
                </div>

                <div
                    className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
                    ref={sliderRef}
                >
                    {games.map((games) => (
                        <div
                            key={games.id}
                            className="min-w-[220px] bg-[#18181b] rounded-xl overflow-hidden hover:bg-white/10 transition duration-300 cursor-pointer"
                        >
                            <img
                                src={games.image}
                                alt={games.title}
                                className="w-full h-[270px] object-cover"
                            />
                            <div className="p-3">
                                <p className="text-gray-400 text-sm">Juego base</p>
                                <h3 className="text-white font-semibold">{games.title}</h3>
                                <p className="text-white text-sm mt-1">{games.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        )
    }