"use client";
import {
  LogOutIcon,
  UserCircleIcon,
  LogInIcon,
  HomeIcon,
  CalendarDays,
} from "lucide-react";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const SideMenu = () => {
  const { data, status } = useSession();

  const handleLogoutClick = () => {
    signOut();
  };

  const handleLoginClick = () => {
    signIn("google");
  };
  return (
    <>
      <SheetHeader className="text-left border-b border-solid p-5 border-secondary">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {data?.user ? (
        <div className="flex justify-between px-5 py-6 items-center">
          <div className="flex items-center gap-3 ">
            <Avatar>
              <AvatarImage src={data.user?.image ?? ""} />
            </Avatar>

            <h2 className="font-bold">{data.user?.name}</h2>

            <Button
              variant="secondary"
              size={"icon"}
              onClick={handleLogoutClick}
            >
              <LogOutIcon />
            </Button>
          </div>
        </div>
      ) : (
        <div className="px-5 py-6 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <UserCircleIcon size={32} />
            <h2 className="font-bold">Olá. Faça seu login!</h2>
          </div>
          <Button
            variant={"secondary"}
            className="justify-start"
            onClick={handleLoginClick}
          >
            <LogInIcon className="mr-2" size={18} />
            Fazer Login
          </Button>
        </div>
      )}
      <div className="flex px-5 flex-col gap-3">
        <Button variant={"outline"} className="justify-start" asChild>
          <Link href={"/"}>
            <HomeIcon size={18} className="mr-2" />
            Início
          </Link>
        </Button>

        {status === "authenticated" && (
          <Button variant={"outline"} className="justify-start" asChild>
            <Link href={"/bookings"}>
              <CalendarDays size={18} className="mr-2" />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};

export default SideMenu;
