import { Router } from "express";
import ProductManager from "../manager/ProductsManager.js";


const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getAll();
        res.status(200).render("home", { title: "Lista de Productos", products });
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

router.get("/realTimeProducts", async (req, res) => {
    try {
        res.status(200).render("realTimeProducts", { title: "Lista de Productos"});
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const product = await productManager.getOneById(req.params?.id);
        res.status(200).render("productForID", { title: "Producto:", product});
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});



export default router;