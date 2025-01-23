import mongoose from "mongoose";

export interface SliderDoc extends mongoose.Document {
  name: string;
  image: string;
  is_delete: boolean;
  version: number;
}

export interface SliderModel extends mongoose.Model<SliderDoc> {
  build(attrs: SliderDoc): SliderDoc;
}

const SliderSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
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

export const Slider = mongoose.model<SliderDoc, SliderModel>(
  "Slider",
  SliderSchema
);
