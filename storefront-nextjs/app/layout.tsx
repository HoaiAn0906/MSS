import "./globals.css";
import { inter } from "@/components/common/fonts";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import SideNav from "@/components/common/layout/SideNav";
import { QueryProvider } from "@/components/common/QueryProvider";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="flex flex-col h-screen md:flex-row md:overflow-hidden">
              <div className="w-full flex-none md:w-52 bg-secondary">
                <SideNav />
              </div>

              <div className="grow p-3 md:overflow-y-auto ">{children}</div>
            </div>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
