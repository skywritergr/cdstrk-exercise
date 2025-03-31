import { FC, ReactNode } from "react";

type TableProps = { children: ReactNode };
type TableRowProps = { children: ReactNode; className?: string };
type TableCellProps = { children: ReactNode; className?: string };

type TableComponent = FC<TableProps> & {
  Head: FC<TableProps>;
  Row: FC<TableRowProps>;
  Cell: FC<TableCellProps>;
};

export const Table: TableComponent = ({ children }) => (
  <table className="w-full border-collapse border border-gray-300">
    {children}
  </table>
);

Table.Head = ({ children }) => (
  <thead className="bg-gray-100 border-b border-gray-300">{children}</thead>
);

Table.Row = ({ children, className }) => (
  <tr className={`border-b border-gray-300 ${className}`}>{children}</tr>
);

Table.Cell = ({ children, className }) => (
  <td className={`p-2 border border-gray-300 ${className}`}>{children}</td>
);
