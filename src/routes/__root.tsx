const GTM_ID = import.meta.env.VITE_GTM_ID || '';;

import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Maren Cole — Pilates, Bodyweight & Mobility Coaching',
      },
      {
        name: 'description',
        content:
          'Personal coaching in Pilates, bodyweight training, and mobility. Book a session and start moving better today.',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${GTM_ID});`,
          }}
        />
      </head>
      <body className="bg-stone-50 text-stone-900">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
