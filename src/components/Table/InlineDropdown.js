import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import ProductPopup from '../Model/ProductPopup';
import ConfirmPopup from '../Model/ConfirmPopup';
import { useActions } from '../../store/actions';
import toast from 'react-hot-toast';

export default function InlineDropdown({ product, handleEdit }) {
    const [open, setOpen] = useState(false)
    const [openConfirmModel, setOpenConfirmModel] = useState(false)
    const { deleteProduct, undoLastAction } = useActions()

    const handleDelete = () => {
        deleteProduct(product.id);

        const undoToast = toast.custom(
            (t) => (
                <div
                    className={`${t.visible ? 'animate-bounce' : 'animate-leave'
                        } max-w-md w-full bg-slate-50 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src={product.thumbnail}
                                    alt=""
                                />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    {product.title} has been deleted. Undo?
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                        <button
                            onClick={() => {
                                undoLastAction();
                                toast.dismiss(t.id);
                            }}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Undo
                        </button>
                    </div>
                </div>
            ),
            {
                position: 'bottom-right', // Set the position to bottom-right
            }
        );

    };


    return (
        <div>
            {open && <ProductPopup isOpen={open} onClose={() => setOpen(false)} productData={product} name={"Edit Product"} />}
            {openConfirmModel && <ConfirmPopup isOpen={openConfirmModel} onCancel={() => setOpenConfirmModel(false)} message={"Are you sure you want delete ?"} onConfirm={handleDelete} />}

            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className=" inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 ">
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            // fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="z-10 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-sky-500 text-white' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={() => setOpen(true)}
                                    >
                                        {active ? (
                                            <CiEdit
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <CiEdit
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        )}
                                        Edit
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-sky-500 text-white' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={() => setOpenConfirmModel(true)}
                                    >
                                        {active ? (
                                            <MdDelete
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <MdDelete
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        )}
                                        Delete
                                    </button>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-sky-500 text-white' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={handleEdit}
                                    >
                                        {active ? (
                                            <CiEdit
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <CiEdit
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        )}
                                        Edit Inline
                                    </button>
                                )}
                            </Menu.Item>


                        </div>

                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
