import mongoose from "mongoose";

/**
 * Returns the id of a populated or non populated field
 * without needing to know in advance if the field has been
 * properly populated
 */
export const getDocumentId = (doc: any): string => {
  if (!doc) return "";
  if (typeof doc === "string") return doc;
  if (doc instanceof mongoose.Types.ObjectId) return doc.toString();
  if (doc.id) return doc.id;
  return doc._id?.toString();
};
