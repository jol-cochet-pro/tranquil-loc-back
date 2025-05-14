import { z } from "zod";

export const generateSelector = <T extends z.ZodRawShape>(
    schema: z.ZodObject<T>
  ): Record<keyof T, true> => {
    const shape = schema.shape;
    const keys = Object.keys(shape) as (keyof T)[];
    const selector: Record<keyof T, true> = {} as any;
    keys.forEach((key) => {
      selector[key] = true;
    });
    return selector;
  };