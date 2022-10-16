export interface BaseResearchDocumentCategory{
    id?: number;
    name: string;
    type: 'luaran' | 'lainnya'
}

export interface ResearchDocumentCategory extends BaseResearchDocumentCategory { 
    id: number;
}
