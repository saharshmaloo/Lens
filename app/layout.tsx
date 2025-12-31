import "./globals.css";
import { ReactNode } from "react";
import { AuthProvider } from '@/lib/auth/auth-context'

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50 text-gray-900">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}