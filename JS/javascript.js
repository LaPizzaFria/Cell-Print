const productos = [
    {
        id: "auricular-01",
        titulo: "auricular 01",
        imagen: "img/auricular01.webp",
        categoria: {
            nombre:"Auriculares",
            id:"auriculares"
        },
        precio: 1400
    },
    {
        id: "auricular-02",
        titulo: "auricular 02",
        imagen: "img/auricular02.jpg",
        categoria: {
            nombre:"Auriculares",
            id:"auriculares"
        },
        precio: 1100
    },
    {
        id: "auricular-03",
        titulo: "auricular 03",
        imagen: "img/auricular03.jpg",
        categoria: {
            nombre:"Auriculares",
            id:"auriculares"
        },
        precio: 1300
    },
    {
        id: "auricular-04",
        titulo: "auricular 04",
        imagen: "img/auricular04.webp",
        categoria: {
            nombre:"Auriculares",
            id:"auriculares"
        },
        precio: 1000
    },
    {
        id: "teclado-01",
        titulo: "teclado 01",
        imagen: "img/teclado01.jpg",
        categoria: {
            nombre:"Teclados y Mouses",
            id:"teclados"
        },
        precio: 1000
    },
    {
        id: "teclado-02",
        titulo: "teclado 02",
        imagen: "img/teclado02.jpg",
        categoria: {
            nombre:"Teclados y Mouses",
            id:"teclados"
        },
        precio: 1000
    },
    {
        id: "teclado-03",
        titulo: "teclado 03",
        imagen: "img/teclado03.jpeg",
        categoria: {
            nombre:"Teclados y Mouses",
            id:"teclados"
        },
        precio: 1000
    },
    {
        id: "teclado-04",
        titulo: "teclado 04",
        imagen: "img/teclado04.jpg",
        categoria: {
            nombre:"Teclados y Mouses",
            id:"teclados"
        },
        precio: 1000
    },
    {
        id: "teclado-05",
        titulo: "teclado 05",
        imagen: "img/teclado05.jpg",
        categoria: {
            nombre:"Teclados",
            id:"teclados"
        },
        precio: 1000
    },
    {
        id: "teclado-06",
        titulo: "teclado 06",
        imagen: "img/teclado06.jpg",
        categoria: {
            nombre:"Teclados",
            id:"teclados"
        },
        precio: 1000
    },
    {
        id: "teclado-07",
        titulo: "teclado 07",
        imagen: "img/teclado07.webp",
        categoria: {
            nombre:"Teclados",
            id:"teclados"
        },
        precio: 1000
    },

    {
        id: "parlante-01",
        titulo: "parlante 01",
        imagen: "img/parlante01.jpg",
        categoria: {
            nombre:"Parlantes",
            id:"parlantes"
        },
        precio: 1000
    },
    {
        id: "parlante-02",
        titulo: "parlante 02",
        imagen: "img/parlante02.jpg",
        categoria: {
            nombre:"Parlantes",
            id:"parlantes"
        },
        precio: 1000
    },
    {
        id: "parlante-03",
        titulo: "parlante 03",
        imagen: "img/parlante03.jpg",
        categoria: {
            nombre:"Parlantes",
            id:"parlantes"
        },
        precio: 1000
    },
    {
        id: "parlante-04",
        titulo: "parlante 04",
        imagen: "img/parlante04.jpeg",
        categoria: {
            nombre:"Parlantes",
            id:"parlantes"
        },
        precio: 1000
    },






];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>
        `;

        contenedorProductos.append(div);

        actualizarBotonesAgregar();
    })   
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        
        if (e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;


            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else{
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    })
});

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = [];

}

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;

    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad,0);
    numerito.innerText = nuevoNumerito;
}