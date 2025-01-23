import { Request, Response, NextFunction } from "express";
import { responseFormat } from "../utils/responseFormat";
import config from "../config";
import { consoleLogger } from "../helper/consoleLogger";
import { SliderService } from "../services/slider/slider.service";
import { uploadSliderImage } from "../middleware/uploads/imageUploads";

const sliderService = new SliderService();

/**
 * @method : POST
 * @path : '/slider/dashboard'
 * @description : create  for dashboard
 * @access : Private
 */
export const addSliderChart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await sliderService.add(req);

    if (result.success === false) {
      return next(result.error!);
    }

    responseFormat({
      req,
      res,
      statusCode: 200,
      message: config.langs[req.local].create_slider,
      result: result.data,
    });
  } catch (error) {
    consoleLogger(error.message);
    return next(new Error());
  }
};

/**
 * @method : POST
 * @path : '/dashboard/upload'
 * @description : create upload file
 * @access : Private
 */

export const uploadFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let file: any = req.files;

    let response = await uploadSliderImage(file, "slider");

    if (response.success === false) {
      return next(response.error!);
    }

    responseFormat({
      req,
      res,
      statusCode: 200,
      message: config.langs[req.local].uploadImage,
      result: response.result,
    });
  } catch (error) {
    console.log({ error });

    consoleLogger(error.message);
    return next(new Error());
  }
};

//////slider site

/**
 * @method : POST
 * @path : '/slider'
 * @description : create  for site
 * @access : Private
 */
export const addSliderSite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await sliderService.addSite(req);

    if (result.success === false) {
      return next(result.error!);
    }

    responseFormat({
      req,
      res,
      statusCode: 200,
      message: config.langs[req.local].create_slider,
      result: result.data,
    });
  } catch (error) {
    consoleLogger(error.message);
    return next(new Error());
  }
};

/**
 * @method : POST
 * @path : '/slider/upload'
 * @description : create upload file
 * @access : Private
 */

export const uploadSliderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let file: any = req.files;

    let response = await uploadSliderImage(file, "slider");

    if (response.success === false) {
      return next(response.error!);
    }

    responseFormat({
      req,
      res,
      statusCode: 200,
      message: config.langs[req.local].uploadImage,
      result: response.result,
    });
  } catch (error) {
    console.log({ error });

    consoleLogger(error.message);
    return next(new Error());
  }
};

/**
 * @method : GET
 * @path : '/slider'
 * @description : get data  slider site
 * @access : Private
 */
export const getSliderSite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await sliderService.getSlider(req);

    if (result.success === false) {
      return next(result.error!);
    }

    responseFormat({
      req,
      res,
      statusCode: 200,
      message: config.langs[req.local].success,
      result: result.data || [],
    });
  } catch (error) {
    consoleLogger(error.message);
    return next(new Error());
  }
};
