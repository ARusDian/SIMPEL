import React from 'react';
import { InertiaFormProps } from "@inertiajs/inertia-react";
import { NewResearch } from '@/Models/Research/Research';
import { ErrorHelper } from '@/Models/ErrorHelper'
import JetInput from '@/Components/Jetstream/Input';
import InputError from '@/Components/Jetstream/InputError';
import Select from 'react-select';
import ContributorForm from './ContibutorsForm';
import { User } from '@/types';
import DocumentsForm from './DocumentsForm';
import { ResearchType } from '@/Models/Research/ResearchType';
import { ResearchDocumentCategory } from '@/Models/Research/ResearchDocumentCategory';

interface Props extends React.HTMLAttributes<HTMLElement> {
    form: InertiaFormProps<NewResearch>,
    research_types: Array<ResearchType>,
    research_document_categories: Array<ResearchDocumentCategory>,
    users: Array<User>,
    className: string,
}

export default function Form(props: Props) {
    let { form } = props;
    let errors = new ErrorHelper(form.errors);

    function handleDataChange<K extends keyof NewResearch, V>(
        name: K,
        callback?: (arg: NewResearch[K], value: V) => void,
    ) {
        return (value: V) => {
            if (callback != null) {
                callback(form.data[name], value);
            }

            form.setData(name, form.data[name]);
        };
    }

    return (
        <div className='flex-col gap-5'>
            <div className="form-control w-full">
                <label className="label" htmlFor='name'>
                    <span className="label-text">Judul Penelitian</span>
                </label>
                <JetInput
                    id='name'
                    type="text"
                    placeholder="Judul Penelitian"
                    className="input block input-bordered w-full"
                    value={form.data.name}
                    onChange={e => form.setData('name',e.target.value)}
                    autoComplete="name"
                />
                <InputError message={errors.get('name')} className="mt-2" />
            </div>
            <div className="form-control w-full ">
                <label className="label" htmlFor='description'>
                    <span className="label-text">Deskripsi Penelitian</span>
                </label>
                <JetInput
                    id='description'
                    type="text"
                    placeholder="Deskripsi Penelitian"
                    className="input block input-bordered w-full "
                    value={form.data.description}
                    onChange={e => form.setData('description', e.currentTarget.value)}
                    autoComplete="description"
                />
                <InputError message={errors.get('description')} className="mt-2" />
            </div>
            <div className="form-control w-full ">
                <label className="label" htmlFor='research_type'>
                    <span className="label-text">Jenis Penelitian</span>
                </label>
                <Select
                    id='research_type'
                    isSearchable
                    options={props.research_types}
                    getOptionLabel={(research_type) => research_type.name}
                    getOptionValue={(research_type) => research_type.id.toString()}
                    value={form.data.research_type}
                    onChange={value => form.setData('research_type', value!)}
                    className="z-10"
                />
                <InputError message={errors.get('research_type')} className="mt-2" />
            </div>
            <ContributorForm
                form={form}
                users={props.users}
                contributors={form.data.research_contributors}
                onChange={handleDataChange('research_contributors')}
            />
            <DocumentsForm
                form={form}
                documents={form.data.research_documents}
                categories={props.research_document_categories}
                onChange={handleDataChange('research_documents')}
            />
        </div>
    )
}
