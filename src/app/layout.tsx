import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <Theme>
          <div className="flex h-screen flex-col bg-gray-100">{children}</div>
        </Theme>
      </body>
    </html>
  );
}
