import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [initialData.products[0], initialData.products[1]];
export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar orden:" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}

          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href="/cart" className="underline underline-offset-2">
              Editar carrito
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
                  <p>$ {product.price.toFixed(2)} x 3</p>
                  <p className="font-bold">
                    Subtotal: $ {(product.price * 3).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Sumary */}
          <div className="bg-white rounded shadow-xl p-7">
            <h2 className="text-2xl font-semibold mb-2">
              Dirección de entrega:
            </h2>

            <div className="mb-10 ">
              <p className="text-xl">Aksel Rivera</p>
              <p>Av. Reforma</p>
              <p>Col. Centro</p>
              <p>Alcaldia de Tlaxcala</p>
              <p>Ciudad de Mexico</p>
              <p>CP. 09860</p>
              <p>Tel. 123-456-7890</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl font-semibold mb-2">Resumen de orden:</h2>

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
              <p className="mb-5">
                <span className="text-sm">
                  Al hacer clic en "Confirmar orden", aceptas los{" "}
                  <a href="#" className="underline underline-offset-2">
                    {" "}
                    términos y condiciones
                  </a>{" "}
                </span>{" "}
              </p>
              <Link
                href="/orders/123"
                className="btn-primary flex justify-center"
              >
                Confirmar orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
