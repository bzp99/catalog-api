import { DatasetSeries } from "./DatasetSeries";
import { Distribution } from "./Distribution";
import { Resource } from "./Resource";
import { dcterms } from "./dcterms";

export class Dataset extends Resource {
  public distribution?: Distribution | Distribution[];
  public frequency?: string;
  public inSeries?: DatasetSeries;
  public spatial?: string; // geographicalCoverage;
  public spatialResolution?: number;
  public temporalCoverage?: dcterms.PeriodOfTime;
  public temporalResolution?: string;
}
