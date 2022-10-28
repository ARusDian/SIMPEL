import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/AppLayout';
import { NewResearchDocumentCategory } from '@/Models/Research/ResearchDocumentCategory';
import { useForm } from '@inertiajs/inertia-react';

import Form from './Form';

interface Props {
    research_document_category: NewResearchDocumentCategory
}

export default function Edit(props: Props) {
    let research_document_category = props.research_document_category
    let form = useForm<NewResearchDocumentCategory>(
        props.research_document_category
    );
    
    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.clearErrors();
        // php does'nt support PUT so...
        // @ts-ignore
        form.data._method = 'PUT';
        form.post(route('research-document-category.update', research_document_category.id), {
            onError: (errors) => {
                console.log(form.data);
                console.log(errors);
            },
            onSuccess: () => {
                console.log('success');
            }
        });
    }

    return (
        <AppLayout title={"Tambah Kategori Dokumen Penelitian"}>
            <div className='py-12'>
                <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="flex justify-between">
                            <div className="text-2xl">
                                Edit Kategori Dokumen
                            </div>
                            <button className="btn btn-primary">
                                <a href={route('research-document-category.index')}>
                                    Kembali
                                </a>
                            </button>
                        </div>
                        <form className="flex-col gap-5" onSubmit={onSubmit}>
                            <Form
                                form={form}
                                className="my-5"
                            />
                            <button
                                className="btn btn-warning py-2 px-4 rounded mt-10 w-full"
                                type="submit"
                                disabled={form.processing}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
