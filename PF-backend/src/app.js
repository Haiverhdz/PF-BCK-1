import express from "express";
import routerProducts from "./routes/productsRouter.js";
import routerCart from "./routes/cartRouter.js";
import paths from "./utils/paths.js"; 
import { config as configHandlerbars } from "./config/handlerbars.config.js";
import { config as configWebsocket } from "./config/websocket.config.js";
import routerViewProducts from "./routes/productsView.js";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

configHandlerbars(app);

app.use("/api/public", express.static(paths.public));
app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);
app.use("/", routerViewProducts);

app.use("*", (req, res) =>{
    res.status(404).render("error404",{title: "error 404"})
});

const httpServer = app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});

configWebsocket(httpServer);
