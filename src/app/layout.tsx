import "./globals.css";
import Providers from "./providers";
import FloatingChat from "@/components/chat/floating-chat";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="
          min-h-screen
          bg-background
          text-foreground
          antialiased
          relative
          overflow-x-hidden
        "
      >
        {/* Gradient background blobs (AI vibe) */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-sky-500/20 blur-3xl animate-pulse" />
          <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-3xl animate-pulse delay-2000" />
        </div>

        <Providers>{children}</Providers>
        <FloatingChat />
      </body>
    </html>
  );
}
