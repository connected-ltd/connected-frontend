import React, { useState, useEffect, useRef } from "react";
import {
  Filter,
  Users,
  ListPlus,
  Trash,
  X,
  Check,
  ChevronDown,
} from "lucide-react";

// TypeScript interface for table data
interface TableRow {
  id: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// Interface for column configuration
interface ColumnConfig {
  key: string;
  header: string;
  width?: string;
  filterable?: boolean;
}

// Props for the CustomTable component
interface CustomTableProps {
  columns: ColumnConfig[];
  data: TableRow[];
  actions?: React.ReactNode;
  onCreateNew?: () => void;
  onCustomizeTable?: () => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  actions,
}) => {
  // States
  const [tableData, setTableData] = useState<TableRow[]>(data);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  );
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isGroupByOpen, setIsGroupByOpen] = useState(false);
  const [isBulkActionsOpen, setIsBulkActionsOpen] = useState(false);
  const [groupByKey, setGroupByKey] = useState<string | null>(null);
  const [groupedData, setGroupedData] = useState<{ [key: string]: TableRow[] }>(
    {}
  );

  // Refs for dropdowns
  const filterRef = useRef<HTMLDivElement>(null);
  const groupByRef = useRef<HTMLDivElement>(null);
  const bulkActionsRef = useRef<HTMLDivElement>(null);

  // Update tableData when data prop changes
  useEffect(() => {
    setTableData(data);
  }, [data]);

  // Handle filtering
  useEffect(() => {
    let filteredData = [...data];

    // Apply filters
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filteredData = filteredData.filter((row) =>
          String(row[key]).toLowerCase().includes(filters[key].toLowerCase())
        );
      }
    });

    setTableData(filteredData);
  }, [filters, data]);

  // Handle grouping
  useEffect(() => {
    if (groupByKey) {
      const grouped: { [key: string]: TableRow[] } = {};

      tableData.forEach((row) => {
        const groupValue = String(row[groupByKey]);
        if (!grouped[groupValue]) {
          grouped[groupValue] = [];
        }
        grouped[groupValue].push(row);
      });

      setGroupedData(grouped);
    } else {
      setGroupedData({});
    }
  }, [groupByKey, tableData]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
      if (
        groupByRef.current &&
        !groupByRef.current.contains(event.target as Node)
      ) {
        setIsGroupByOpen(false);
      }
      if (
        bulkActionsRef.current &&
        !bulkActionsRef.current.contains(event.target as Node)
      ) {
        setIsBulkActionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle selection of a row
  const handleRowSelection = (id: string | number) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedRows(newSelection);
  };

  // Handle filter change
  const handleFilterChange = (column: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [column]: value,
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({});
  };

  // Bulk action handlers
  const handleDeleteSelected = () => {
    const newData = tableData.filter((row) => !selectedRows.has(row.id));
    setTableData(newData);
    setSelectedRows(new Set());
    setIsBulkActionsOpen(false);
  };

  // Render table based on grouping
  const renderTableRows = () => {
    if (groupByKey && Object.keys(groupedData).length > 0) {
      return Object.entries(groupedData).map(([groupValue, rows]) => (
        <React.Fragment key={groupValue}>
          {/* Group Header */}
          <div className="bg-bg-primary text-text-primary grid grid-cols-12 py-2 px-4 font-medium">
            <div className="col-span-11 capitalize truncate">
              {groupByKey}: {groupValue} ({rows.length} items)
            </div>
            <div className="col-span-1"></div>
          </div>

          {/* Group Rows */}
          {rows.map((row) => renderRow(row))}
        </React.Fragment>
      ));
    } else {
      return tableData.map((row) => renderRow(row));
    }
  };

  // Render individual row
  const renderRow = (row: TableRow) => (
    <div
      key={row.id}
      className="grid grid-cols-12 border-b border-border-primary hover:bg-bg-primary/40"
    >
      {/* Checkbox */}
      <div className="flex items-center px-4 py-4">
        <input
          type="checkbox"
          checked={selectedRows.has(row.id)}
          onChange={() => handleRowSelection(row.id)}
          className="h-4 w-4 text-primary rounded border-border-primary focus:ring-primary"
        />
      </div>

      {/* Content Columns - Adjusted to leave space for checkbox */}
      {columns.map((column, index) => (
        <div
          key={`${row.id}-${column.key}`}
          className={`${
            index === 0
              ? column.width
                ? column.width.replace("col-span-", "col-span-")
                : "col-span-2"
              : column.width || "col-span-3"
          } ${index === 0 ? "pl-0" : ""} py-4 px-4 text-text-secondary`}
        >
          {row[column.key]}
        </div>
      ))}

      {/* Actions */}
      <div className="py-4 px-4 text-right">
        {actions || (
          <button className="text-text-primary hover:text-text-primary">
            <Trash size={18} />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full my-5">
      {/* Toolbar */}
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          {/* Filter Dropdown */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center px-4 py-2 rounded-md border ${
                Object.keys(filters).length > 0
                  ? "border-text-primary bg-primary/10 text-text-secondary"
                  : "border-border-primary text-text-secondary"
              } hover:bg-primary/40 cursor-pointer`}
            >
              <Filter size={18} className="mr-2" />
              Filter
              {Object.keys(filters).length > 0 && (
                <span className="ml-2 bg-bg-primary text-text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {Object.keys(filters).length}
                </span>
              )}
            </button>

            {isFilterOpen && (
              <div className="absolute left-0 mt-2 w-80 bg-bg-primary rounded-md shadow-lg z-10 border border-border-primary">
                <div className="p-3 border-b border-border-primary">
                  <div className="font-medium text-text-primary">Filter</div>
                  <div className="text-sm text-text-primary">
                    Filter table data by column values
                  </div>
                </div>

                <div className="p-3">
                  {columns
                    .filter((col) => col.filterable !== false)
                    .map((column) => (
                      <div key={column.key} className="mb-3">
                        <label className="block mb-1 text-sm font-medium text-text-primary">
                          {column.header}
                        </label>
                        <input
                          type="text"
                          value={filters[column.key] || ""}
                          onChange={(e) =>
                            handleFilterChange(column.key, e.target.value)
                          }
                          placeholder={`Filter by ${column.header.toLowerCase()}`}
                          className="w-full px-3 py-2 border border-border-primary rounded-md text-sm bg-bg-primary text-text-primary"
                        />
                      </div>
                    ))}
                </div>

                <div className="p-3 bg-bg-primary/50 flex justify-between">
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1 border border-border-primary rounded-md text-sm text-text-primary cursor-pointer"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="px-3 py-1 border border-border-primary rounded-md text-sm text-text-primary cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Group By Dropdown */}
          <div className="relative" ref={groupByRef}>
            <button
              onClick={() => setIsGroupByOpen(!isGroupByOpen)}
              className={`flex items-center px-4 py-2 rounded-md border ${
                groupByKey
                  ? "border-primary bg-primary/10 text-text-secondary"
                  : "border-border-primary text-text-secondary"
              } hover:bg-primary/40 cursor-pointer`}
            >
              <Users size={18} className="mr-2" />
              Group By
              {groupByKey && <ChevronDown size={16} className="ml-2" />}
            </button>

            {isGroupByOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-bg-primary rounded-md shadow-lg z-10 border border-border-primary">
                <div className="p-3 border-b border-border-primary">
                  <div className="font-medium text-text-primary">
                    Group By Column
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto">
                  <div
                    onClick={() => {
                      setGroupByKey(null);
                      setIsGroupByOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-bg-primary/50 cursor-pointer flex items-center"
                  >
                    <span className="w-5">
                      {!groupByKey && (
                        <Check size={16} className="text-primary" />
                      )}
                    </span>
                    <span className="ml-2 text-text-primary">None</span>
                  </div>

                  {columns.map((column) => (
                    <div
                      key={column.key}
                      onClick={() => {
                        setGroupByKey(column.key);
                        setIsGroupByOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-bg-primary/50 cursor-pointer flex items-center"
                    >
                      <span className="w-5">
                        {groupByKey === column.key && (
                          <Check size={16} className="text-primary" />
                        )}
                      </span>
                      <span className="ml-2 text-text-primary">
                        {column.header}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bulk Actions Dropdown */}
          <div className="relative" ref={bulkActionsRef}>
            <button
              onClick={() => setIsBulkActionsOpen(!isBulkActionsOpen)}
              className={`flex items-center px-4 py-2 rounded-md border ${
                selectedRows.size > 0
                  ? "border-primary bg-primary/10 text-text-secondary"
                  : "border-border-primary text-text-secondary"
              } hover:bg-primary/40 cursor-pointer`}
            >
              <ListPlus size={18} className="mr-2" />
              Bulk Actions
              {selectedRows.size > 0 && (
                <span className="ml-2 bg-primary text-text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {selectedRows.size}
                </span>
              )}
            </button>

            {isBulkActionsOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-bg-primary rounded-md shadow-lg z-10 border border-border-primary">
                <div className="p-3 border-b border-border-primary">
                  <div className="font-medium text-text-primary">
                    Bulk Actions
                  </div>
                  {selectedRows.size > 0 ? (
                    <div className="text-sm text-text-primary">
                      {selectedRows.size} items selected
                    </div>
                  ) : (
                    <div className="text-sm text-text-primary">
                      No items selected
                    </div>
                  )}
                </div>

                <button
                  onClick={handleDeleteSelected}
                  disabled={selectedRows.size === 0}
                  className={`w-full text-left px-4 py-2 flex items-center ${
                    selectedRows.size > 0
                      ? "text-destructive hover:bg-destructive/10"
                      : "text-text-primary/50"
                  }`}
                >
                  <Trash size={16} className="mr-2" />
                  Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-border-primary rounded-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-bg-primary border-b border-border-primary">
          {/* Checkbox Header */}
          <div className="flex items-center px-4 py-3">
            <input
              type="checkbox"
              checked={
                tableData.length > 0 && selectedRows.size === tableData.length
              }
              onChange={() => {
                if (selectedRows.size === tableData.length) {
                  // Deselect all
                  setSelectedRows(new Set());
                } else {
                  // Select all
                  const allIds = new Set(tableData.map((row) => row.id));
                  setSelectedRows(allIds);
                }
              }}
              className="h-4 w-4 text-primary rounded border-border-primary focus:ring-primary"
            />
          </div>

          {/* Column Headers - Adjusted for checkbox */}
          {columns.map((column, index) => (
            <div
              key={column.key}
              className={`${
                index === 0
                  ? column.width
                    ? column.width.replace("col-span-", "col-span-")
                    : "col-span-2"
                  : column.width || "col-span-3"
              } ${
                index === 0 ? "pl-0" : ""
              } py-3 px-4 font-medium text-text-primary`}
            >
              {column.header}
            </div>
          ))}

          {/* Actions Header */}
          <div className="py-3 px-4 font-medium text-text-primary text-right">
            Actions
          </div>
        </div>

        {/* Table Body */}
        {renderTableRows()}

        {/* Empty State */}
        {tableData.length === 0 && (
          <div className="py-8 text-center text-text-secondary">
            No data available
          </div>
        )}
      </div>

      {/* Selected Items Bar */}
      {selectedRows.size > 0 && (
        <div className="mt-4 py-2 px-4 bg-primary/10 border border-primary/20 rounded-md flex justify-between items-center">
          <div className="text-primary">
            {selectedRows.size} item{selectedRows.size > 1 ? "s" : ""} selected
          </div>
          <button
            onClick={() => setSelectedRows(new Set())}
            className="text-primary hover:text-primary/70 flex items-center"
          >
            <X size={14} className="mr-1" />
            Clear selection
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomTable;
