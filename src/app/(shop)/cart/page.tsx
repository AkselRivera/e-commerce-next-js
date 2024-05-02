import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const productsInCart = [initialData.products[0], initialData.products[1]];
export default function AdminPage() {
  if (productsInCart.length === 0) redirect("/empty");

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}

          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más productos</span>
            <Link href="/" className="underline underline-offset-2">
              Seguir comprando
            </Link>

            {/* Products */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  className={`mr-5  rounded`}
                />

                <div>
                  <p>{product.title}</p>
                  <p>$ {product.price.toFixed(2)}</p>
                  <QuantitySelector quantity={2} />
                  <button className="text-red-500 text-sm my-4 hover:underline underline-offset-2">
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sumary */}
          <div className="bg-white rounded shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen de orden:</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 articulos</span>
              <span>Subtotal: </span>
              <span className="text-right">$ 3 articulos</span>
              <span>Impuestos (15%): </span>
              <span className="text-right">$ 3 articulos</span>
              <span className="mt-5 text-2xl">Total: </span>
              <span className="text-right mt-5 text-2xl">$ 3000</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <Link
                href="/checkout/address"
                className="btn-primary flex justify-center"
              >
                Continuar con el pago
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
