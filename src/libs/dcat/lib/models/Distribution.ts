import { DataService } from "./DataService";

export class Distribution {
  public "@id": string;
  public "@type": string;
  public title: string;
  public description: string;
  //
  public releaseDate?: string;
  public updateDate?: string;
  public license?: string;
  public accessRights?: string;
  public rights?: string;
  public hasPolicy?: boolean;
  public accessURL?: string | string[];
  public accessService?: DataService;
  public downloadURL?: string;
  public byteSize?: number;
  public spatialResolution?: string;
  public temporalResolution?: string;
  public conformsTo?: string;
  public mediaType?: string;
  public format?: string;
  public compressionFormat?: string;
  public packagingFormat?: string;
}
