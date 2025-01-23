import mongoose from "mongoose";
import { UserRole } from "../helper/enums";
import { hash } from "argon2";

export interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  nationalCode: string;
  mobile: string;
  email: string;
  type: UserRole;
  password: string;
  version: number;
  refreshToken: string;
  accessToken: string;
  sms: string;
  sms_time: string;
  hashed: string;
  updatedAt: Date;
  createAt: Date;
}

export interface UserModel extends mongoose.Model<UserDoc> {
  [x: string]: any;
  build(attrs: UserDoc): UserDoc;
}

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    nationalCode: String,
    refreshToken: String,
    birthDate: String,
    hashed: String,
    type: {
      type: String,
      enum: [UserRole.user, UserRole.admin, UserRole.sub_admin],
    },
    password: {
      type: String,
      select: false,
    },
    accessToken: {
      type: String,
    },

    sms: {
      type: String,
      default: "",
    },
    sms_time: {
      type: String,
      default: "",
    },

    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(
        _doc: any,
        ret: Record<string, any>,
        _options: mongoose.ToObjectOptions
      ) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

UserSchema.pre("save", async function (next) {
  const hashed = await hash(this.get("password"));
  this.set("password", hashed);
  next();
});

export const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);
