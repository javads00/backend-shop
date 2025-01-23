import { Request } from "express";

import config from "../../config";
import { ServerError } from "../../utils/errors";
import { AddSliderTypes } from "./slider.type";
import { paginate } from "../../services/common/pagination";
import { Slider } from "../../models/Slider";

export class SliderService {
  constructor() {}

  async add(req: Request) {
    try {
      const { image, name } = req.body as AddSliderTypes;

      await Slider.create({
        image,
        name: name,
        type: "dashboard_main",
      });

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
      const { id, limit, page } = req.query;
      let query = {
        type: "dashboard_main",
        is_delete: false,
      };
      if (id) {
        const slider = await Slider.findOne({
          ...query,
          _id: id,
        }).select("image name createdAt");

        return {
          success: true,
          data: slider,
        };
      }
      const q = Slider.find(query).select("image name createdAt");
      const count = await Slider.find().countDocuments(query);
      const data = await paginate(
        q,
        count,
        `${limit}` || "10",
        `${page}` || "1"
      );

      return {
        success: true,
        data: {
          data,
          count,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: new ServerError(config.langs[req.local].server_error),
      };
    }
  }

  async getSliderWeb(req: Request) {
    try {
      const slider = await Slider.find({
        is_delete: false,
        type: "dashboard_main",
      }).select("image name createdAt ");

      return {
        success: true,
        data: slider,
      };
    } catch (error) {
      return {
        success: false,
        error: new ServerError(config.langs[req.local].server_error),
      };
    }
  }

  async addSite(req: Request) {
    try {
      const { image, name } = req.body as AddSliderTypes;

      await Slider.create({
        image,
        name: name,
      });

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

  async getSlider(req: Request) {
    try {
      const { id, limit, page } = req.query;

      if (id) {
        const slider = await Slider.findOne({
          _id: id,
        }).select("image name   createdAt ");
        return {
          success: true,
          data: slider,
        };
      }

      if (limit || page) {
        const q = Slider.find().select("image name createdAt");
        const count = await Slider.find().countDocuments();
        const data = await paginate(
          q,
          count,
          `${limit}` || "10",
          `${page}` || "1"
        );

        return {
          success: true,
          data: {
            data,
            count,
          },
        };
      }

      const results = await Slider.find().select("image name createdAt ");
      return {
        success: true,
        data: results,
      };
    } catch (error) {
      return {
        success: false,
        error: new ServerError(config.langs[req.local].server_error),
      };
    }
  }
}
