import React, { PropsWithChildren } from 'react';
import AuthenticationCardLogo from '@/Components/Jetstream/AuthenticationCardLogo';
import { asset } from '@/Models/Helper';

export default function AuthenticationCard({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className="flex bg-sky-50">
      <img
        src={asset('root', 'assets/images/background_ITK.jpg')}
        className="object-cover  h-screen w-7/12"
      />
      <div className="m-auto rounded-xl px-10 flex flex-col gap-2 sm:justify-center items-center pt-6 sm:pt-0 ">
        <div>
          <AuthenticationCardLogo />
        </div>
        <div className='flex flex-col'>
          <div className='text-2xl m-auto font-semibold'>
            SIMPEL
          </div>
          <div className='text-md m-auto'>
            Sistem Informasi Manajemen Penelitian 
          </div>
        </div>
        <div className="w-96 sm:max-w-md mt-6 py-4 px-10 bg-white shadow-md  sm:rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
