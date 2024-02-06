"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";
import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import { Loader2, Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import { CancelBooking } from "../_actions/cancel-bookings";
import { toast } from "sonner";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isBookingConfirmed = isFuture(booking.date);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const handleCancelClick = async () => {
    setIsDeleteLoading(true);
    try {
      await CancelBooking(booking.id);
      toast.success("Reserva cancelada com sucesso");
    } catch (error) {
      console.log({ error });
    } finally {
      setIsDeleteLoading(false);
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-[80%]">
          <CardContent className="flex py-0 px-0">
            <div className="flex flex-col gap-2 py-5 flex-[5] pl-5">
              <Badge
                variant={isBookingConfirmed ? "default" : "secondary"}
                className="text-primary w-fit"
              >
                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>

              <h2 className="font-bold">{booking.service.name}</h2>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>

                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-solid border-secondary flex-1">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-2xl">{format(booking.date, "dd")}</p>
              <p className="text-sm">{format(booking.date, "hh:mm")}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="px-0">
        <SheetHeader className="px-5 text-left pb-6 border-b border-solid border-secondary">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>
        <div className="px-5">
          <div className="relative h-[180px] w-full mt-6">
            <Image
              src="/barbershop-map.png"
              alt={booking.barbershop.name}
              fill
            />

            <div className="w-full absolute bottom-4 left-0 px-5">
              <Card>
                <CardContent className="p-3 flex gap-2">
                  <Avatar>
                    <AvatarImage
                      src={booking.barbershop.imageUrl}
                    ></AvatarImage>
                  </Avatar>
                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">
                      {booking.barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <Badge
            variant={isBookingConfirmed ? "default" : "secondary"}
            className="w-fit my-3"
          >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card>
            <CardContent className="p-3 gap-3 flex flex-col">
              <div className="flex justify-between items-center">
                <h2 className="font-bold">{booking.service.name}</h2>
                <h3 className="font-bold text-sm">
                  {Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </h3>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-gray-400 text-sm">Data</h3>
                <h4 className="text-sm">
                  {format(booking.date, "dd 'de' MMMM", { locale: ptBR })}
                </h4>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-gray-400 text-sm">Horário</h3>
                <h4 className="text-sm">{format(booking.date, "hh:mm")}</h4>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-gray-400 text-sm">Barbearia</h3>
                <h4 className="text-sm">{booking.barbershop.name}</h4>
              </div>
            </CardContent>
          </Card>

          {/* Eu que fiz - telefones - o certo seria colocar o phone na tabela do barbershop */}
          <div className="flex justify-between mt-6 items-center">
            <div className="flex">
              <Smartphone size={20} />
              <p className="pl-1">(11) 98204-5108</p>
            </div>

            <Button variant={"outline"}>Copiar</Button>
          </div>
          <div className="flex justify-between py-3">
            <div className="flex">
              <Smartphone size={20} />
              <p className="pl-1">(11) 98204-5108</p>
            </div>
            <Button variant={"outline"}>Copiar</Button>
          </div>

          <SheetFooter className="flex-row gap-3 mt-6">
            <SheetClose asChild>
              <Button className="w-full" variant={"secondary"}>
                Voltar
              </Button>
            </SheetClose>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-full"
                  variant={"destructive"}
                  disabled={!isBookingConfirmed || isDeleteLoading}
                >
                  {isDeleteLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Cancelar Reserva
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader className="items-center">
                  <AlertDialogTitle>Cancelar Reserva</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja cancelar esse agendamento?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row gap-3">
                  <AlertDialogCancel className="w-full">
                    Voltar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isDeleteLoading}
                    className="w-full bg-destructive hover:bg-destructive border-none"
                    onClick={handleCancelClick}
                  >
                    {isDeleteLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
