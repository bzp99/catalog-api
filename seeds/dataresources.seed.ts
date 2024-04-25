import { DataResource } from "../src/models";
import { IDataResource } from "../src/types/dataresource";

export async function seedDataResources() {
  try {
    // DataResources examples seeding.
    const dataResources: IDataResource[] = [];
    for (let i = 0; i < 5; i++) {
      const dataResource: IDataResource = {
        producedBy: `Producer ${i}`,
        exposedThrough: [
          `https://api.example.com/api${i}`,
          `https://www.example.com/website${i}`,
        ],
        containsPII: i % 2 === 0,
        category: `Category ${i}`,
        schema_version: `1.0.${i}`,
        jsonld: `{}`,
        createdAt: new Date(),
        updatedAt: undefined,
        copyrightOwnedBy: [`Company ${i}`],
        license: [`License ${i}`],
        policy: [
          {
            permission: [],
            prohibition: [],
          },
        ],
        aggregationOf: [`Data Source ${i}`],
        name: `Data Resource ${i} Name`,
        description: `Description of Data Resource ${i}`,
      };
      dataResources.push(dataResource);
    }
    await DataResource.deleteMany({});
    await DataResource.insertMany(dataResources);
  } catch (error: any) {
    throw new Error(`Seed error for data: ${error.message}`);
  }
}
