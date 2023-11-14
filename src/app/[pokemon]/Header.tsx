import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart } from "lucide-react";

import { titleCase } from "@/utils/titleCase";

interface HeaderProps {
  img: string;
  name: string;
}

export function Header({ img, name }: HeaderProps) {
  return (
    <header className="flex flex-col bg-green-300">
      <div className="flex items-center justify-between px-4 pt-4">
        <Link href="/" className="h-6 w-6">
          <ArrowLeft className="h-6 w-6" />
        </Link>

        <strong className="text-2xl font-semibold">{titleCase(name)}</strong>

        <Heart className="h-6 w-6" />
      </div>

      <Image
        width={240}
        height={240}
        className="mx-auto"
        alt={titleCase(name)}
        src={img}
      />
    </header>
  );
}
