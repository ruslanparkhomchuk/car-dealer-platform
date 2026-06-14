import { PublicLayout } from "@/components/layouts/PublicLayout";
import type { PropsWithChildren } from "react";

export default function PresentationLayout(props: PropsWithChildren) {
	return <PublicLayout>{props.children}</PublicLayout>;
}
