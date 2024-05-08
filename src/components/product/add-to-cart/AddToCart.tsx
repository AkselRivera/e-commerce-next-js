"use client";
import { SizeSelector } from "../size-selector/SizeSelector";
import { QuantitySelector } from "../quantity-selector/QuantitySelector";
import { CartProduct, Product, Size } from "@/interfaces";
import { useState } from "react";
import { useCartStore } from "@/store";

interface Props {
	product: Product;
}

export const AddToCart = ({ product }: Props) => {
	const addProductToCart = useCartStore((state) => state.addProductToCart);
	const [size, setSize] = useState<Size | undefined>();
	const [quantity, setQuantity] = useState<number>(1);
	const [posted, setPosted] = useState(false);

	const addToCart = () => {
		if (!size) {
			setPosted(true);
			return;
		}

		const cartProduct: CartProduct = {
			id: product.id,
			title: product.title,
			slug: product.slug,
			price: product.price,
			image: product.images[0],
			quantity,
			size,
		};

		addProductToCart(cartProduct);

		setPosted(false);
		setSize(undefined);
		setQuantity(1);
	};

	return (
		<>
			<SizeSelector
				availableSizes={product.sizes}
				selectedSize={size}
				onSizeChange={setSize}
			/>
			{posted && !size && (
				<span className="text-red-500 text-sm fade-in">
					Debe seleccionar una talla*
				</span>
			)}
			{/* Selector de Cantidad */}
			<QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
			<button className="btn-primary my-5" onClick={addToCart}>
				Agregar al carrito
			</button>
		</>
	);
};
