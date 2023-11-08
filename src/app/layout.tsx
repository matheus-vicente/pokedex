import Image from "next/image";
import { Search, Filter } from "lucide-react";

import logo from "../../public/logo.png";
import * as Input from "../components/Input";

import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <div className="flex flex-col scroll-smooth bg-gray-100">
          <header className="fixed flex w-full flex-col items-center justify-center gap-4 bg-gray-100 p-6 shadow-sm">
            <Image
              src={logo}
              alt=""
              className="max-lg:w-logo-lg max-md:w-logo-md max-sm:w-logo-sm"
            />

            <div className="flex w-full flex-1 items-center gap-2">
              <Input.Root>
                <Input.Prefix>
                  <Search className="h-5 w-5 text-gray-500" />
                </Input.Prefix>

                <Input.Control />
              </Input.Root>

              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-200"
              >
                <Filter className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </header>

          <main className="mt-sm-main space-y-4 overflow-y-scroll p-6 pt-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
