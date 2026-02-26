import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(path.resolve(), "public")));


const games = [
    {
        id: 1,
        title: "Go Ape Ship!",
        price: "Gratis",
        image: "http://localhost:5001/goapeship.webp",
    },
    {
        id: 2,
        title: "Seven Knights Re:BIRTH",
        price: "Gratis",
        image: "http://localhost:5001/sevenknights.jpg",
    },
    {
        id: 3,
        title: "Half Sword",
        price: "23,99 €",
        image: "http://localhost:5001/halfsword.jpg",
    },
    {
        id: 4,
        title: "MENACE",
        price: "39,99 €",
        image: "http://localhost:5001/menace.jpg",
    },
    {
        id: 6,
        title: "REANIMAL",
        price: "39,99 €",
        image: "http://localhost:5001/reanimal.webp",
    },
    {
        id: 7,
        title: "REANIMAL",
        price: "39,99 €",
        image: "http://localhost:5001/reanimal.webp",
    },
    {
        id: 8,
        title: "REANIMAL",
        price: "39,99 €",
        image: "http://localhost:5001/reanimal.webp",
    },
    {
        id: 9,
        title: "REANIMAL",
        price: "39,99 €",
        image: "http://localhost:5001/reanimal.webp",
    },
];

app.get("/api/games", (req, res) => {
    res.json(games);
});

app.post("/api/games", (req, res) => {
    const newGame = { id: Date.now(), ...req.body };
    games.push(newGame);
    res.json(newGame)
})


app.listen(5001, () => console.log("Server running in port 5001"));