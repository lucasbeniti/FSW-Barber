import BarbershopItem from "../(home)/_components/barbershop-item";
import Header from "../components/header";
import { db } from "../lib/prisma";

interface BarbershopPagesProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopPages = async ({ searchParams }: BarbershopPagesProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h1 className="text-gray-400 font-bold text-xs">
          Resultados para &quot;{searchParams.search}&quot;
          <div className="grid grid-cols-2 mt-3 gap-4">
            {barbershops.map((barbershop) => (
              <div key={barbershop.id} className="w-full">
                <BarbershopItem barbershop={barbershop} />
              </div>
            ))}
          </div>
        </h1>
      </div>
    </>
  );
};

export default BarbershopPages;
