import { redirect } from "next/navigation";
import BarbershopItem from "../(home)/_components/barbershop-item";
import Header from "../components/header";
import { db } from "../lib/prisma";
import Search from "../(home)/_components/search";

interface BarbershopPagesProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopPages = async ({ searchParams }: BarbershopPagesProps) => {
  if (!searchParams.search) {
    redirect("/");
  }
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

      <div className="px-5 py-6 flex flex-col gap-6">
        <Search defaultValues={{ search: searchParams.search }} />
        <h1 className="text-gray-400 font-bold text-xs">
          Resultados para &quot;{searchParams.search}&quot;
          <div className="grid grid-cols-2 mt-2 gap-4">
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
