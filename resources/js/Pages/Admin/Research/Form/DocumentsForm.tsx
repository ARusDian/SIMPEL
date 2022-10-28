import React from 'react';
import Select from 'react-select';

import AddNewHeader from '@/Components/AddNewHeader';
import { getStorageFileUrl } from '@/Models/FileModel';
import { getUniqueKey } from '@/Models/Helper';
import { NewResearch } from '@/Models/Research/Research';
import {
    createDefaultResearchDocument, NewResearchDocument
} from '@/Models/Research/ResearchDocument';
import { ResearchDocumentCategory } from '@/Models/Research/ResearchDocumentCategory';
import { InertiaFormProps } from '@inertiajs/inertia-react';
import { Viewer, Worker } from '@react-pdf-viewer/core';

interface Props {
    form: InertiaFormProps<NewResearch>,
    className?: string,
    documents: Array<NewResearchDocument>,
    categories: Array<ResearchDocumentCategory>,
    onChange: (value: Array<NewResearchDocument>) => void
}
export default function DocumentForm(props: Props) {
    console.log(props.categories);
    function handleChange<T>(callback: (args0: T) => void) {
        return (e: T) => {
            callback(e);
            props.onChange(props.documents);
        };
    }


    return (
        <div className={`flex-col gap-5 my-8 ${props.className}`}>
            <div className="divider text-lg">Dokumen Penelitian</div>
            <div className="flex-col gap-2">
                <AddNewHeader
                    title="Daftar Dokumen"
                    id="add-new-document"
                    onClick={handleChange(
                        () => props.documents.push(createDefaultResearchDocument())
                    )}
                />
                {
                    props.form.data.research_documents.length > 0 && (
                        props.form.data.research_documents.map((research_document, index) => {
                            return (
                                <div key={getUniqueKey(research_document)}>
                                    <div className="my-5 flex gap-2">
                                        <div className="flex-1">
                                            <label className="label" htmlFor={`document_name_${index}`}>
                                                Nama Dokumen
                                            </label>
                                            <input
                                                id={`document_name_${index}`}
                                                key={`document-${getUniqueKey(research_document)}-name`}
                                                type="text"
                                                className="input w-full"
                                                value={props.form.data.research_documents[index].name}
                                                onChange={handleChange(e => {
                                                    research_document.name = e.target.value;
                                                })}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="label" htmlFor={`document_category_${index}`}>
                                                Kategori Dokumen
                                            </label>
                                            <Select
                                                id="research_leader"
                                                key={`contributor-${index}-name`}
                                                options={props.categories}
                                                className="input w-full border-ghost"
                                                getOptionValue={(option) => option.id!.toString()}
                                                getOptionLabel={(option) => `${option.name} - ${option.type}`}
                                                value={props.form.data.research_documents[index].research_document_category}
                                                onChange={handleChange(e =>
                                                    research_document.research_document_category = e as ResearchDocumentCategory
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <label className="label" htmlFor={`document_file_${index}`}>
                                                <span className="label-text">Dokumen Penelitian</span>
                                            </label>
                                            <input
                                                id={`document_file_${index}`}
                                                key={`document-${getUniqueKey(research_document)}-file`}
                                                type="file"
                                                className="input p-2"
                                                onChange={handleChange((e: any) => {
                                                    research_document.document_file.file = e.target.files.item(0);
                                                    research_document.name = e.target.files.item(0).name;
                                                })}
                                            />
                                            <label className="label" htmlFor={`document_file_${index}`}>
                                                <span className="label-text-alt"></span>
                                                <span className="label-text-alt">Dalam bentuk PDF</span>
                                            </label>
                                        </div>
                                        <button
                                            className="btn btn-error btn-md"
                                            type="button"
                                            onClick={handleChange(_ => {
                                                props.documents.splice(index, 1);
                                            })}
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                    <div
                                        className="mt-4 flex items-center justify-center"
                                        key={`document-${getUniqueKey(research_document)}-preview`}
                                    >
                                        {research_document.document_file.file || research_document.document_file.path ? (
                                            <div
                                                className="border border-gray-300 rounded-md p-2 h-96 w-6/12 "
                                            >
                                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
                                                    <Viewer fileUrl={getStorageFileUrl(research_document.document_file)!} />
                                                </Worker>
                                            </div>
                                        ) : (
                                            <div
                                                className="border border-dashed border-gray-300 rounded-md p-2 w-8/12 flex justify-center items-center text-xl"
                                            >
                                                Preview area
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )
                }
            </div>
        </div>
    );
}
