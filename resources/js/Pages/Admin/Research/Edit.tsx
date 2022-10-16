import useTypedPage from "@/Hooks/useTypedPage";
import AppLayout from "@/Layouts/AppLayout";
import { NewResearch } from "@/Models/Research/Research";
import { ResearchDocumentCategory } from "@/Models/Research/ResearchDocumentCategory";
import { ResearchType } from "@/Models/Research/ResearchType";
import { User } from "@/types";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import route from "ziggy-js";
import Form from "./Form/Form";

interface Props {
    research: NewResearch,
    research_types: Array<ResearchType>,
    users: Array<User>,
    research_document_categories: Array<ResearchDocumentCategory>,
}


export default function Edit(props: Props) {
    let page = useTypedPage<{ research: NewResearch }>();
    let form = useForm<NewResearch>(
        page.props.research,
    );

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.clearErrors();
        // php does'nt support PUT so...
        // @ts-ignore
        form.data._method = 'PUT';
        form.post(route('research.update',page.props.research.id), {
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
        <AppLayout title="Edit Research">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="mt-8 flex justify-between">
                            <div className="text-2xl">
                                Edit Data Penelitian
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
            </div>
        </AppLayout>
    );
}
