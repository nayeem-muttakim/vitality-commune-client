import "@/app/globals.css";
import AuthProvider from "@/context/page";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "VitalityCommune",
  description: "Empowering Wellness Together",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
