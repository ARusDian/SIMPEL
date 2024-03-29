import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/AppLayout';
import { getStorageFileUrl } from '@/Models/FileModel';
import { Research } from '@/Models/Research/Research';
import { User } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

interface Props {
    research: Research,
    isAdministrator: boolean,
    user: User,
}

export default function Show(props: Props) {
    let research = props.research;
    research.research_documents = research.research_documents.sort((a, b) => a.research_document_category.type < b.research_document_category.type ? 1 : -1);
    research.research_contributors = research.research_contributors.sort((a, b) => a.contributor_type < b.contributor_type ? 1 : -1);
    return (
        <AppLayout
            title={`Penelitian ${research.name}`}
        >

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-5">
                        <div className="basis-1/12 flex justify-between">
                            <div className="text-lg md:text-3xl">
                                Data Penelitian
                            </div>
                            <div className="flex flex-col md:flex-row gap-3">
                                <InertiaLink
                                    className="btn btn-square btn-primary rounded py-2 px-10  focus:outline-none border-2"
                                    href={route('research.index')}
                                >
                                    Kembali
                                </InertiaLink>
                                {props.isAdministrator || research.research_contributors.filter(
                                    (contributor) =>
                                        contributor.user.id === props.user.id &&
                                        contributor.contributor_type === 'ketua'
                                ).length > 0 ?
                                    <>
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
                                    </>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-5">
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
                                {research.research_contributors.length > 0 ?
                                    (
                                        <div className="flex flex-col gap-2 basis-1/2 max-w-screen">
                                            <div className="basis-1/12 text-lg">
                                                Daftar Kontributor
                                            </div>
                                            <table className="border table table-zebra w-full">
                                                <thead>
                                                    <tr>
                                                        <th className="border border-gray-300 px-4 py-2">Nama anggota</th>
                                                        <th className="border border-gray-300 px-4 py-2">Jabatan</th>
                                                        <th className="border border-gray-300 px-4 py-2">Kontribusi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {research.research_contributors.map((contributor) => {
                                                        return (
                                                            <tr key={contributor.id} className="ml-8">
                                                                <td>{contributor.user.name}</td>
                                                                <td>{contributor.user.roles[0].name}</td>
                                                                <td><strong>{contributor.contributor_type}</strong></td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-2 basis-1/2 max-w-screen">
                                            <div className="basis-1/12 text-lg">
                                                Tidak ada Kontributor
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            {research.research_documents.length > 0 ?
                                (
                                    <div className="flex flex-col gap-2 basis-1/2">
                                        <div className="basis-1/12 text-lg">
                                            Dokumen Penelitian
                                        </div>
                                        <table className="border table-zebra table-fixed p-2 md:table-auto">
                                            <thead>
                                                <tr>
                                                    <th className="border border-gray-300 px-2 py-2 w-1/6 md:w-auto">Tampilkan</th>
                                                    <th className="border border-gray-300 px-2 py-2 w-1/5 md:w-auto">Nama Dokumen</th>
                                                    <th className="border border-gray-300 px-2 py-2 w-1/6 md:w-auto">Tipe Dokumen</th>
                                                    <th className="border border-gray-300 px-2 py-2 w-1/5 md:w-auto">Kategori Dokumen</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {research.research_documents.map((document, index) =>
                                                    <tr key={index}>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            <a
                                                                className='btn btn-square btn-primary rounded py-2 px-10  focus:outline-none border-2'
                                                                href={getStorageFileUrl(document.document_file)}
                                                                target="_blank"
                                                                rel="noreferrer">
                                                                Lihat
                                                            </a>
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2 md:w-auto">
                                                            <a href={getStorageFileUrl(document.document_file)} target="_blank" rel="noreferrer">
                                                                {document.name}
                                                            </a>
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            {document.research_document_category.type}
                                                        </td>
                                                        <td className="border border-gray-300 px-4 py-2">
                                                            {document.research_document_category.name}
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2 basis-1/2 max-w-screen">
                                        <div className="basis-1/12 text-lg">
                                            Tidak ada Dokumen Penelitian
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
