import { getContent, ContactContent } from "@/lib/content";
import { ContactFormClient } from "./ContactForm";

export async function Contact() {
  const content: ContactContent = await getContent("contact");
  
  return <ContactFormClient content={content} />;
}
