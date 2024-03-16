import React from 'react';
import Image from "next/image";
type FeatureProps = {
  title: string;
  icon: string; 
};

const Feature: React.FC<FeatureProps> = ({ title, icon }) => {
  return (
    <div className="w-80 h-80 p-4 max-w-xs  bg-white rounded-2xl border border-gray-200 shadow-md flex flex-col items-center">
      {icon && (
        <Image
            src={icon}
            width={224}
            height={224}
            alt='feature icon'
        />
      )}
      <span className="text-lg font-bold mt-4 text-[#00432C]">{title}</span>
    </div>
  );
};

export default Feature;
