export interface BaseResearchDocumentCategory{
    id?: number;
    name: string;
    type: DocumentCategoryType
}

export interface ResearchDocumentCategory extends BaseResearchDocumentCategory { 
    id: number;
}

export interface NewResearchDocumentCategory extends BaseResearchDocumentCategory{}

export type DocumentCategoryType = 'luaran' | 'lainnya'
