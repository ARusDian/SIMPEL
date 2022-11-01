import React from 'react';

import JetInput from '@/Components/Jetstream/Input';
import InputError from '@/Components/Jetstream/InputError';
import { ErrorHelper } from '@/Models/ErrorHelper';
import { NewResearchType } from '@/Models/Research/ResearchType';
import { InertiaFormProps } from '@inertiajs/inertia-react';

;
interface Props extends React.HTMLAttributes<HTMLElement> {
    form: InertiaFormProps<NewResearchType>,
    className?: string
}

export default function Form(props: Props) {

    let form = props.form;
    let errors = new ErrorHelper(form.errors);

    return (
        <div className={`flex-col gap-5 ${props.className}`}>
            <div className="form-control w-full">
                <label className="label" htmlFor='name'>
                    <span className="label-text">Nama Tipe Penelitian</span>
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
                <label className="label" htmlFor='description'>
                    <span className="label-text">Deskripsi Tipe Penelitian</span>
                </label>
                <JetInput
                    id='description'
                    type="text"
                    placeholder="Nama Kategori"
                    className="input block input-bordered w-full"
                    value={form.data.description}
                    onChange={e => form.setData('description', e.target.value)}
                    autoComplete="description"
                />
                <InputError message={errors.get('description')} className="mt-2" />
            </div>
        </div>
    )
}
