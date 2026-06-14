import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Mulish, Roboto } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

export const metadata: Metadata = {
	title: "Car Dealer CMS",
	description: "Car Dealer CMS",
};

const mulish = Mulish({
	weight: "variable",
	subsets: ["latin"],
	variable: "--font-heading",
	display: "swap",
});

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-body",
	display: "swap",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"antialiased overscroll-none bg-background font-heading",
					roboto.variable,
					mulish.variable,
				)}
			>
				<NextTopLoader showSpinner={false} />
				<NuqsAdapter>{children}</NuqsAdapter>
				<Toaster />
			</body>
		</html>
	);
}
