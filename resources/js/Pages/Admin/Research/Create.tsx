import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/AppLayout';
import { createDefaultResearch, NewResearch } from '@/Models/Research/Research';
import { ResearchDocumentCategory } from '@/Models/Research/ResearchDocumentCategory';
import { ResearchType } from '@/Models/Research/ResearchType';
import { User } from '@/types';
import { useForm } from '@inertiajs/inertia-react';

import Form from './Form/Form';

interface Props {
    research_types: Array<ResearchType>,
    users: Array<User>,
    research_document_categories: Array<ResearchDocumentCategory>,
    user : User
}


export default function Create(props: Props) {
    console.log(props);
    let form = useForm<NewResearch>(
        createDefaultResearch(props.user),
    );

    function onSubmit(e: React.FormEvent) {
        console.log(form.data.research_documents);
        e.preventDefault();
        form.clearErrors();
        form.post(route('research.store'), {
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
        <AppLayout title="New Research">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="mt-8 flex justify-between">
                            <div className="text-2xl">
                                Tambah Penelitian Baru
                            </div>
                            <div className="text-md my-3">
                                <button
                                    className="btn btn-error"
                                    onClick={
                                        () => {
                                            form.reset();
                                            form.clearErrors();
                                        }
                                    }>
                                    Reset Form
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-200 bg-opacity-25">
                        <div className="p-6">
                            <form className="flex-col gap-5" onSubmit={onSubmit}>
                                <Form
                                    form={form}
                                    research_types={props.research_types}
                                    className="my-5"
                                    users={props.users}
                                    research_document_categories={props.research_document_categories}
                                />
                                <button
                                    className="btn btn-primary py-2 px-4 rounded mt-10 w-full"
                                    type="submit"
                                    disabled={form.processing}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
