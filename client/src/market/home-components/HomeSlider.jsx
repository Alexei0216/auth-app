import { useRef, useState, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useCart } from "./CartProvider";

export default function HomeSlider() {
    const { addToCart } = useCart();
    const [games, setGames] = useState([]);
    const sliderRef = useRef(null);


    useEffect(() => {
        fetch("http://localhost:5001/api/games")
            .then(res => res.json())
            .then(data => setGames(data))
            .catch(err => console.error("Error fetching games:", err));
    }, []);


    useEffect(() => {
        const savedScroll = localStorage.getItem("homeSliderScroll");

        if (savedScroll && sliderRef.current) {
            sliderRef.current.scrollLeft = Number(savedScroll);
        }
    }, [games]);


    useEffect(() => {
        const container = sliderRef.current;
        if (!container) return;

        const handleScroll = () => {
            localStorage.setItem("homeSliderScroll", container.scrollLeft);
        };

        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scroll = (direction) => {
        const container = sliderRef.current;
        if (!container) return;

        const scrollAmount = 260;

        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative my-16 w-full max-w-6xl mx-auto">

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-2xl font-semibold">
                    Descubre algo nuevo
                </h2>

                <div className="flex gap-2">
                    <button
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
                        onClick={() => scroll("left")}
                    >
                        <FaChevronLeft className="text-white" />
                    </button>

                    <button
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
                        onClick={() => scroll("right")}
                    >
                        <FaChevronRight className="text-white" />
                    </button>
                </div>
            </div>

            <div
                ref={sliderRef}
                className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
            >
                {games.map((game) => (
                    <div
                        key={game.id}
                        className="min-w-[220px] bg-[#18181b] rounded-xl overflow-hidden hover:bg-white/10 transition duration-300"
                    >
                        <img
                            src={game.image}
                            alt={game.title}
                            className="w-full h-[270px] object-cover"
                        />

                        <div className="p-3">
                            <p className="text-gray-400 text-sm">Juego base</p>
                            <h3 className="text-white font-semibold">
                                {game.title}
                            </h3>
                            <p className="text-white text-sm mt-1">
                                ${game.price}
                            </p>

                            <button
                                onClick={() => addToCart(game)}
                                className="mt-3 w-full bg-white text-black py-2 rounded-xl hover:bg-gray-200 transition"
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}