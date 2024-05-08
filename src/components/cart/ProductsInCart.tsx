"use client";
import Image from "next/image";

import { useCartStore } from "@/store";
import { QuantitySelector } from "../product/quantity-selector/QuantitySelector";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CartProduct } from "@/interfaces";

export const ProductsInCart = () => {
	const updateProductQuantity = useCartStore(
		(state) => state.updateProductQuantity
	);
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
						<Link
							href={`/product/${product.slug}`}
							className="underline-offset-4 hover:underline hover:cursor-pointer"
						>
							{product.size} - {product.title}
						</Link>
						<p>$ {product.price.toFixed(2)}</p>
						<QuantitySelector
							quantity={product.quantity}
							onQuantityChange={(quantity) => updateProductQuantity(product, quantity)}
						/>
						<button className="text-red-500 text-sm my-4 hover:underline underline-offset-2">
							Remover
						</button>
					</div>
				</div>
			))}
		</>
	);
};
