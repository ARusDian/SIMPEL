import React from 'react';

import JetInput from '@/Components/Jetstream/Input';
import InputError from '@/Components/Jetstream/InputError';
import { ErrorHelper } from '@/Models/ErrorHelper';
import {
    DocumentCategoryType, NewResearchDocumentCategory
} from '@/Models/Research/ResearchDocumentCategory';
import { InertiaFormProps } from '@inertiajs/inertia-react';

interface Props extends React.HTMLAttributes<HTMLElement>{
    form: InertiaFormProps<NewResearchDocumentCategory>,
    className? : string
}

export default function Form(props: Props) {
    
    let form = props.form;
    let errors = new ErrorHelper(form.errors);

    console.log(form.data);

    return (
        <div className={`flex-col gap-5 ${props.className}`}>
            <div className="form-control w-full">
                <label className="label" htmlFor='name'>
                    <span className="label-text">Nama Kategori</span>
                </label>
                <JetInput
                    id='name'
                    type="text"
                    placeholder="Nama Kategori"
                    className="input block input-bordered w-full"
                    value={form.data.name}
                    onChange={e => form.setData('name', e.target.value)}
                    autoComplete="name"
                />
                <InputError message={errors.get('name')} className="mt-2" />
            </div>
            <div className="form-control w-full">
                <label className="label" htmlFor='type'>
                    <span className="label-text">Tipe Kategori Dokumen</span>
                </label>
                <select
                    id="type"
                    className="mt-1 block w-1/2"
                    value={form.data.type}
                    onChange={e => form.setData('type', e.currentTarget.value as DocumentCategoryType)}
                >
                    <option value="luaran">Luaran</option>
                    <option value="lainnya">Lainnya</option>
                </select>
                <InputError message={errors.get('name')} className="mt-2" />
            </div>
        </div>
    )
}
