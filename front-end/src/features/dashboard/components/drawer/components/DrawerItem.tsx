"use client";

import { IDrawerItemProps } from "@dashboard-types/drawer.type";
import { cn } from "@shared/utils/cn";
import Link from "next/link";

const DrawerItem = ({
  icon,
  label,
  count,
  isActive = false,
  href,
  onClick,
  className,
}: IDrawerItemProps) => {
  const content = (
    <div
      className={cn(
        "flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors",
        isActive && "bg-gray-100 font-medium",
        className
      )}
    >
      {icon && <span className="mr-3 text-gray-500">{icon}</span>}
      <span className="flex-grow">{label}</span>
      {count && (
        <span className="ml-auto text-xs text-cyan-800 bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className="w-full text-left" onClick={onClick}>
      {content}
    </button>
  );
};

export default DrawerItem;
