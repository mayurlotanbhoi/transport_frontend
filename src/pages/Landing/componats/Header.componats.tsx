'use client'

import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react'
import { useState } from 'react'
import { isCompositeComponent } from 'react-dom/test-utils'
import { Link } from 'react-router-dom'


const products = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', },
    { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', },
]
const callsToAction = [
    { name: 'Watch demo', href: '#', },
    { name: 'Contact sales', href: '#', },
]

export const PublicHeader = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <header className=" bg-white">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link to="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img alt="" src="https://tempfile.aiquickdraw.com/i/in2WG2bQRjKwlyTpzzMJdg.jpg" className="h-8 w-auto" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        {/* <Bars3Icon aria-hidden="true" className="h-6 w-6" /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>


                <PopoverGroup onClick={() => setMobileMenuOpen(pre => false)} className="hidden lg:flex lg:gap-x-12">
                    <Popover className="relative">
                        <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            Product
                            {/* <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" /> */}
                        </PopoverButton>

                        <PopoverPanel
                            transition
                            className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            <div className="p-4">
                                {products.map((item) => (
                                    <div
                                        key={item.name}
                                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                    >
                                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                            {/* <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" /> */}
                                        </div>
                                        <div className="flex-auto">
                                            <Link to={item.href} className="block font-semibold text-gray-900">
                                                {item.name}
                                                <span className="absolute inset-0" />
                                            </Link>
                                            <p className="mt-1 text-gray-600">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                {callsToAction.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                                    >
                                        {/* <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" /> */}
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </PopoverPanel>
                    </Popover>

                    <Link to="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
                        dashboard
                    </Link>

                    <Link to="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Features
                    </Link>
                    <Link to="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Marketplace
                    </Link>
                    <Link to="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Company
                    </Link>
                </PopoverGroup>
                <div onClick={() => setMobileMenuOpen(pre => false)} className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link to="/auth/signin" className="text-sm font-semibold leading-6 text-gray-900">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                    {/* <Link
                        to="/auth/signup"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                        signup<span aria-hidden="true">&rarr;</span>
                    </Link> */}

                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link to="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://tempfile.aiquickdraw.com/i/in2WG2bQRjKwlyTpzzMJdg.jpg"
                                className="h-8 w-auto"
                            />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>

                        </button>
                    </div>
                    <div onClick={() => setMobileMenuOpen(pre => false)} className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        Product
                                        {/* <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" /> */}

                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        {[...products, ...callsToAction].map((item) => (
                                            <DisclosureButton
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </DisclosureButton>
                                        ))}
                                    </DisclosurePanel>
                                </Disclosure>
                                <Link to="/dashboard" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    dashboard
                                </Link>
                                <Link
                                    to="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Features
                                </Link>
                                <Link
                                    to="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Marketplace
                                </Link>
                                <Link
                                    to="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Company
                                </Link>
                            </div>
                            <div className="py-6">
                                <Link
                                    to="/auth/signin"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/auth/signup"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    signup
                                </Link>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
