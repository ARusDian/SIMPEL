export interface BaseResearchType {
    id?: number,
    name: string,
    description: string,
}

export interface NewResearchType extends BaseResearchType {
}

export interface ResearchType extends BaseResearchType {
    id: number,
}
