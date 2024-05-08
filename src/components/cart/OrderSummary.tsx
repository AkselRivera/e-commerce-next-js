"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
	const { items, subTotal, tax, total } = useCartStore((state) =>
		state.getSummaryInformation()
	);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	// TODO: Crear skeleton
	if (!isLoaded) return <p>Loading...</p>;
	return (
		<div className="bg-white rounded shadow-xl p-7 h-fit">
			<h2 className="text-2xl mb-2">Resumen de orden:</h2>

			<div className="grid grid-cols-2">
				<span>No. Productos</span>
				<span className="text-right">
					{items} {items > 1 ? `articulos` : `articulo`}
				</span>
				<span>Subtotal: </span>
				<span className="text-right">$ {currencyFormat(subTotal)}</span>
				<span>Impuestos (15%): </span>
				<span className="text-right">$ {currencyFormat(tax)}</span>
				<span className="mt-5 text-2xl">Total: </span>
				<span className="text-right mt-5 text-2xl">$ {currencyFormat(total)}</span>
			</div>
			<div className="mt-5 mb-2 w-full">
				<Link href="/checkout/address" className="btn-primary flex justify-center">
					Continuar con el pago
				</Link>
			</div>
		</div>
	);
};
