import './globals.css'
import { inter } from '@/components/shared/fonts'
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from '@/lib/constants'
import { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import SideNav from "@/components/shared/dashboard/sidenav";

export const metadata: Metadata = {
    title: {
        template: `%s | ${APP_NAME}`,
        default: APP_NAME,
    },
    description: APP_DESCRIPTION,
    metadataBase: new URL(SERVER_URL),
}

export default function RootLayout({children}: {
    children: React.ReactNode
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
            <div className="flex flex-col h-screen md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-52 bg-secondary">
                    <SideNav />
                </div>
                <div className="grow p-6 md:overflow-y-auto ">{children}</div>
            </div>
        </ThemeProvider>
        </body>
        </html>
    )
}