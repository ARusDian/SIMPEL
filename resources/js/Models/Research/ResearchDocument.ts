import { BaseDocumentFileModel, DocumentFileModel } from "../FileModel";
import { BaseResearchDocumentCategory, ResearchDocumentCategory } from "./ResearchDocumentCategory";

export interface BaseResearchDocument {
    id?: number,
    name: string,
    document_file?: BaseDocumentFileModel,
    research_document_category?: BaseResearchDocumentCategory,
}

export interface ResearchDocument extends BaseResearchDocument { 
    id: number,
    document_file: DocumentFileModel,
    research_document_category: ResearchDocumentCategory,
}

export interface NewResearchDocument extends BaseResearchDocument { 
    document_file: BaseDocumentFileModel,
    research_document_category?: BaseResearchDocumentCategory,
}


export function createDefaultResearchDocument(): NewResearchDocument {
    return {
        name: '',
        document_file: {
            path: undefined,
            disk: 'public',
            file: undefined,
            __isOpened: false,
        },
    }
}
