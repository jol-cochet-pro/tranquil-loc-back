import { generateSelector } from "src/common/utils";
import { occupantSchema } from "../entities/occupant.entity";
import { documentSelector } from "src/documents/selector/document.selector";

export const occupantSelector = {
    ...generateSelector(occupantSchema),
    documents: {
        select: documentSelector
    }
};