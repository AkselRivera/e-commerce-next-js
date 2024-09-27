"use client";

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
	const [loaded, setLoaded] = useState(false);
	const [isPlacingOrder, setIsPlacingOrder] = useState(false);

	const address = useAddressStore((state) => state.address);
	const { items, subTotal, tax, total } = useCartStore((state) =>
		state.getSummaryInformation()
	);

	const cart = useCartStore((state) => state.cart);

	useEffect(() => {
		setLoaded(true);
	}, []);

	const onplaceOrder = async () => {
		setIsPlacingOrder(true);

		const productsToOrder = cart.map((item) => ({
			id: item.id,
			quantity: item.quantity,
			size: item.size,
		}));

		const resp = await placeOrder(productsToOrder, address);
		console.log(resp);

		setIsPlacingOrder(false);
	};

	if (!loaded) return <p>Loading...</p>;
	return (
		<div className="bg-white rounded shadow-xl p-7">
			<h2 className="text-2xl font-semibold mb-2">Dirección de entrega:</h2>

			<div className="mb-10 ">
				<p className="text-xl">
					{address.firstName} {address.lastName}
				</p>
				<p className="capitalize">{address.address}</p>
				<p className="capitalize">{address.address2}</p>
				<p className="capitalize">
					{address.city}, {address.country}
				</p>
				<p className="capitalize">CP. {address.zipCode}</p>
				<p>Tel. {address.phone}</p>
			</div>

			<div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

			<h2 className="text-2xl mb-2">Resumen de orden:</h2>

			<div className="grid grid-cols-2">
				<span>No. Productos</span>
				<span className="text-right">
					{items} {items === 1 ? `articulo` : `articulos`}
				</span>
				<span>Subtotal: </span>
				<span className="text-right">{currencyFormat(subTotal)}</span>
				<span>Impuestos (15%): </span>
				<span className="text-right">{currencyFormat(tax)}</span>
				<span className="mt-5 text-2xl">Total: </span>
				<span className="text-right mt-5 text-2xl">{currencyFormat(total)}</span>
			</div>
			<div className="mt-5 mb-2 w-full">
				<p className="mb-5">
					<span className="text-xs">
						Al hacer clic en &quot;Confirmar orden&ldquo;, aceptas los{" "}
						<a href="#" className="underline underline-offset-2">
							{" "}
							términos y condiciones
						</a>{" "}
					</span>{" "}
				</p>
				{/* <p className="text-red-500 text-sm">Error de creacion</p> */}
				<button
					// href="/orders/123"
					onClick={onplaceOrder}
					className={clsx({
						"btn-primary": !isPlacingOrder,
						"btn-disabled": isPlacingOrder,
					})}
				>
					Confirmar orden
				</button>
			</div>
		</div>
	);
};
