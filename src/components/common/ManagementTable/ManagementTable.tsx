import React, { useEffect, useState } from "react";
import { FaSort, FaTrash } from "react-icons/fa6";
import "../../../styles/components/common/ManagementTable/style.css";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
  ColumnDef
} from "@tanstack/react-table";


interface RevData {
  Occupied_Room: number | string;
  Group_Room: number | string;
  Transient_Room: number | string;
}

interface RVData {
  Occupied_Room: number | string;
  Group_Room: number | string;
  Transient_Room: number | string;
}

interface OCCData {
  Occupied_Room: number | string;
  Group_Room: number | string;
  Transient_Room: number | string;
}

interface ADRData {
  Occupied_Room: number | string;
  Group_Room: number | string;
  Transient_Room: number | string;
}

export interface RowData {
  Property: string;
  Total_Rooms: string | number;
  Room_Revenue: string;
  FAB_Revenue: string;
  Other_Revenue: string;
  Total_Revenue: string;
  Occupancy_Percentage: string;
  ADR: number | string;
  Hotel_Rooms: number | string;
  Available_Rooms: number | string;
  Rev: RevData;
  RV: RVData;
  OCC: OCCData;
  ADR$: ADRData;
}

interface ManagementTableProps {
  data: RowData[];
  setData: React.Dispatch<React.SetStateAction<RowData[]>>;
  currentItem: RowData | null;
  setCurrentItem: React.Dispatch<React.SetStateAction<RowData | null>>;
}

const ManagementTable: React.FC<ManagementTableProps> = ({
  data,
  setData,
  currentItem,
  setCurrentItem,
}) => {
  const columnHelper = createColumnHelper<RowData>()
    const [newData, setNewData] = useState<RowData[]>([]);
  const columns = [
    {
      accessorKey: "Property",
      header: `Current Property: ${currentItem?.Property.substring(0,7)}`,
      columns: [
        // columnHelper.accessor({
        //   id: 'Occupancy_Percentage',
        //   cell: info => `% ${info.getValue()}`,
        // }),
        // columnHelper.accessor('Occupancy_Percentage', {
        //   header: 'Occupancy Percentage',
        //   cell: info => `% ${info.getValue()}`,
        //   footer: props => props.column.id,
        // }),

        {
          accessorKey: "Property",
          header: "Property",
          size: 100,
        },
        {
          accessorKey: "Total_Rooms",
          header: "Total Rooms",
          size: 100,
        },
        {
          accessorKey: "Room_Revenue",
          header: "Room Revenue",
          size: 100,
        },
        {
          accessorKey: "FAB_Revenue",
          header: "F&B Revenue",
          size: 100,
        },
        {
          accessorKey: "Other_Revenue",
          header: "Other Revenue",
          size: 100,
        },
        {
          accessorKey: "Total_Revenue",
          header: "Total Revenue",
          size: 100,
          cell: (item : any) => (<span>{truncateValue(item.row.original.Total_Revenue)} $</span>)
        },
        {
          accessorKey: "Occupancy_Percentage",
          header: "Occupancy %",
          size: 80,
          cell: (item : any) => (<span>{truncateValue(item.row.original.Occupancy_Percentage)} %</span>)
        },
        // columnHelper.accessor('Occupancy_Percentage', {
        //   header: "Occupancy %",
        //   display: props => <span>{props.row.original.Occupancy_Percentage} %</span>, // Correctly display the cell value
        //   size: 80,
        // }),
        {
          accessorKey: "ADR",
          header: "ADR",
          size: 80,
        },
      ]
    },
    {
      accessorKey: "Rev",
      header: "Rev",
      size: 80,
      columns: [
        {
          accessorKey: "Rev.Occupied_Room",
          header: "Occupied Room",
          size: 80,
        },
        {
          accessorKey: "Rev.Group_Room",
          header: "Group Room",
          size: 80,
        },
        {
          accessorKey: "Rev.Transient_Room",
          header: "Transient Room",
          size: 80,
        },
      ],
    },
    {
      accessorKey: "RV",
      header: "RV",
      size: 80,
      columns: [
        {
          accessorKey: "RV.Occupied_Room",
          header: "Occupied Room",
          size: 80,
        },
        {
          accessorKey: "RV.Group_Room",
          header: "Group Room",
          size: 80,
        },
        {
          accessorKey: "RV.Transient_Room",
          header: "Transient Room",
          size: 80,
        },
      ],
    },
    {
      accessorKey: "OCC",
      header: "OCC",
      size: 80,
      columns: [
        {
          accessorKey: "OCC.Occupied_Room",
          header: "Occupied Room",
          size: 80,
        },
        {
          accessorKey: "OCC.Group_Room",
          header: "Group Room",
          size: 80,
        },
        {
          accessorKey: "OCC.Transient_Room",
          header: "Transient Room",
          size: 80,
        },
      ],
    },

    

    // Add more columns as needed
  ];

  const calculateTotal = (key: string) => {
    // Split the key by dot to handle nested properties
    const keys = key.split('.') as (keyof RowData)[];
  
    // Perform the reduction operation recursively
    const total = data.reduce((accumulator, row) => {
      let value: any = row;
      for (const k of keys) {
        value = value[k];
      }
      // Remove commas if present and convert value to a number
      const numericValue = typeof value === 'string' && value.includes(',')
        ? parseFloat(value.replace(/,/g, ''))
        : parseFloat(value);
  
      // Add numericValue to accumulator if it's a number
      accumulator += !isNaN(numericValue) ? numericValue : 0;
      return accumulator;
    }, 0);
  
    // Format the total to have commas for thousands separator and keep 2 decimal places
    return total.toLocaleString('en-US', { minimumFractionDigits: 2 });
  };
  
  
  
  

  const totalRow: RowData = {
    Property: "Total",
    Total_Rooms: calculateTotal("Total_Rooms"),
    Room_Revenue: calculateTotal("Room_Revenue"), // Calculate based on your logic
    FAB_Revenue: calculateTotal("FAB_Revenue"), // Calculate based on your logic
    Other_Revenue: calculateTotal("Other_Revenue"), // Calculate based on your logic
    Total_Revenue: calculateTotal("Total_Revenue").toString(), // Calculate based on your logic
    Occupancy_Percentage: calculateTotal("Occupancy_Percentage").toString(), // Calculate based on your logic
    ADR: calculateTotal("ADR"),
    Hotel_Rooms: calculateTotal("Hotel_Rooms"),
    Available_Rooms: calculateTotal("Available_Rooms"),
    Rev: {
      Occupied_Room: calculateTotal("Rev.Occupied_Room"),
      Group_Room: calculateTotal("Rev.Group_Room"),
      Transient_Room: calculateTotal("Rev.Transient_Room"),
    },
    RV: {
      Occupied_Room: calculateTotal("RV.Occupied_Room"),
      Group_Room: calculateTotal("RV.Group_Room"),
      Transient_Room: calculateTotal("RV.Transient_Room"),
    },
    OCC: {
      Occupied_Room: calculateTotal("OCC.Occupied_Room"),
      Group_Room: calculateTotal("OCC.Group_Room"),
      Transient_Room: calculateTotal("OCC.Transient_Room"),
    },
    ADR$: {
      Occupied_Room: calculateTotal("ADR$.Occupied_Room"),
      Group_Room: calculateTotal("ADR$.Group_Room"),
      Transient_Room: calculateTotal("ADR$.Transient_Room"),
    },
  };
  

// Trong useEffect, cập nhật newData khi data thay đổi
useEffect(() => {
  const updatedData = data.concat(totalRow);
  setNewData(updatedData);
}, [data]);

  const table = useReactTable<RowData>({
    data: newData,
    columns,
    // state: {
    //   columnFilters,
    // },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    // meta: {
    //   updateData: (
    //     rowIndex: string | number,
    //     columnId: any,
    //     value: any
    //   ) => setData((prev: RowData[]) =>
    //     prev.map((row: RowData, index: number) =>
    //       index === rowIndex
    //         ? {
    //             ...prev[rowIndex]!,
    //             [columnId]: value,
    //           }
    //         : row
    //     )
    //   ),
    // },
  });

  const truncateValue = (value: string | number): string => {
    if (value.toString().length > 6) {
      return value.toLocaleString('en-US', { minimumFractionDigits: 2 }).substring(0, 7) + '...';
    }
    return value.toLocaleString('en-US', { minimumFractionDigits: 2 });
  };
  

  const handleRowClick = (rowData: RowData) => {
    if(rowData.Property == "Total") return ;
    setCurrentItem(rowData);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        overflow: "scroll",
      }}
    >
      <div className="m-table-wrapper">
        <div className="m-table" style={{ width: table.getTotalSize() }}>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <div className="m-tr" key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <div
                  className="m-th"
                  style={{ width: header.getSize() }}
                  key={header.id}
                >
                  {header.column.columnDef.header}
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`m-resizer ${
                      header.column.getIsResizing() ? "isResizing" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          ))}
          {table.getRowModel().rows.map((row:any) => (
            <div
              className="m-tr"
              key={row.id}
              onClick={() => handleRowClick(row.original)}
              style={{ cursor: "pointer" }}
            >
              {row.getVisibleCells().map((cell: any) => (
                <div
                  className="m-td"
                  style={{ width: cell.column.getSize() }}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <br />
      <div className="m-table-footer">
        <div className="pagination-part">
          <div>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
        </div>
      </div>
    </div>
  );
};


export default ManagementTable;
