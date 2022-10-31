import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/AppLayout';
import { ResearchDocumentCategory } from '@/Models/Research/ResearchDocumentCategory';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Delete, Edit } from '@mui/icons-material';

interface Props {
    research_document_categories: ResearchDocumentCategory[];
}

export default function Index(props: Props) {
    const research_document_categories = props.research_document_categories;

    const dataColumns = [
        {
            accessorKey: 'name',
            header: 'Jenis Dokumen',
        },
        {
            accessorKey: 'type',
            header: 'Kategori Dokumen',
        },
    ] as MRT_ColumnDef<typeof research_document_categories[0]>[];

    return (
        <AppLayout title={"Research Document Category"}>
                <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                            <div className="mt-8 flex justify-between">
                                <div className="text-2xl">
                                    Kategori Dokumen
                                </div>
                                <div className="text-md my-3">
                                    <InertiaLink href={route('research-document-category.create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Tambah Kategori
                                    </InertiaLink>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-center">
                                <div className="ml-4 text-lg text-gray-600 leading-7 font-semibold w-full">
                                    <MaterialReactTable
                                        columns={dataColumns}
                                        data={research_document_categories}
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
                                            <div className="flex items-center justify-center gap-2  ">
                                                <InertiaLink
                                                    className="bg-yellow-600 rounded p-2 flex-1 focus:outline-none border-2 border-orange-400 text-white"
                                                    href={route('research-document-category.edit', row.original.id)}
                                                >
                                                    <Edit className="" />
                                                    Edit
                                                </InertiaLink>
                                                <div
                                                    className="bg-red-600 rounded p-2 flex-1 focus:outline-none border-2 border-red-400 text-white"
                                                    onClick={() => {
                                                        Inertia.post(route('research-document-category.destroy', row.original.id), {
                                                            _method: 'DELETE',
                                                        });
                                                    }}
                                                >
                                                    <Delete className="" />
                                                    Hapus
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </AppLayout>
    )
}
