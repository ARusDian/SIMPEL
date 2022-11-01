import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/AppLayout';
import { ResearchType } from '@/Models/Research/ResearchType';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Delete, Edit } from '@mui/icons-material';

interface Props {
    research_types: Array<ResearchType>;
}

export default function Index(props: Props) {
    const research_types = props.research_types;
    
    const dataColumns = [
        {
            accessorKey: 'name',
            header: 'Jenis Penelitian',
        },
    ] as MRT_ColumnDef<typeof research_types[0]>[];

    return (
        <AppLayout title={"Tipe Penelitian"}>
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                        <div className="mt-8 flex justify-between">
                            <div className="text-2xl">
                                Tipe Penelitian
                            </div>
                            <div className="text-md my-3">
                                <InertiaLink href={route('research-type.create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Tambah Tipe
                                </InertiaLink>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-center">
                            <div className="ml-4 text-lg text-gray-600 leading-7 font-semibold w-full">
                                <MaterialReactTable
                                    columns={dataColumns}
                                    data={research_types}
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
                                            <InertiaLink href={route('research-type.show', row.original.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
    )
}
