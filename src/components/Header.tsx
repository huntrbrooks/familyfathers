import { getContent } from "@/lib/content";
import { HeaderClient } from "./HeaderClient";

export async function Header() {
  const footerContent = await getContent("footer");
  
  return <HeaderClient navLinks={footerContent.navLinks} />;
}
