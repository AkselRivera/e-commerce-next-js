import { OrderSummary, ProductsInCart, Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";

// const productsInCart = [initialData.products[0], initialData.products[1]];
export default function AdminPage() {
	// if (productsInCart.length === 0) redirect("/empty");

	return (
		<div className="flex justify-center items-center mb-72 px-10 sm:px-0">
			<div className="flex flex-col w-[1000px]">
				<Title title="Carrito" />

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
					{/* Carrito */}

					<div className="flex flex-col mt-5">
						<span className="text-xl">Agregar más productos</span>
						<Link href="/" className="underline underline-offset-2 mb-4">
							Seguir comprando
						</Link>

						{/* Products */}
						<ProductsInCart />
					</div>

					{/* Sumary */}
					<OrderSummary />
				</div>
			</div>
		</div>
	);
}
