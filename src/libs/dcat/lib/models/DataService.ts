import { Dataset } from "./Dataset";
import { Resource } from "./Resource";

export class DataService extends Resource {
  public endpointURL?: string | string[];
  public endpointDescription?: string;
  public servesDataset?: Dataset[];
}
