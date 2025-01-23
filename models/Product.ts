import mongoose from "mongoose";

export interface ProductDoc extends mongoose.Document {
  name: string;
  image: string;
  price: number;
  news: boolean;
  description: string;
  version: number;
}

export interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductDoc): ProductDoc;
}

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    price: Number,
    description: String,
    news: {
      type: Boolean,
      default: false,
    },
    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  ProductSchema
);
