import mongoose, { Schema, Document, Model } from "mongoose";
import { IProperty } from "../interfaces/Property";

export interface PropertyDocument extends IProperty, Document {}

const PropertySchema: Schema = new Schema(
  {
    _id: String,
    referenceCode: String,
    type: String,
    agent: {
      firstName: String,
      lastName: String,
    },
    listing: {
      value: Number,
      currency: String,
      price: {
        price: Number,
        currency: String,
      },
      createdAt: Date,
      updatedAt: Date,
    },
    services: [
      {
        id: Number,
        name: String,
        type: Number,
      },
    ],
    marketStats: {
      history: Array,
    },
    attributes: {
      totalSurface: Number,
    },
    pictures: [
      {
        url: String,
      },
    ],
  },
  { collection: "mls" }
);

const Property: Model<PropertyDocument> =
  mongoose.models.Property ||
  mongoose.model<PropertyDocument>("Property", PropertySchema);

export default Property;
