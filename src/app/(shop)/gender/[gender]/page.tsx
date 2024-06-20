export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface props {
	params: {
		gender: string;
	};
	searchParams: {
		page?: string;
	};
}

const labels: Record<string, string> = {
	men: "Hombres",
	women: "Mujeres",
	kid: "Niños",
	unisex: "Todos",
};

export default async function CategoryPage({ params, searchParams }: props) {
	const { gender } = params;
	const page = searchParams.page ? parseInt(searchParams.page) : 1;

	const { products, total } = await getPaginatedProductsWithImages({
		page,
		gender: gender as Gender,
	});

	if (products.length === 0) redirect(`/gender/${gender}`);
	// if (!["men", "women", "kid"].includes(gender)) {
	//   notFound();
	// }

	return (
		<>
			<Title
				title={labels[gender]}
				subtitle="Todos los productos"
				className="mb-2"
			/>

			<ProductGrid products={products} />
			<Pagination total={total} />
		</>
	);
}
