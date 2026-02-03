import { ServiceAreasContent } from "@/lib/content";
import { ServiceAreasClient } from "./ServiceAreasClient";
import { getContent } from "@/lib/content";

export async function ServiceAreas() {
  const content: ServiceAreasContent = await getContent("serviceAreas");
  
  return <ServiceAreasClient content={content} />;
}
