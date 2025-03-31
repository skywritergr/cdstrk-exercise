import { TableComponent } from "../types";

export const Table: TableComponent = ({ children, caption, ariaLabel }) => (
  <table
    className="w-full border-collapse border border-gray-300"
    aria-label={ariaLabel || "Data table"}
  >
    {caption && <caption className="sr-only">{caption}</caption>}
    {children}
  </table>
);

Table.Head = ({ children }) => (
  <thead className="bg-gray-100 border-b border-gray-300">{children}</thead>
);

Table.Row = ({ children, className }) => (
  <tr className={`border-b border-gray-300 ${className}`}>{children}</tr>
);

Table.Cell = ({ children, className, scope }) =>
  scope ? (
    <th scope={scope} className={`p-2 border border-gray-300 ${className}`}>
      {children}
    </th>
  ) : (
    <td className={`p-2 border border-gray-300 ${className}`}>{children}</td>
  );
