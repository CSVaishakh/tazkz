import { ClerkProvider } from '@clerk/nextjs'
import Header from '@/components/header'
import Footer from '@/components/footer'
import './globals.css'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header/>
          {children}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  )
}
