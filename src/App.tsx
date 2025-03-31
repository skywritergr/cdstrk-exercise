import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Checkbox } from "./components/Checkbox";
import { Table } from "./components/Table";
import { FileData } from "./types";

const files: FileData[] = [
  {
    name: "smss.exe",
    device: "Stark",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
    status: "Scheduled",
  },
  {
    name: "netsh.exe",
    device: "Targaryen",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
    status: "Available",
  },
  {
    name: "uxtheme.dll",
    device: "Lannister",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    status: "Available",
  },
  {
    name: "cryptbase.dll",
    device: "Martell",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
    status: "Scheduled",
  },
  {
    name: "7za.exe",
    device: "Baratheon",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: "Scheduled",
  },
];

export default function FileTable() {
  const [selected, setSelected] = useState<string[]>([]);
  const selectAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectAllRef.current) {
      if (selected.length === 0) {
        selectAllRef.current.indeterminate = false;
        selectAllRef.current.checked = false;
      } else if (selected.length === files.length) {
        selectAllRef.current.indeterminate = false;
        selectAllRef.current.checked = true;
      } else {
        selectAllRef.current.indeterminate = true;
      }
    }
  }, [selected]);

  const toggleSelection = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const toggleAll = () => {
    setSelected(
      selected.length === files.length ? [] : files.map((file) => file.name)
    );
  };

  const downloadFiles = () => {
    const availableFiles = files
      .filter(
        (file) => selected.includes(file.name) && file.status === "Available"
      )
      .map((file) => `Device: ${file.device}\nPath: ${file.path}`)
      .join("\n\n");

    if (availableFiles) {
      alert(`Downloading the following files:\n\n${availableFiles}`);
    } else {
      alert("No available files selected for download.");
    }
  };

  return (
    <div className="page-container">
      <main className="container" role="main">
        <div className="header">
          <div className="select-all-container">
            <Checkbox
              ref={selectAllRef}
              onChange={toggleAll}
              id="select-all"
              label="Select all files"
              ariaLabel="Select all files"
            />
            <span
              className="selected-text"
              id="selection-status"
              aria-live="polite"
            >
              {selected.length > 0
                ? `Selected ${selected.length} of ${files.length}`
                : "Select All"}
            </span>
          </div>
          <Button
            className="download-button"
            onClick={downloadFiles}
            ariaLabel="Download selected files"
            disabled={
              selected.filter(
                (name) =>
                  files.find((f) => f.name === name)?.status === "Available"
              ).length === 0
            }
          >
            Download Selected
          </Button>
        </div>
        <Table
          caption="Files list"
          ariaLabel="Table of files with their details"
        >
          <Table.Head>
            <Table.Row>
              <Table.Cell scope="col">Selection</Table.Cell>
              <Table.Cell scope="col">Name</Table.Cell>
              <Table.Cell scope="col">Device</Table.Cell>
              <Table.Cell scope="col">Path</Table.Cell>
              <Table.Cell scope="col">Status</Table.Cell>
            </Table.Row>
          </Table.Head>
          <tbody>
            {files.map((file) => (
              <Table.Row
                key={file.name}
                className={selected.includes(file.name) ? "selected-row" : ""}
              >
                <Table.Cell>
                  <Checkbox
                    id={`checkbox-${file.name}`}
                    checked={selected.includes(file.name)}
                    onChange={() => toggleSelection(file.name)}
                    label={`Select ${file.name}`}
                    ariaLabel={`Select ${file.name}`}
                  />
                </Table.Cell>
                <Table.Cell className="file-name">{file.name}</Table.Cell>
                <Table.Cell>{file.device}</Table.Cell>
                <Table.Cell className="file-path">{file.path}</Table.Cell>
                <Table.Cell>
                  {file.status === "Available" ? (
                    <span className="status-available">● Available</span>
                  ) : (
                    <span className="status-scheduled">Scheduled</span>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </tbody>
        </Table>
      </main>
    </div>
  );
}
