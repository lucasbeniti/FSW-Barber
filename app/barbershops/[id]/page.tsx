import { db } from "@/app/lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import { Button } from "@/app/components/ui/button";
import ServiceItem from "./_components/service-item";

interface BarbershopDetailsPageProps {
  params: { id?: string };
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  if (!params.id) {
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return null;
  }

  return (
    <div className="pb-6">
      <BarbershopInfo barbershop={barbershop} />
      <div className="flex items-center p-5 gap-2">
        <Button>Serviços</Button>
        <Button variant={"secondary"}>Informações</Button>
      </div>
      <div className="flex px-5 flex-col gap-4">
        {barbershop.services.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopDetailsPage;
