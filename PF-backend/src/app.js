import express from "express";
import routerProducts from "./routes/productsRouter.js";
import routerCart from "./routes/cartRouter.js";
import paths from "./utils/paths.js";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/api/public", express.static(paths.public));
app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);
app.listen(PORT, ()=>{
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});