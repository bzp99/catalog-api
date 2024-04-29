import { dcterms } from "./dcterms";

export class CatalogRecord {
  public title: string;
  public description: string;
  public listingDate: string;
  public update: string; // modificationDate;
  public primaryTopic: any;
  public conformsTo: dcterms.Standard;
}
