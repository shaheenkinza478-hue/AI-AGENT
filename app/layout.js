import { AuthProvider } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footet";
import "./globals.css";

export const metadata = {
  title: "AI Agent Builder",
  description: "Chat with AI or generate websites from prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-gray-50">
      <body className="flex flex-col min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 antialiased">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}