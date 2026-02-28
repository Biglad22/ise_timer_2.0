import { PropsWithChildren } from "react";
import './globals.css'
import { Metadata } from "next";
import ApiInterceptorsProvider from '@/contexts/apiInterceptorsProvider';

export const metadata : Metadata = {
  title:"Ise Timer",
  icons:{icon:"/favicon.jpg"}
}

export default function layout({children}:PropsWithChildren) {
  return (
    <html lang="en">
        <body>
            <ApiInterceptorsProvider>
              {children}
            </ApiInterceptorsProvider>
        </body>
    </html>
  )
}