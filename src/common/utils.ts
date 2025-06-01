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

export const b64toBlob = (b64Data: string, contentType: string, sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays: Uint8Array<ArrayBuffer>[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
