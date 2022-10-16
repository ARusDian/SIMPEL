import { User } from "@/types";
import { NewResearchContributor, ResearchContributor } from "./ResearchContributor";
import { BaseResearchDocument, NewResearchDocument, ResearchDocument } from "./ResearchDocument";
import { ResearchType } from "./ResearchType";


export interface BaseResearch { 
    id?: number;
    name: string,
    description: string,
    research_type: ResearchType,
    research_contributors: Array<ResearchContributor>,
    research_documents: Array<BaseResearchDocument>,
}

export interface NewResearch extends BaseResearch {
    research_contributors: Array<NewResearchContributor>,
    research_documents: Array<NewResearchDocument>,
}

export interface Research extends BaseResearch{
    id: number;
    research_documents: Array<ResearchDocument>;
}

export function createDefaultResearch(user : User): NewResearch { 
    return {
        name: '',
        description: '',
        research_type: {
            id: 0,
            name: '',
        },
        research_contributors: [
            {
                id: 0,
                user: user,
                contributor_type: 'ketua',
            }
        ],
        research_documents: [],
    }
}


