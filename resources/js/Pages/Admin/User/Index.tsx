import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/AppLayout';
import { User } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';

interface Props {
    users: Array<User>,
}

export default function Index(props: Props) {
    const users = props.users;

    function onDelete(e: React.FormEvent, id: number) {
        e.preventDefault();
        console.log('calling confirm alert');
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        Inertia.post(route('user.destroy', id), {
                            _method: 'DELETE',
                        });
                    },
                },
                {
                    label: 'Cancel',
                    onClick: () => { },
                },
            ],
        });
    }

    const dataColumns = [
        {
            accessorKey: 'name',
            header: 'Nama User',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'phone_number',
            header: 'Nomor Telepon',
        },
        {
            accessorFn: (row: User) => row.roles.map((role) => role.name).join(', '),
            header: 'Status',
        }
    ] as MRT_ColumnDef<typeof users[0]>[];
    return (
        <AppLayout title="Users">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                            <div className="flex justify-between">
                                <div className="mt-8 text-2xl">
                                    Users
                                </div>
                                <div className='align-bottom'>
                                    <InertiaLink
                                        href={route('user.create')}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-auto"
                                    >
                                        Tambah User
                                    </InertiaLink>
                                </div>
                            </div>
                            <div className="mt-6 text-gray-500">
                                <MaterialReactTable
                                    columns={dataColumns}
                                    data={users}
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
                                            <InertiaLink href={route('user.show', row.original.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
