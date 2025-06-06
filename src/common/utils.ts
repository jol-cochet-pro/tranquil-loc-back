import { ProSituation, DocumentType } from "generated/prisma";
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

export const getDocumentTypesFromSituation = (situation: ProSituation) => {
  const documents: DocumentType[] = [
    DocumentType.IDENTITY_DOCUMENTS,
    DocumentType.PROOF_OF_ADDRESS,
    DocumentType.TAX_NOTICE,
    DocumentType.OTHER,
  ];
  switch (situation) {
    case ProSituation.CDD:
    case ProSituation.CDI:
      documents.push(DocumentType.EMPLOYMENT_CONTRACT);
      documents.push(DocumentType.LAST_THREE_PAYSLIPS);
      break;
    case ProSituation.RETIRED:
      documents.push(DocumentType.PENSION_CERTIFICATE);
      break;
    case ProSituation.APPRENTICE:
      documents.push(DocumentType.APPRENTICESHIP_FORM);
      documents.push(DocumentType.SCHOOL_ENROLLMENT_CERTIFICATE);
      break;
    case ProSituation.UNEMPLOYED:
      documents.push(DocumentType.ARE_CERTIFICATE);
      documents.push(DocumentType.JOB_OFFER);
      break;
    case ProSituation.STUDENT:
      documents.push(DocumentType.SCHOOL_ENROLLMENT_CERTIFICATE);
      break;
    case ProSituation.OFFICIAL:
      documents.push(DocumentType.EMPLOYER_CERTIFICATE);
      break;
    case ProSituation.FREELANCE:
      documents.push(DocumentType.REGISTRATION_SIRENE);
      documents.push(DocumentType.FINANCIAL_STATEMENT);
      break;
    case ProSituation.OTHER:
    default:
      break;
  }
  return documents;
}
