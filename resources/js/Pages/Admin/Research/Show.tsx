import AppLayout from "@/Layouts/AppLayout";
import { getStorageFileUrl } from "@/Models/FileModel";
import { Research } from "@/Models/Research/Research";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import { Delete } from "@mui/icons-material";
import React from "react";
import { confirmAlert } from "react-confirm-alert";
import route from "ziggy-js";
import Edit from "./Edit";

interface Props {
    research: Research,
}

export default function Show(props: Props) {
    let research = props.research;

    return (
        <AppLayout
            title={`Penelitian ${research.name}`}
        >

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col">
                        <div className="basis-1/12 flex justify-between">
                            <div className="flex-grow">
                                Data Penelitian
                            </div>
                            <div className="flex gap-3">
                                <InertiaLink
                                    className="btn btn-square btn-warning rounded py-2 px-10  focus:outline-none border-2"
                                    href={route('research.edit', research.id)}
                                >
                                    Edit
                                </InertiaLink>
                                <button
                                    type="submit"
                                    className="btn btn-square btn-error rounded  py-2 px-10 focus:outline-none border-2 "
                                >
                                    <label htmlFor="my-modal">Delete</label>
                                </button>
                                <input type="checkbox" id="my-modal" className="modal-toggle" />
                                <div className="modal">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">Confirm to Delete</h3>
                                        <p className="py-4">Are you sure to do this.</p>
                                        <div className="modal-action">
                                            <label htmlFor="my-modal" className="btn btn-error"
                                                onClick={
                                                    () => {
                                                        Inertia.post(route('research.destroy', research.id), {
                                                            _method: 'DELETE',
                                                        });
                                                    }
                                                }
                                            >Yes</label>
                                            <label htmlFor="my-modal" className="btn">No!</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow flex">
                            <div className="flex flex-col gap-2 basis-1/2">
                                <div>
                                    Nama Penelitian : <strong>{research.name}</strong>
                                </div>
                                <div>
                                    Jenis Penelitian : <strong>{research.research_type.name}</strong>
                                </div>
                                <div>
                                    Deskripsi Penelitian
                                    <div >
                                        {research.description}
                                    </div>
                                </div>
                                <div>
                                    Daftar Kontributor
                                    <ol className="list-decimal list-outside">
                                        {research.research_contributors.map((contributor) => {
                                            return (
                                                <li key={contributor.id} className="ml-8">
                                                    {contributor.user.name} - <strong>{contributor.contributor_type}</strong>
                                                </li>
                                            )
                                        })}
                                    </ol>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 basis-1/2">
                                <div className="basis-1/12">
                                    Dokumen Penelitian
                                </div>
                                <div>
                                    <ol className="list-decimal list-outside">
                                        {research.research_documents.map((document) => {
                                            return (
                                                <li key={document.id} className="ml-8">
                                                    <a href={getStorageFileUrl(document.document_file)} target="_blank" rel="noreferrer">
                                                        {document.name}
                                                    </a>
                                                </li>
                                            )
                                        })}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
