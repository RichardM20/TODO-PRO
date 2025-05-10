"use client"

import { IDrawerSearchProps } from "@dashboard-types/drawer.type"
import { Search } from "lucide-react"


const DrawerSearch = ({ placeholder = "Search", onChange }: IDrawerSearchProps) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search size={16} className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full py-2 pl-9 pr-3 text-sm bg-transparent border-none rounded-md focus:ring-0 placeholder-gray-400 text-gray-700"
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  )
}

export default DrawerSearch
