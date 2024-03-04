import React from 'react';

function Grid({ data, handleclick }) {
    return (
        <div className="grid-container">
            {data?.map(item => (
                item.isBox ? (
                    <div
                        key={item.id}
                        onClick={() => handleclick(item.id)}
                        className='box'
                        style={{ backgroundColor: item.isFilled ? 'green' : '' }}
                    >
                    </div>) 
                    : ( <span key={item.id}></span> )
            ))}
        </div>
    );
}

export default Grid;