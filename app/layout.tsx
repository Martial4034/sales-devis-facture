import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import { ClerkProvider, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";
// import { Mail, Search, MessageCircle } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teliosa Generator",
  description: "Teliosa Devis / Contrat Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>
      <html lang="fr">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* <SignedOut>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="w-full max-w-md p-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h1 className="text-2xl font-bold text-center mb-2">Teliosa Generator</h1>
                  <p className="text-gray-600 text-center mb-6">
                    Merci de vous connecter avec votre adresse Google Teliosa.
                    <br />
                    <span className="text-sm text-gray-500">
                      Ce site est restreint à l&apos;équipe de Teliosa.
                    </span>
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                      <p className="text-sm text-gray-600">
                        TOUS LES MEMBRES de l&apos;équipe Teliosa ont reçu une invitation dans leur adresse email @teliosa.com
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <Search className="h-5 w-5 text-gray-500 mt-0.5" />
                      <p className="text-sm text-gray-600">
                        Cherchez "Teliosa Generator" dans votre boîte de réception
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <MessageCircle className="h-5 w-5 text-gray-500 mt-0.5" />
                      <p className="text-sm text-gray-600">
                        Si vous n&apos;avez pas reçu d&apos;email, merci de cliquer sur le bouton ci-dessous, puis Join Waitlist. Puis de ping @Martial sur Slack
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <SignInButton mode="modal">
                      <Button className="w-full bg-black hover:bg-gray-800">
                        Connexion avec Google
                      </Button>
                    </SignInButton>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-px bg-gray-200"></div>
                      <span className="text-sm text-gray-500">ou</span>
                      <div className="flex-1 h-px bg-gray-200"></div>
                    </div>
                    
                    <a 
                      href="https://mail.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-center text-sm text-gray-500 hover:text-gray-700"
                    >
                      Ouvrir Gmail
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SignedOut>
          <SignedIn> */}
            {children}
          {/* </SignedIn> */}
        </body>
      </html>
    // </ClerkProvider>
  );
}
