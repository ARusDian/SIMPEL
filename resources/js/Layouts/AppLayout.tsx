import ResponsiveNavLink from "@/Components/Jetstream/ResponsiveNavLink";
import useRoute from "@/Hooks/useRoute";
import useTypedPage from "@/Hooks/useTypedPage";
import { Inertia } from "@inertiajs/inertia";
import { Head, InertiaLink } from "@inertiajs/inertia-react";
import React, { PropsWithChildren } from "react";

interface Props {
    title: string;
    renderHeader?(): JSX.Element;
    isAdministrator?: boolean;
}

export default function AppLayout({
    title,
    renderHeader,
    children,
}: PropsWithChildren<Props>) {
    const page = useTypedPage();
    const route = useRoute();

    function logout(e: React.FormEvent) {
        e.preventDefault();
        Inertia.post(route('logout'));
    }

    return (
        <div>
            <Head title={title} />
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <div className="navbar bg-primary text-white font-medium">
                        <div className="navbar-start gap-2">
                            <div className="flex-none">
                                <button className="btn btn-square btn-ghost">
                                    <label htmlFor="my-drawer" className=" drawer-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                    </label>
                                </button>
                            </div>
                            <a className="btn btn-ghost normal-case text-xl" href={route('dashboard')}>Dashboard</a>
                            <ul className="menu menu-horizontal p-0">
                                <li>
                                    <InertiaLink href={route('research.create')}>
                                        Tambah Penelitian Baru
                                </InertiaLink>
                                </li>
                                <li><a>Item 3</a></li>
                            </ul>
                        </div>
                        <div className="navbar-end mr-10">
                            <div className="dropdown dropdown-hover dropdown-end ">
                                <label tabIndex={0} className="btn btn-ghost">
                                    <div className="p-2 rounded-full flex">
                                        Profile
                                    </div>
                                </label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 gap-2 shadow bg-base-100 rounded-box w-40 top-10">
                                    <li>
                                        <div className="flex items-center px-4">
                                            {page.props.jetstream.managesProfilePhotos ? (
                                                <div className="flex-shrink-0 mr-3">
                                                    <img
                                                        className="h-10 w-10 rounded-full object-cover"
                                                        src={page.props.user.profile_photo_url}
                                                        alt={page.props.user.name}
                                                    />
                                                </div>
                                            ) : null}

                                            <div>
                                                <div className="font-medium text-base text-gray-800">
                                                    {page.props.user.name}
                                                </div>
                                                <div className="font-medium text-sm text-gray-500">
                                                    {page.props.user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="z-50">
                                        <ResponsiveNavLink
                                            href={route('profile.show')}
                                            active={route().current('profile.show')}
                                        >
                                            Profile
                                        </ResponsiveNavLink>
                                    </li>
                                    <li className="z-50">
                                        <form method="POST" onSubmit={logout}>
                                            <ResponsiveNavLink as="button">
                                                Log Out
                                            </ResponsiveNavLink>
                                        </form></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* End of Navbar */}
                    <main>{children}</main>
                </div>
                <div className="drawer-side text-white">
                    <label htmlFor="my-drawer" className="drawer-overlay "></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content font-medium ">
                        {page.props.isAdministrator ? (
                            <>
                                <div className="divider">Admin Only</div>
                                <li >
                                    <div className="dropdown dropdown-hover dropdown-end">
                                        <label tabIndex={0} className="">
                                            Autentikasi
                                        </label>
                                        <ul tabIndex={0} className="dropdown-content menu p-2 gap-2 shadow bg-base-100 rounded-box w-40 top-5 text-sm">
                                            <li className="z-50">
                                                <InertiaLink
                                                    className=""
                                                    href={route('user.index')}
                                                >
                                                    Users
                                                </InertiaLink>
                                            </li>
                                            <li className="z-50">
                                                <InertiaLink
                                                    href={route('user.index')}
                                                >
                                                    Roles
                                                </InertiaLink>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li >
                                    <div className="dropdown dropdown-hover dropdown-end">
                                        <label tabIndex={0} className="">
                                            Data Penelitian dan Pengabdian
                                        </label>
                                        <ul tabIndex={0} className="dropdown-content menu p-2 gap-2 shadow bg-base-100 rounded-box w-60 top-5 text-sm">
                                            <li className="z-50">
                                                <InertiaLink
                                                    className=""
                                                    href={route('research.index')}
                                                >
                                                    Seluruh Penelitian
                                                </InertiaLink>
                                            </li>
                                            <li className="z-50">
                                                <InertiaLink
                                                    className=""
                                                    href={route('research-document.index')}
                                                >
                                                    Dokumen Penelitian
                                                </InertiaLink>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </>
                        ) : null}
                        
                        <div className="divider">Penelitian</div>
                        <li >
                            <div className="dropdown dropdown-hover dropdown-end ">
                                <label tabIndex={0} className="flex gap-2 ">
                                    Data Penelitian
                                </label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 top-5 text-sm">
                                    <li className="z-50"><a href={route('research.index')}>Penelitian</a></li>
                                    <li className="z-50"><a href={route('research.index')}>Jurnal</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
