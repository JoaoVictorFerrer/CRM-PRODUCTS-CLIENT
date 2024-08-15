import { Link, Form, useActionData, ActionFunctionArgs,redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({request} : ActionFunctionArgs) {

    const data = Object.fromEntries(await request.formData())
    
    let error = ''

    if (Object.values(data).includes('')) {
        error = 'Todos los campos son Obligatorios'
    }
    if (error.length) {
        return error
    }

  await addProduct(data)
  // esta nueva forma de react Router Dom de action me exige retornar algo a pantalla o redireccionar el usuario
    return redirect('/')
}

export default function NewProduct() {

    const error = useActionData() as string

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          {" "}
          Registrar Producto{" "}
        </h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Volver a productos
        </Link>
          </div>
          
          {error && <ErrorMessage> {error} </ErrorMessage>  }
        
          <Form
              className="mt-10"
              method="POST"
              
          >
            <ProductForm/>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
