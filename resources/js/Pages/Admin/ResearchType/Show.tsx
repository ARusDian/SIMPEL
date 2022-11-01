import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/AppLayout';
import { Research } from '@/Models/Research/Research';
import { ResearchType } from '@/Models/Research/ResearchType';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

interface ResearchTypeResearch extends ResearchType {
    researches: Array<Research>;
}

interface Props {
    research_type: ResearchTypeResearch
}

export default function Show(props: Props) {
    let research_type = props.research_type;

    return (
        <AppLayout title={`Tipe ${research_type.name}`}>
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                        <div className="flex flex-col gap-3 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <div className='flex justify-between'>
                                <div className='text-2xl'>
                                    Data Tipe Penelitian
                                </div>
                                <div className='flex gap-2'>
                                    <InertiaLink
                                        className="btn btn-square btn-primary rounded py-2 px-10  focus:outline-none border-2"
                                        href={route('research-type.index')}
                                    >
                                        Kembali
                                    </InertiaLink>
                                    <InertiaLink
                                        className="btn btn-square btn-warning rounded py-2 px-10  focus:outline-none border-2"
                                        href={route('research-type.edit', research_type.id)}
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
                                                            Inertia.post(route('research-type.destroy', research_type.id), {
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
                            <table className='table table-zebra w-full'>
                                <thead>
                                    <tr>
                                        <th className=''>Properti</th>
                                        <th className=''>Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className=''>Nama Tipe</td>
                                        <td className=''>{research_type.name}</td>
                                    </tr>
                                    <tr>
                                        <td className=''>Deskripsi</td>
                                        <td className=''>{research_type.description}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='flex flex-col gap-4 py-4'>
                                <h3 className='text-2xl'>Daftar Penelitian</h3>
                                {props.research_type.researches.length > 0 ? (
                                    <table className='table table-zebra w-full'>
                                        <thead>
                                            <tr>
                                                <th className='text-center'>Judul</th>
                                                <th className='text-center'>Data Penelitian</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.research_type.researches.map((research) => (
                                                <tr key={research.id}>
                                                    <td className='text-center'>{research.name}</td>
                                                    <td className='text-center'>
                                                        <InertiaLink
                                                            className="btn btn-square btn-primary rounded py-2 px-10  focus:outline-none border-2"
                                                            href={route('research.show', research.id)}
                                                        >
                                                            Lihat
                                                        </InertiaLink>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className='text-center'>
                                        <h3 className='text-xl'>Tidak ada Penelitian terkait akun ini</h3>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
