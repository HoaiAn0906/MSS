import "./globals.css";
import { inter } from "@/components/common/fonts";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { QueryProvider } from "@/components/common/QueryProvider";
import { ToastContainer } from "react-toastify";
import Header from "@/components/common/layout/Header";
import AuthencationInfo from "@/components/common/AuthencationInfo";
import ModeToggle from "@/components/common/layout/ModeToggle";
import Footer from "@/components/common/layout/Footer";
import { AppProvider } from "@/context/AppContext";
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
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AppProvider>
              <Header>
                <AuthencationInfo />
              </Header>

              <div className="body mt-[134px]">{children}</div>

              <Footer />
            </AppProvider>

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
