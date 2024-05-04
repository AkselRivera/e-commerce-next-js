export const revalidate = 10080; // 7 days

import { getProductBySlug } from "@/actions";
import {
  ProductMobileSlideShow,
  ProductSlideShow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.title || "Product not found",
    description: product?.description || "",
    openGraph: {
      title: product?.title || "Product not found",
      description: product?.description || "",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slide show */}
      <div className="col-span-2 md:col-span-2">
        <ProductMobileSlideShow
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />
        {/* Desktop slideshow */}
        <ProductSlideShow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
      </div>

      <div className="col-span-1 px-5">
        <StockLabel slug={slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-10">${product.price.toFixed(2)}</p>
        {/* Selector de Tallas */}
        <SizeSelector
          availableSizes={product.sizes}
          selectedSize={product.sizes[0]}
        />
        {/* Selector de Cantidad */}
        <QuantitySelector quantity={3} />
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* Descripción */}
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>

      {/* Products Details */}
    </div>
  );
}
