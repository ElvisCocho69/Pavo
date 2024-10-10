import { Link, useLocation, useNavigate, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/ProductService';

export async function loader() {
    await getProducts();

    return {}
}

export default function Products() {

    const products = useLoaderData(); 

    const location = useLocation();
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message);
            setShowMessage(true);

            // Limpiar el estado de la alerta después de 5 segundos
            const timer = setTimeout(() => {
                setShowMessage(false);
                // Limpia el estado de la URL para que no muestre el mensaje al recargar
                navigate(location.pathname, { replace: true });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [location, navigate]);

    return (
       <>
           <div className='flex justify-between items-center mb-8'>
               <h2 className='text-4xl font-black text-slate-500'>Productos</h2>
               {/* Botón Mejorado de Agregar con el mismo estilo */}
               <Link
                 to="productos/nuevo"
                 className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white font-bold rounded shadow-lg hover:from-gray-700 hover:via-gray-800 hover:to-black transition-all duration-200 ease-in-out transform hover:scale-105 space-x-2"
               >
                 <FontAwesomeIcon icon={faPlus} className="mr-2" />
                 <span>Agregar</span>
               </Link>
           </div>

           

           {/* Mostrar alerta flotante si hay un mensaje */}
           {showMessage && (
               <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                   {message}
                   {/* Barra de progreso */}
                   <div className="absolute bottom-0 left-0 h-1 bg-green-700" style={{ width: '100%', animation: 'progress 5s linear' }}></div>
               </div>
           )}

           {/* Estilos CSS */}
           <style>{`
               @keyframes progress {
                   from {
                       width: 100%;
                   }
                   to {
                       width: 0;
                   }
               }

               @keyframes fade-out {
                   from {
                       opacity: 1;
                   }
                   to {
                       opacity: 0;
                   }
               }
           `}</style>
       </>
    );
}
