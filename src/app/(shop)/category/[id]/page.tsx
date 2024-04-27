import { notFound } from "next/navigation";

interface props {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: props) {
  const { id } = params;

  if (!["men", "women"].includes(id)) {
    notFound();
  }
  return (
    <div>
      <h1>Category {id} Page</h1>
    </div>
  );
}
