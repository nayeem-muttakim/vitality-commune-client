import "@/app/globals.css";
export const metadata = {
  title: "VitalityCommune",
  description: "Empowering Wellness Together",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
