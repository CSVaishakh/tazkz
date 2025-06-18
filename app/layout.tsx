import { ClerkProvider } from '@clerk/nextjs'
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
          {children}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  )
}
