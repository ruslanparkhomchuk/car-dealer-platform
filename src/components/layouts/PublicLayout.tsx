import type { PropsWithChildren } from "react";
import { PublicFooter } from "./Footer";
import { PublicHeader } from "./Header";

export function PublicLayout({ children }: PropsWithChildren) {
	return (
		<>
			<PublicHeader />
			<main className="bg-white">{children}</main>
			<PublicFooter />
		</>
	);
}
