"user server";

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";

interface ProductToOrder {
	id: string;
	quantity: number;
	size: Size;
}

export const placeOrder = async (
	productIds: ProductToOrder[],
	address: Address
) => {
	const session = await auth();

	if (!session?.user?.id) {
		return {
			ok: true,
			message: "No hay sesion de usuario",
		};
	}

	console.log({
		productIds,
		address,
	});
};
