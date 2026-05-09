const args = process.argv.slice(2);
import { table } from "console-table-without-index";

const api = "https://fakestoreapi.com/";
const url = `${api}${args[1]}`;

async function GetIdProductos() {

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json(); // Parsea el JSON automáticamente

        console.log(table([data], ['id', 'title', 'price', 'category']))

    } catch (error) {
        console.log("Error al buscar datos con la URL ingresada, intente con otra!")
    } finally {
        console.log("Proceso Terminado!!")
    }
}

async function GetProductos() {

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json(); // Parsea el JSON automáticamente
        console.log(table(data, ['id', 'title', 'price', 'category']));

    } catch (error) {
        console.log(error)
    } finally {
        console.log("Proceso Terminado!!")
    }
}

function CrearProducto(params) {
    console.log("Se envio los datos de producto", `${args[2]}`, `${args[3]}`, `${args[4]}`, "para su creación en la BD")

}

function DeleteProducto(params) {

    console.log("Se envio el codigo de producto", `${args[1]}`.substring(9), "para su borrado")

}

switch (args[0]) {
    case "GET":
        if (`${args[1]}`.includes("products/") && /\d/.test(`${args[1]}`.charAt(9)) && /\d/.test(`${args[1]}`.charAt(10))) {
            GetIdProductos();
            break;
        }
        else if ((`${args[1]}` === "products") && (`${args[2]}` === 'undefined')) {
            GetProductos();
            break;
        } else {
            const err = new Error('URL Incorrecta para la busqueda de productos');
            console.error(err.message);
            process.exit(1);
        }

    case "POST":

        if ((`${args[1]}` != 'products') || (`${args[2]}` === 'undefined') || (`${args[3]}` === 'undefined')
            || (`${args[4]}` === 'undefined')) {
            const err = new Error('Datos incorrectos o debe ingresar todos los datos para la alta del producto en la URL');
            console.error(err.message);
            process.exit(1);
        } else if (isNaN(`${args[3]}`) == true) {
            const err = new Error('Precio debe ser numerico');
            console.error(err.message);
            process.exit(1);

        } else {
            CrearProducto();
        }

    case "DELETE":

        if (`${args[1]}`.includes("products/")) {
            if (!(/\d/.test(`${args[1]}`.charAt(9))) && (`${args[1]}`.charAt(9)) != '') {

                const err = new Error('URL Incorrecta para la eliminacion de Producto, ingrese de la forma products/id donde id es numerico ');
                console.error(err.message);
                process.exit(1);

            }

            if (!(/\d/.test(`${args[1]}`.charAt(10))) && (`${args[1]}`.charAt(10)) != '') {

                const err = new Error('URL Incorrecta para la eliminacion de Producto, ingrese de la forma products/id donde id es numerico');
                console.error(err.message);
                process.exit(1);

            }

        } else {
            const err = new Error('URL Incorrecta para la eliminacion de Producto, ingrese de la forma products/id donde id es numerico');
            console.error(err.message);
            process.exit(1);
        }

        DeleteProducto();

    default:
        break;
}