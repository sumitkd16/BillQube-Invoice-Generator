// TemplateGrid.jsx – exact original structure, only classes swapped
import React from 'react';
import { templates } from '../assets/assets.js';

const TemplateGrid = ({onTemplateClick}) => {
    return (
        <div className="flex flex-wrap -mx-2">
            {templates.map(({ id, label, image }) => (
                <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-3" key={id}>
                    <div
                        className="border border-slate-700 rounded-md shadow-sm overflow-hidden bg-slate-800 cursor-pointer hover:border-indigo-500 hover:scale-[1.02] transition-transform duration-200"
                        title={label}
                        onClick={() => onTemplateClick(id)}
                    >
                        <img className="w-full" loading="lazy" src={image} alt={label} />
                        <div className="p-2 text-center font-medium text-slate-200">
                            {label}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TemplateGrid;