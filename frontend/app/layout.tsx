import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Emotion Detection App',
  description: 'Emotion Detection App using Bert Model and langdetct',
  manifest: "/manifest.json",
  icons: {
    icon: "/android-icon-192x192.png",
    apple: "/android-icon-192x192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Emotion Detection App',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Emotion Detection App" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/android-icon-192x192.png" />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}