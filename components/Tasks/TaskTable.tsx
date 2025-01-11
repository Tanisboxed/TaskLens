import { Task } from '@/interfaces/Task';
import { format } from 'date-fns';
import DataTable from 'react-data-table-component';
import { useState } from 'react';

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskTable({ tasks, onEdit, onDelete }: TaskTableProps) {
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = tasks.filter(
    item => {
      return (
        (item.title && item.title.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.priority && item.priority.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.type && item.type.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.status && item.status.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.jira_ticket && item.jira_ticket.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.comment && item.comment.toLowerCase().includes(filterText.toLowerCase()))
      );
    }
  );

  const columns = [
    {
      name: 'Title',
      selector: (row: Task) => row.title,
      sortable: true,
      width: '200px',
      grow: 2,
    },
    {
      name: 'Priority',
      selector: (row: Task) => row.priority,
      sortable: true,
      width: '100px',
      grow: 1,
    },
    {
      name: 'Type',
      selector: (row: Task) => row.type,
      sortable: true,
      width: '120px',
      grow: 1,
    },
    {
      name: 'Status',
      selector: (row: Task) => row.status,
      sortable: true,
      width: '130px',
      grow: 1,
    },
    {
      name: 'Assigned SP',
      selector: (row: Task) => row.assigned_sp,
      sortable: true,
      width: '100px',
      grow: 1,
      style: { justifyContent: 'center' },
    },
    {
      name: 'Actual SP',
      selector: (row: Task) => row.actual_sp,
      sortable: true,
      width: '100px',
      grow: 1,
      style: { justifyContent: 'center' },
    },
    {
      name: 'Jira Ticket',
      selector: (row: Task) => row.jira_ticket,
      sortable: true,
      width: '130px',
      grow: 1,
    },
    {
      name: 'Due Date',
      selector: (row: Task) => format(new Date(row.due_date), 'MMM dd, yyyy'),
      sortable: true,
      width: '140px',
      grow: 1,
    },
    {
      name: 'Comment',
      selector: (row: Task) => row.comment,
      sortable: true,
      width: '200px',
      grow: 2,
      wrap: true,
    },
    {
      name: 'Actions',
      cell: (row: Task) => (
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(row)}
            className="px-3 py-2 bg-indigo-500 rounded-md text-white hover:bg-indigo-400 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(row._id!)}
            className="px-3 py-2 bg-red-500 rounded-md text-white hover:bg-red-400 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      ),
      width: '160px',
      grow: 1,
    },
  ];

  const customStyles = {
    table: {
      style: {
        backgroundColor: 'transparent',
        minWidth: '1400px',
      },
    },
    rows: {
      style: {
        backgroundColor: '#111827',
        '&:nth-child(odd)': {
          backgroundColor: '#1f2937',
        },
        '&:hover': {
          backgroundColor: '#374151',
          cursor: 'pointer',
        },
        minHeight: '52px',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: '#374151',
      },
    },
    headRow: {
      style: {
        background: 'linear-gradient(to right, #8b5cf6, #6366f1)',
        color: 'white',
        '&:hover': {
          backgroundColor: '#6366f1',
        },
        minHeight: '52px',
      },
    },
    headCells: {
      style: {
        fontSize: '0.875rem',
        fontWeight: '600',
        color: 'white',
        paddingLeft: '16px',
        paddingRight: '16px',
        justifyContent: 'flex-start',
      },
    },
    cells: {
      style: {
        color: '#e5e7eb',
        paddingLeft: '16px',
        paddingRight: '16px',
      },
    },
    pagination: {
      style: {
        backgroundColor: 'transparent',
        color: 'white',
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: '#222222',
        minWidth: '1400px',
      },
      pageButtonsStyle: {
        color: 'white',
        fill: 'white',
        '&:disabled': {
          opacity: '0.5',
        },
        '&:hover:not(:disabled)': {
          backgroundColor: '#374151',
        },
        '&:focus': {
          outline: 'none',
          backgroundColor: '#4f46e5',
        },
      },
    },
    subHeader: {
      style: {
        backgroundColor: 'transparent',
        padding: '0px',
        margin: '0px',
        position: 'sticky',
        left: 0,
        zIndex: 10,
      },
    },
  };

  return (
    <div className="w-full relative">
      <div className="sticky left-0 z-20 w-fit mb-4">
        <input
          type="text"
          placeholder="Filter by any field..."
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
          className="px-4 py-2 bg-black/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 w-64 border border-purple-500/20"
        />
        {filterText && (
          <button
            onClick={() => {
              setResetPaginationToggle(!resetPaginationToggle);
              setFilterText('');
            }}
            className="px-4 py-2 bg-black/50 rounded-lg text-white hover:bg-purple-500/20 ml-2 border border-purple-500/20"
          >
            Clear
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader={false}
          persistTableHead
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
          paginationComponent={({ currentPage, rowsPerPage, rowCount, onChangePage, onChangeRowsPerPage }) => (
            <nav className="sticky left-0 z-20">
              <div className="py-3 flex items-center space-x-2">
                <select
                  value={rowsPerPage}
                  onChange={e => onChangeRowsPerPage(Number(e.target.value), currentPage)}
                  className="bg-black/50 text-white rounded-lg px-3 py-1 border border-purple-500/20"
                >
                  {[10, 20, 30, 40, 50].map(size => (
                    <option key={size} value={size}>
                      {size} rows
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => onChangePage(currentPage - 1, rowCount)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-black/50 rounded-lg text-white disabled:opacity-50 border border-purple-500/20"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {currentPage} of {Math.ceil(rowCount / rowsPerPage)}
                </span>
                <button
                  onClick={() => onChangePage(currentPage + 1, rowCount)}
                  disabled={currentPage === Math.ceil(rowCount / rowsPerPage)}
                  className="px-3 py-1 bg-black/50 rounded-lg text-white disabled:opacity-50 border border-purple-500/20"
                >
                  Next
                </button>
              </div>
            </nav>
          )}
          customStyles={customStyles}
          highlightOnHover
          pointerOnHover
          responsive={false}
          striped
          defaultSortFieldId={1}
          theme="dark"
        />
      </div>
    </div>
  );
}
  