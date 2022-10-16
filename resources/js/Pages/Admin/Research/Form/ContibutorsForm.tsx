import AddNewHeader from "@/Components/AddNewHeader";
import {  NewResearch } from "@/Models/Research/Research";
import { createDefaultResearchContributor, NewResearchContributor } from "@/Models/Research/ResearchContributor";
import { User } from "@/types";
import { InertiaFormProps } from "@inertiajs/inertia-react";
import React from "react";
import Select from "react-select";

interface Props {
    form: InertiaFormProps<NewResearch>,
    className?: string,
    users: Array<User>,
    contributors: Array<NewResearchContributor>,
    onChange: (value: Array<NewResearchContributor>) => void
}

export default function ContributorForm(props: Props) {

    function handleChange<T>(callback: (args0: T) => void) {
        return (e: T) => {
            callback(e);
            props.onChange(props.contributors);
            props.form.setData('research_contributors', props.contributors);
        };
    }


    return (
        <div className={`flex-col gap-5 my-8 ${props.className}`}>
            <div className="divider text-lg">Kontributor Penelitian</div>

            <div className="flex-col gap-2">
                <AddNewHeader
                    title="Daftar Kontributor"
                    id="add-new-contributor"
                    onClick={handleChange(
                        () => props.contributors.push(createDefaultResearchContributor())
                    )}
                />
                {
                    props.contributors.length > 0 && (
                        props.contributors.map((contributor, index) => {
                            if (index === 0) {
                                return (
                                    <div className="my-5" key={index}>
                                        <label className="label" htmlFor='research_leader'>
                                            Ketua Penelitian
                                        </label>
                                        <Select
                                            id="research_leader"
                                            key={`contributor-${index}-name`}
                                            options={props.users}
                                            getOptionValue={(option) => option.id.toString()}
                                            // getOptionLabel={(option) => `${option.name} - ${option.roles.map((role) => role.name).join(', ')}`}
                                            getOptionLabel={(option) => `${option.name}`}
                                            value={props.users.find((user) => user.id === contributor.user.id)}
                                            onChange={handleChange((value: any) => {
                                                if (typeof value === 'object') {
                                                    props.contributors[index].user = value;
                                                    props.form.setData('research_contributors', props.contributors);
                                                }
                                            })}
                                        />
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="flex my-5 gap-4" key={index}>
                                        <div className="flex-1">
                                            <label className="label" htmlFor='research_contributor'>
                                                Anggota Penelitian
                                            </label>
                                            <Select
                                                id="research_contributor"
                                                key={`contributor-${index}-name`}
                                                options={props.users}
                                                getOptionValue={(option) => option.id.toString()}
                                                // getOptionLabel={(option) => `${option.name} - ${option.roles.map((role) => role.name).join(', ')}`}
                                                getOptionLabel={(option) => `${option.name}`}
                                                value={props.users.find((user) => user.id === contributor.user.id)}
                                                onChange={handleChange((value: any) => {
                                                    if(typeof value === 'object') {
                                                        props.contributors[index].user = value;
                                                        props.form.setData('research_contributors', props.contributors);
                                                    }
                                                })}
                                            />
                                        </div>
                                        <button
                                            className="btn btn-error btn-md"
                                            type="button"
                                            onClick={handleChange(_ => {
                                                props.contributors.splice(index, 1);
                                            })}
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                )
                            }
                        })
                    )
                }
            </div>
        </div>
    );
}
