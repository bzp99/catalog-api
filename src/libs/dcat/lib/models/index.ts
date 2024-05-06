/* eslint-disable @typescript-eslint/no-namespace */
import { Catalog as _Catalog } from "./Catalog";
import { CatalogRecord as _CatalogRecord } from "./CatalogRecord";
import { Checksum as _Checksum } from "./Checksum";
import { DataService as _DataService } from "./DataService";
import { Dataset as _Dataset } from "./Dataset";
import { DatasetSeries as _DatasetSeries } from "./DatasetSeries";
import { Distribution as _Distribution } from "./Distribution";
import { PeriodOfTime as _PeriodOfTime } from "./PeriodOfTime";
import { Policy as _Policy } from "./odrl/Policy";
import { Relationship as _Relationship } from "./Relationship";
import { Resource as _Resource } from "./Resource";
import { Role as _Role } from "./Role";

export namespace dcat {
  export class Catalog extends _Catalog {}
  export class CatalogRecord extends _CatalogRecord {}
  export class Checksum extends _Checksum {}
  export class DataService extends _DataService {}
  export class Dataset extends _Dataset {}
  export class DatasetSeries extends _DatasetSeries {}
  export class Distribution extends _Distribution {}
  export class PeriodOfTime extends _PeriodOfTime {}
  export class Policy extends _Policy {}
  export class Relationship extends _Relationship {}
  export class Resource extends _Resource {}
  export class Role extends _Role {}
}
