export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full  sm:max-w-md px-10">{children}</div>
    </div>
  );
}
