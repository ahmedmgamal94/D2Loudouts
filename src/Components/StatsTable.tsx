import React, { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import RowDetails from "./RowDetails";

type Stats = {
  exotic: string;
  mobility: number;
  resilience: number;
  recovery: number;
  discipline: number;
  intellect: number;
  strength: number;
  tiers: number;
  usedMods: string;
};

const defaultData: Stats[] = [
  // Add your data here
  {
    exotic: "image_url",
    mobility: 30,
    resilience: 100,
    recovery: 50,
    discipline: 44,
    intellect: 70,
    strength: 24,
    tiers: 31,
    usedMods: "Mod1, Mod2, Mod3",
  },
  // Add the rest of the data
];

const columnHelper = createColumnHelper<Stats>();

const columns = [
  columnHelper.accessor("exotic", {
    cell: (info) => (
      <img
        src={info.getValue()}
        alt="exotic"
        style={{ width: "40px", height: "40px" }}
      />
    ),
    header: "Exotic",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("mobility", {
    cell: (info) => info.getValue(),
    header: "Mobility",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("resilience", {
    cell: (info) => info.getValue(),
    header: "Resilience",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("recovery", {
    cell: (info) => info.getValue(),
    header: "Recovery",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("discipline", {
    cell: (info) => info.getValue(),
    header: "Discipline",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("intellect", {
    cell: (info) => info.getValue(),
    header: "Intellect",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("strength", {
    cell: (info) => info.getValue(),
    header: "Strength",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("tiers", {
    cell: (info) => info.getValue(),
    header: "Tiers",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("usedMods", {
    cell: (info) => info.getValue(),
    header: "Used Mods",
    footer: (info) => info.column.id,
  }),
];

function StatsTable() {
  const [data, setData] = React.useState(() => [...defaultData]);
  const [selectedRow, setSelectedRow] = useState<Stats | null>(null);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (row: Stats) => {
    setSelectedRow(row);
  };

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => handleRowClick(row.original)}
              style={{ cursor: "pointer" }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
      {selectedRow && <RowDetails row={selectedRow} />}
    </div>
  );
}

export default StatsTable;
