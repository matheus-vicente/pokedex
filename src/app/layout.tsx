import Image from "next/image";

import logo from "../../public/logo.png";

import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <div className="flex h-screen flex-col bg-gray-100">
          <header className="flex justify-center p-6">
            <Image
              src={logo}
              alt=""
              className="max-lg:w-[240px] max-md:w-[200px] max-sm:w-[160px]"
            />
          </header>

          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
