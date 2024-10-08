import {Link, Form, useActionData, ActionFunctionArgs} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage.tsx";
import { addProduct } from "../services/ProductService.ts";

export async function action({request} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())

    let error = ''
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }

    if(error.length) {
        return error
    }

    addProduct(data)

    console.log(error)

    return {}
}

export default function NewProduct() {

    const error = useActionData() as string

    return(
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>Registrar Nuevo Producto</h2>
                <Link
                    to="/"
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                >
                    Volver
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                className="mt-10"
                method='POST'
            >

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="name"
                    >Nombre Producto:</label>
                    <input
                        id="name"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Nombre del Producto"
                        name="name"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="description"
                    >Descripción Producto:</label>
                    <input
                        id="description"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Descripción del Producto"
                        name="description"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="price"
                    >Precio:</label>
                    <input
                        id="price"
                        type="number"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Precio Producto. ej. 200, 300"
                        name="price"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="stock"
                    >Stock:</label>
                    <input
                        id="stock"
                        type="number"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Stock Producto. ej. 1, 100"
                        name="stock"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="categoryId"
                    >Categoría:</label>
                    <input
                        id="categoryId"
                        type="number"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Categoría del Producto. ej. 1, 2"
                        name="categoryId"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="supplierId"
                    >Proveedor:</label>
                    <input
                        id="supplierId"
                        type="number"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Proveedor del Producto. ej. 1, 2"
                        name="supplierId"
                    />
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>

        </>


    )
}