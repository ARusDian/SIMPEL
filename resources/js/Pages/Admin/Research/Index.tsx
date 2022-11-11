import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/AppLayout';
import { Research } from '@/Models/Research/Research';
import { ResearchContributor } from '@/Models/Research/ResearchContributor';
import { InertiaLink } from '@inertiajs/inertia-react';

interface Props {
    researches: Array<Research>,
}

export default function Index(props: Props) {
    const researches = props.researches;

    const dataColumns = [
        {
            accessorKey: 'name',
            header: 'Judul Penelitian',
        },
        {
            accessorKey: 'research_type.name',
            header: 'Jenis Penelitian',
        },
        {
            id: 'research_contributors',
            Cell: (cell) => {
                return (
                    <div className="flex-col gap-2">
                        {
                            cell.row.original.research_contributors.length > 0 ?
                                cell.row.original.research_contributors
                                    .sort((a, b) => a.contributor_type < b.contributor_type ? 1 : -1)
                                    .map((contributor: ResearchContributor, index) =>
                                (
                                    <div key={contributor.id}>
                                        <p>{index + 1}. {contributor.user.name} - {contributor.contributor_type}</p>
                                    </div>
                                )
                                )
                                : "Belum ada kontributor"
                        }
                    </div>
                );
            },
            header: 'Kontributor',
        }
    ] as MRT_ColumnDef<typeof researches[0]>[];
    return (
        <AppLayout title="Researches">
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                        <div className="mt-8 flex justify-between">
                            <div className="text-2xl">
                                Seluruh Penelitian
                            </div>
                            <div className="btn btn-primary text-md my-3">
                                <InertiaLink href={route('research.create')} className="">
                                    Tambah Penelitian
                                </InertiaLink>
                            </div>
                        </div>
                        <div className="mt-6 text-gray-500">
                            <MaterialReactTable
                                columns={dataColumns}
                                data={researches}
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
                                        <InertiaLink href={route('research.show', row.original.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Show
                                        </InertiaLink>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
