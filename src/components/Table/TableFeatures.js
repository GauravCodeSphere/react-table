import React from 'react';
import JsonView from '../Model/JsonView';
import { ExportCSVButton } from './ExportCSVButton';
import ColorChange from './ColorChange';
import { Tooltip } from 'flowbite-react';
import { MdFilterList, MdFilterListOff } from 'react-icons/md';
import { buttonStyles } from '../../utils/material';
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from 'react-icons/io';

const TableFeatures = ({
    filteredProductsByBrand,
    selectedItems,
    setSelectedItems,
    addColor,
    removeColor,
    showFilter,
    setShowFilter,
    startScrolling,
    stopScrolling
}) => {



    return (
        <>
            <div className="flex flex-wrap justify-between mt-3 gap-3 p-4">
                <div >

                    <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                                <button
                                    className="text-sky-500 text-lg px-4 py-2 border rounded hover:bg-slate-50"
                                    onMouseDown={() => startScrolling(-1)}
                                    onMouseUp={stopScrolling}
                                    onMouseLeave={stopScrolling}
                                >
                                    <IoMdArrowDropleftCircle />
                                </button>
                                <button
                                    className="text-sky-500 text-lg px-4 py-2 border rounded hover:bg-slate-50"
                                    onMouseDown={() => startScrolling(1)}
                                    onMouseUp={stopScrolling}
                                    onMouseLeave={stopScrolling}
                                >
                                    <IoMdArrowDroprightCircle />
                                </button>
                            </div>
                </div>
                <div className='flex flex-wrap gap-2'>

                    <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                        <JsonView productData={filteredProductsByBrand} />
                    </div>

                    <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                        <ExportCSVButton data={filteredProductsByBrand} filename="table_data" />
                    </div>

                    <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                        <ColorChange selectedItems={selectedItems} setSelectedItems={setSelectedItems} addColor={addColor} removeColor={removeColor} />
                    </div>

                    <Tooltip content="Show/Hide filters" className='bg-slate-700 text-xs' arrow={false}>
                        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                            <button className={buttonStyles} onClick={() => setShowFilter(!showFilter)}>{showFilter ? <MdFilterListOff /> : <MdFilterList />}</button>
                        </div>
                    </Tooltip>
                </div>

            </div>
        </>
    );
}

export default TableFeatures;
