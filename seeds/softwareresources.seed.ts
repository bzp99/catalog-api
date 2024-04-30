import { SoftwareResource } from "../src/models";
import { ISoftwareResource } from "../src/types/softwareresource";

export async function seedSoftwareResources() {
  try {
    // SoftwareResources examples seeding.
    const softwareResources: ISoftwareResource[] = [];
    for (let i = 0; i < 5; i++) {
      const softwareResource: ISoftwareResource = {
        providedBy: `Provider ${i}`,
        exposedThrough: [
          `https://api.example.com/api${i}`,
          `https://www.example.com/website${i}`,
        ],
        locationAddress: [{ countryCode: "FR" }],
        schema_version: `1.0.${i}`,
        jsonld: `{}`,
        createdAt: new Date(),
        updatedAt: undefined,
        copyrightOwnedBy: [`Company ${i}`],
        license: [`License ${i}`],
        policy: [
          {
            permission: [`execute`, `install`],
            prohibition: [`reverse engineer`, `redistribute`],
          },
        ],
        aggregationOf: [`Software Component ${i}`],
        name: `Software Resource ${i} Name`,
        description: `Description of Software Resource ${i}`,
      };
      softwareResources.push(softwareResource);
    }
    await SoftwareResource.deleteMany({});
    await SoftwareResource.insertMany(softwareResources);
  } catch (error: any) {
    throw new Error(`Seed error for data: ${error.message}`);
  }
}
