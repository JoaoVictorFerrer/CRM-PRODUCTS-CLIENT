import {
  ActionFunctionArgs,
  Form,
  redirect,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const fetcher = useFetcher()
  const navigate = useNavigate();
  


  const isAvailable = product.availability;

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">

        <fetcher.Form method="POST" >
          <button
            type='submit'
            className={` ${isAvailable ? "text-black" : "text-red-600"} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 `}
            name="id"
            value={product.id}
          >

        {isAvailable ? "disponible" : "no disponible"}
          </button>
        </fetcher.Form>

      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              navigate(`producto/${product.id}/editar`, {
                state: {
                  product,
                },
              })
            }
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs hover:bg-indigo-400 text-center"
          >
            Editar
          </button>
          <Form
            className="w-full"
            method="POST"
            action={`productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm("Eliminar?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value="Eliminar"
              className="bg-red-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs hover:bg-red-400 text-center"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
