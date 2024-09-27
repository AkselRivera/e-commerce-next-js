"use client";
import Image from "next/image";

import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/utils";

export const CheckoutProducts = () => {
	const productsInCart = useCartStore((state) => state.cart);

	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	// TODO: Crear skeleton
	if (!isLoaded) return <p>Loading...</p>;

	return (
		<>
			{productsInCart.map((product) => (
				<div key={`${product.slug}-${product.size}`} className="flex mb-5">
					<Image
						src={`/products/${product.image}`}
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
						<span className="underline-offset-4">
							{product.size} - {product.title} ({product.quantity})
						</span>
						<p className="font-bold">
							{currencyFormat(product.price * product.quantity)}
						</p>
					</div>
				</div>
			))}
		</>
	);
};
