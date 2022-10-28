import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/AppLayout';
import { NewResearchDocumentCategory } from '@/Models/Research/ResearchDocumentCategory';
import { useForm } from '@inertiajs/inertia-react';

import Form from './Form';

export default function Create() {

    let form = useForm<NewResearchDocumentCategory>(
        {
            name: '',
            type: 'luaran'
        }
    );

    function onSubmit(e: React.FormEvent) {
        console.log(form.data);
        e.preventDefault();
        form.clearErrors();
        form.post(route('research-document-category.store'), {
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
                                Tambah Kategori Dokumen Baru
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
        </AppLayout>
    )
}
