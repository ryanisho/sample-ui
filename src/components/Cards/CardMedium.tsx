import React, { ReactNode } from 'react';

interface CardDataStatsProps {
    label: string;
    value: string;
}

interface CardMediumProps {
    title: string;
    data: CardDataStatsProps[];
}

const CardMedium: React.FC<CardMediumProps> = ({ title, data }) => {
    return (
        <div className="rounded-sm border border-stroke bg-white py-4 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark grid grid-cols-3 gap-4 w-1/2 justify-start items-start">
            <div className="col-span-3 text-left">
                <h3 className="text-2xl font-bold mt-2 text-black dark:text-white">{title}</h3>
            </div>
            {data.map((item, index) => (
                <div key={index} className="mt-1 flex items-end justify-between">
                    <div>
                        <h4 className="text-title-sm" style={{ color: '#545b64' }}>
                            {item.label}
                        </h4>
                        <span className="text-ml text-black dark:text-white">{item.value}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardMedium;