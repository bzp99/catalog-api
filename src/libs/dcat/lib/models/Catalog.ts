import { DataService } from "./DataService";
import { Dataset } from "./Dataset";
import { Resource } from "./Resource";

export class Catalog extends Dataset {
  public homepage?: string;
  public themes?: string[];
  public resource?: Resource | Resource[];
  public dataset?: Dataset | Dataset[];
  public service?: DataService[];
  public catalog?: Catalog | Catalog[];
}
