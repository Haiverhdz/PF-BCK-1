const socket = io();

const productList = document.querySelector(".container-products");
const productsForm = document.getElementById("insert-product");
const errorMessage = document.getElementById("error-message");
const btnDeleteIngredient = document.getElementById("btn-delete-ingredient");
const inputIngredientId = document.getElementById("input-ingredient-id");

socket.on("products-list", (data) => {
    const products = data.products ?? [];
    productList.innerText = "";

    products.forEach((product) => {
        productList.innerHTML += `
            <div class="products">
                <ul>
                    <li>Nombre: ${product.title}</li>
                    <li>Precio: ${product.price}</li>
                    <li>Moneda: ${product.currency}</li>
                    <li>Categoria: ${product.category}</li>
                    <li>Descripcion: ${product.description}</li>
                    <li>Stock: ${product.stock}</li>
                    <li>Codigo: ${product.code}</li>
                    <li>Estado: ${product.status}</li>
                </ul>
            </div>
        `;
    });
});

productsForm.onsubmit = (e) => {
    e.preventDefault(); 
    const form = e.target;
    const formData = new FormData(form);

    const status = formData.get("status") === "on";

    errorMessage.innerText = "";
    form.reset();

    socket.emit("insert-product", {
        title: formData.get("title"),    
        price: formData.get("price"),        
        currency: formData.get("currency"), 
        description: formData.get("description"),
        stock: formData.get("stock"),
        code: formData.get("code"),
        status: status,
        category: formData.get("category")
    });
};



btnDeleteIngredient.onclick = () => {
    const id = Number(inputIngredientId.value);
    inputIngredientId.value = "";
    errorMessage.innerText = "";

    if (id > 0) {
        socket.emit("delete-ingredient", { id });
    }
};

socket.on("error-message", (data) => {
    errorMessage.innerText = data.message;
    console.log(data.message);
});
