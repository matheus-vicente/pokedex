import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <div className="flex h-screen flex-col bg-gray-100">{children}</div>
      </body>
    </html>
  );
}
