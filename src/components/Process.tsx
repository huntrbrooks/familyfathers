import { ProcessContent } from "@/lib/content";
import { ProcessClient } from "./ProcessClient";
import { getContent } from "@/lib/content";

export async function Process() {
  const content: ProcessContent = await getContent("process");
  
  return <ProcessClient content={content} />;
}
