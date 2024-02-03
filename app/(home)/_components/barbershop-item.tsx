"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  const router = useRouter();
  const handleBookingClick = () => {
    router.push(`/barbershops/${barbershop.id}`);
  };
  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
      <CardContent className="px-1 py-0">
        <div className="relative w-full h-[159px]">
          <Badge
            className="absolute top-2 left-1 z-50 gap-1 opacity-90"
            variant={"secondary"}
          >
            <StarIcon size={12} className="text-primary fill-primary" />
            <span>5,0</span>
          </Badge>
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            sizes="100vw"
            className="h-[159px] w-full rounded-2xl"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>

        <div className="px-3 pb-3">
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.name}
          </h2>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.address}
          </p>

          <Button
            className="w-full mt-3"
            variant={"secondary"}
            onClick={handleBookingClick}
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
