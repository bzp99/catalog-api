import { GlobalDataType } from "../src/models";
import { IGlobalDataType } from "../src/types/globaldatatype";

export async function seedGlobalDataType() {
  try {
    // GlobalDataType examples seeding.
    const globalDataTypes: IGlobalDataType[] = [];
    for (let i = 0; i < 5; i++) {
      const globalDataType: IGlobalDataType = {
        category: `Category ${i}`,
        description: `Category ${i} Description`,
      };
      globalDataTypes.push(globalDataType);
    }
    await GlobalDataType.deleteMany({});
    await GlobalDataType.insertMany(globalDataTypes);
  } catch (error: any) {
    throw new Error(`Seed error for data: ${error.message}`);
  }
}
