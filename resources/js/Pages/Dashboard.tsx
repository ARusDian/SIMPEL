import React from 'react';

import AppLayout from '@/Layouts/AppLayout';

interface Props { 
  research_count: number,
  research_type_count: number,
  research_document_count: number,
}

export default function Dashboard(props : Props) {
  return (
    <AppLayout
      title="Dashboard"
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-4">
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
              <div className='my-4 flex flex-col gap-2'>
                <div className='text-3xl lg:text-6xl font-bold'>
                  Selamat Datang di SIMPEL ITK
                </div>
                <div className='lg:text-xl'>
                  Sistem Informasi Manajemen Penelitian Institut Teknologi Kalimantan
                </div>
              </div>
              <div className="stats stats-vertical lg:stats-horizontal shadow">
                <div className="stat">
                  <div className="stat-title">Jumlah Penelitian</div>
                  <div className="stat-value">{ props.research_count}</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Jumlah Tipe Penelitian</div>
                  <div className="stat-value">{props.research_type_count}</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Jumlah Dokumen Penelitian</div>
                  <div className="stat-value">{props.research_document_count}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
