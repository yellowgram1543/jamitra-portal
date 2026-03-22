import React from 'react';

export const SchemeCardSkeleton = () => (
  <div className="card-elevated flex flex-col">
    <div className="mb-6 w-14 h-14 skeleton rounded-2xl" />
    <div className="h-7 w-3/4 skeleton mb-3" />
    <div className="space-y-2 mb-6 flex-grow">
      <div className="h-4 w-full skeleton" />
      <div className="h-4 w-5/6 skeleton" />
      <div className="h-4 w-2/3 skeleton" />
    </div>
    <div className="h-11 w-full skeleton rounded-xl" />
  </div>
);

export const TableRowSkeleton = () => (
  <tr className="border-b border-gray-50">
    <td className="p-5">
      <div className="h-5 w-32 skeleton mb-2" />
      <div className="h-3 w-24 skeleton" />
    </td>
    <td className="p-5">
      <div className="h-6 w-20 skeleton rounded-full" />
    </td>
    <td className="p-5 text-right">
      <div className="h-4 w-16 skeleton ml-auto" />
    </td>
  </tr>
);

export const DocumentSkeleton = () => (
  <div className="bg-white p-5 rounded-xl shadow-soft flex items-center gap-4 border border-gray-50">
    <div className="w-12 h-12 skeleton rounded-lg shrink-0" />
    <div className="flex-grow">
      <div className="h-5 w-40 skeleton mb-2" />
      <div className="h-3 w-24 skeleton" />
    </div>
    <div className="w-10 h-6 skeleton rounded shrink-0" />
  </div>
);
