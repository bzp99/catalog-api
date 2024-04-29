import { odrl } from "./odrl";
import { skos } from "./skos";
import { dcterms } from "./dcterms";
import { foaf } from "./foaf";
import { vcard } from "./vcard";
import { prov } from "./prov";

export class Resource {
  public "@id"?: string;
  public "@context"?: string;
  public "@type": string;
  public title: string;
  public description: string;
  //
  public accessRights?: dcterms.RightsStatement;
  public conformsTo?: dcterms.Standard;
  public contactPoint?: vcard.Kind;
  public creator?: foaf.Agent;
  public releaseDate?: Date;
  public update?: Date;
  public language?: string;
  public publisher?: foaf.Agent;
  public identifier?: string;
  public theme?: skos.Concept;
  public type?: string;
  public relation?: string | string[];
  public qualifiedRelation?: string;
  public keyword?: string;
  public landingPage?: string;
  public qualifiedAttribution?: prov.Attribution;
  public license?: string | string[];
  public rights?: string | string[];
  public hasPart?: Resource | Resource[];
  public hasPolicy?: odrl.Policy | odrl.Policy[];
  public isReferencedBy?: Resource;
  public previousVersion?: Resource;
  public hasVersion?: Resource;
  public currentVersion?: Resource;
  public replaces?: Resource;
  public version?: string;
  public versionNotes?: string;
  public status?: string;
  public first?: Resource;
  public last?: Resource;
  public previous?: Resource;
}
