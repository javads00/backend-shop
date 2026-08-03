import { Request } from "express";

import config from "../../config";
import { ServerError } from "../../utils/errors";
import { Product } from "../../models/Product";

export class ProductService {
  constructor() {}

  async create(req: Request) {
    try {
      const formData = req.body;

      await Product.create({ ...formData });

      return {
        success: true,
        data: [],
      };
    } catch (error) {
      return {
        success: false,
        error: new ServerError(config.langs[req.local].server_error),
      };
    }
  }

  async get(req: Request) {
    try {
      let { news } = req.query;
      let query;

      if (news) {
        query = {
          news: true,
        };
      } else {
        query = { news: false };
      }

      let products = await Product.find(query);

      return {
        success: true,
        data: products,
      };
    } catch (error) {
      return {
        success: false,
        error: new ServerError(config.langs[req.local].server_error),
      };
    }
  }
}
