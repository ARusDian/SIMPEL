import AppLayout from "@/Layouts/AppLayout";
import { User } from "@/types";
import React from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { InertiaLink } from "@inertiajs/inertia-react";
import { confirmAlert } from 'react-confirm-alert';
import route from "ziggy-js";
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { Inertia } from "@inertiajs/inertia";

interface Props {
    users: Array<User>,
}

export default function Index(props: Props) {
    const users = props.users;

    console.log(props);

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
                            <div className="mt-8 text-2xl">
                                Users
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
                                            <InertiaLink
                                                className="bg-yellow-600 btn btn-square rounded p-2  focus:outline-none border-2 border-orange-400 text-white"
                                                href={route('user.edit', row.original.id)}
                                            >
                                                <Edit className="" />
                                            </InertiaLink>
                                            <form onSubmit={(event)=> onDelete(event, row.original.id)}>
                                                <button
                                                    type="submit"
                                                    className="bg-red-600 btn btn-square rounded p-2 focus:outline-none border-2 border-red-400 text-white"
                                                >
                                                    <Delete />
                                                </button>
                                            </form>
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
