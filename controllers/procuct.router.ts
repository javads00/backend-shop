import { Request, Response, NextFunction } from "express";
import { responseFormat } from "../utils/responseFormat";
import config from "../config";
import { consoleLogger } from "../helper/consoleLogger";
import { ProductService } from "../services/product/product.service";
import { uploadSliderImage } from "../middleware/uploads/imageUploads";

const productService = new ProductService();

/**
 * @method : POST
 * @path : '/product'
 * @description : create  for dashboard
 * @access : Private
 */
export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await productService.create(req);

    if (result.success === false) {
      return next(result.error!);
    }

    responseFormat({
      req,
      res,
      statusCode: 200,
      message: "محصول شما اضافه شد",
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

/**
 * @method : GET
 * @path : '/product/site'
 * @description : get  for dashboard
 * @access : Private
 */
export const getProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await productService.get(req);

    if (result.success === false) {
      return next(result.error!);
    }

    responseFormat({
      req,
      res,
      statusCode: 200,
      message: "محصول شما اضافه شد",
      result: result.data,
    });
  } catch (error) {
    consoleLogger(error.message);
    return next(new Error());
  }
};
