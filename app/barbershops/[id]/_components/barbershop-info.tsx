"use client";

import { Button } from "@/app/components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MenuIcon, MapPinIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };

  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Button
          onClick={handleBackClick}
          className="z-50 absolute top-4 left-4"
          variant={"secondary"}
          size={"icon"}
        >
          <ChevronLeftIcon />
        </Button>

        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          sizes="100vw"
          fill
          style={{
            objectFit: "cover",
          }}
          className="opacity-75"
        />

        <Button
          className="z-50 absolute top-4 right-4"
          variant={"secondary"}
          size={"icon"}
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-1 mt-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <StarIcon className="text-primary fill-primary" size={18} />
          <p className="text-sm">5,0 (899 avaliações)</p>
        </div>
      </div>
    </div>
  );
};

export default BarbershopInfo;
