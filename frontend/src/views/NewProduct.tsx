import { Link, Form, useActionData, ActionFunctionArgs, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { addProduct } from "../services/ProductService.ts";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }

  await addProduct(data);
  // En lugar de return redirect, simplemente devuelves el resultado sin redirigir.
  return {};
}

export default function NewProduct() {
  const error = useActionData() as string;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    supplierId: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    supplierId: ""
  });

  const navigate = useNavigate(); // Usa useNavigate para manejar la redirección

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors = { ...errors };

    // Validar campos vacíos
    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof typeof formData] === "") {
        newErrors[key as keyof typeof formData] = "Este campo es obligatorio";
      } else {
        newErrors[key as keyof typeof formData] = "";
      }
    });

    setErrors(newErrors);

    // Si no hay errores, enviar el formulario
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (!hasErrors) {
      await addProduct(formData);
      // Redirigir a la página de productos con el estado de éxito
      navigate("/", { state: { message: 'Producto creado exitosamente' } });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Registrar Nuevo Producto</h2>
        {/* Botón Mejorado de Volver */}
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white font-bold rounded shadow-lg hover:from-gray-700 hover:via-gray-800 hover:to-black transition-all duration-200 ease-in-out transform hover:scale-105 space-x-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          <span>Volver</span>
        </Link>
      </div>

      <Form method="POST" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        {/* Información del Producto */}
        <fieldset className="mb-6 border border-indigo-600 p-4 rounded-md">
          <legend className="text-2xl font-bold text-indigo-600 mb-4 border-b border-indigo-400 pb-2">
            Información del Producto
          </legend>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-800 font-bold mb-2">
              Nombre del Producto:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={`w-full p-3 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Nombre del Producto"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-800 font-bold mb-2">
              Descripción del Producto:
            </label>
            <input
              id="description"
              name="description"
              type="text"
              className={`w-full p-3 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Descripción del Producto"
              value={formData.description}
              onChange={handleInputChange}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-800 font-bold mb-2">
              Precio:
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              className={`w-full p-3 border ${errors.price ? "border-red-500" : "border-gray-300"} rounded bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Precio en dólares"
              value={formData.price}
              onChange={handleInputChange}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>
        </fieldset>

        {/* Stock y Categoría */}
        <fieldset className="mb-6 border border-indigo-600 p-4 rounded-md">
          <legend className="text-2xl font-bold text-indigo-600 mb-4 border-b border-indigo-400 pb-2">
            Detalles del Producto
          </legend>
          <div className="mb-4">
            <label htmlFor="stock" className="block text-gray-800 font-bold mb-2">
              Stock Disponible:
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              className={`w-full p-3 border ${errors.stock ? "border-red-500" : "border-gray-300"} rounded bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Cantidad disponible"
              value={formData.stock}
              onChange={handleInputChange}
            />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="categoryId" className="block text-gray-800 font-bold mb-2">
              Categoría (ID):
            </label>
            <input
              id="categoryId"
              name="categoryId"
              type="number"
              className={`w-full p-3 border ${errors.categoryId ? "border-red-500" : "border-gray-300"} rounded bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="ID de la Categoría"
              value={formData.categoryId}
              onChange={handleInputChange}
            />
            {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="supplierId" className="block text-gray-800 font-bold mb-2">
              Proveedor (ID):
            </label>
            <input
              id="supplierId"
              name="supplierId"
              type="number"
              className={`w-full p-3 border ${errors.supplierId ? "border-red-500" : "border-gray-300"} rounded bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="ID del Proveedor"
              value={formData.supplierId}
              onChange={handleInputChange}
            />
            {errors.supplierId && <p className="text-red-500 text-sm">{errors.supplierId}</p>}
          </div>
        </fieldset>

        {/* Botón Mejorado de Registrar */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 text-white font-bold py-3 rounded shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          <span>Registrar Producto</span>
        </button>
      </Form>
    </>
  );
}
