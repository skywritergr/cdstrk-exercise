import { FC, ReactNode } from "react";

export interface FileData {
  name: string;
  device: string;
  path: string;
  status: "Available" | "Scheduled";
}

type TableProps = {
  children: ReactNode;
  caption?: string;
  role?: string;
  ariaLabel?: string;
};
type TableRowProps = {
  children: ReactNode;
  className?: string;
};
type TableCellProps = {
  children: ReactNode;
  className?: string;
  scope?: "col" | "row";
};

export type TableComponent = FC<TableProps> & {
  Head: FC<TableProps>;
  Row: FC<TableRowProps>;
  Cell: FC<TableCellProps>;
};

export interface CheckboxProps {
  checked?: boolean;
  onChange: () => void;
  id?: string;
  label?: string;
  name?: string;
  ariaLabel?: string;
}
