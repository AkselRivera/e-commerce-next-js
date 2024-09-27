import {
	CheckoutProducts,
	PlaceOrder,
	QuantitySelector,
	Title,
} from "@/components";
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
						<CheckoutProducts />
					</div>

					{/* Sumary */}
					<PlaceOrder />
				</div>
			</div>
		</div>
	);
}
