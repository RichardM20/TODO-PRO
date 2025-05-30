"use client";

import { IDrawerSectionProps } from "../../../types/drawer.type";


const DrawerSection = (props: IDrawerSectionProps) => {
  return (
    <div className="mb-6">
      <h3 className="px-3 mb-2 text-xs font-semibold uppercase text-gray-500">
        {props.title}
      </h3>
      <div className="space-y-1">{props.children}</div>
    </div>
  );
};

export default DrawerSection;
