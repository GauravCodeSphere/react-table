import React from 'react';

const GlobalFilter = ({ filtering, setFiltering }) => {
    return (
        <div>
            {/* GLOBAL FILTER */}
            <input type='text' value={filtering} onChange={(e) => setFiltering(e.target.value)} />
            <hr />
        </div>
    );
};

export default GlobalFilter;