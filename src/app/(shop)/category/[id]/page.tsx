import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface props {
  params: {
    id: Category;
  };
}

const labels: Record<Category, string> = {
  men: "Hombres",
  women: "Mujeres",
  kid: "Niños",
  unisex: "Todos",
};

export default function CategoryPage({ params }: props) {
  const { id } = params;

  if (!["men", "women", "kid"].includes(id)) {
    notFound();
  }

  const products = initialData.products.filter(
    (product) => product.gender === id
  );

  return (
    <>
      <Title
        title={labels[id]}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />
    </>
  );
}
