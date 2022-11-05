import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/AppLayout';
import { Research } from '@/Models/Research/Research';
import { ResearchDocument } from '@/Models/Research/ResearchDocument';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

interface ResearchDocumentToResearch extends ResearchDocument {
    research: Research
}

interface Props {
    research_documents: Array<ResearchDocumentToResearch>,
}

export default function Index(props: Props) {
    const research_documents = props.research_documents;

    const dataColumns = [
        {
            accessorKey: 'name',
            header: 'Nama Dokumen',
        },
        {
            accessorKey: 'research.name',
            header: 'Nama Penelitian',
        },
        {
            accessorKey: 'research_document_category.name',
            header: 'Kategori Dokumen',
        },
        {
            accessorKey: 'research_document_category.type',
            header: 'Tipe Dokumen',
        }

    ] as MRT_ColumnDef<typeof research_documents[0]>[];
    return (
        <AppLayout title="Researches">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                            <div className="mt-8 flex justify-between">
                                <div className="text-2xl">
                                    Seluruh Dokumen
                                </div>
                                {/* <div className="text-md my-3">
                                    <InertiaLink href={route('research.create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Tambah Penelitian
                                    </InertiaLink>
                                </div> */}
                            </div>
                            <div className="mt-6 text-gray-500">
                                <MaterialReactTable
                                    columns={dataColumns}
                                    data={research_documents}
                                    enableColumnActions
                                    enableColumnFilters
                                    enablePagination
                                    enableSorting
                                    enableBottomToolbar
                                    enableTopToolbar
                                    enableRowActions
                                    enableRowNumbers
                                    muiTableBodyRowProps={{ hover: false }}
                                    renderRowActions={({ row }) => (
                                        <div className="flex items-center justify-center gap-2">
                                            <InertiaLink href={route('research.show', row.original.research.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Show
                                            </InertiaLink>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
