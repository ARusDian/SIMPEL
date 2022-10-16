import { BaseUser } from "@/types";

export interface BaseResearchContributor{
    id?: number,
    user: BaseUser,
    contributor_type: string,
}

export interface ResearchContributor extends BaseResearchContributor{
    
}

export interface NewResearchContributor extends BaseResearchContributor {
    
}

export function createDefaultResearchContributor(): BaseResearchContributor {
    return {
        id: 0,
        user: {
            id: 0,
            name: '',
            email: '',
            phone_number: '',
        },
        contributor_type: 'anggota',
    }
}
