import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
  test("renders table with file data", () => {
    render(<App />);

    // Verify column headers
    expect(screen.getByText("Selection")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Device")).toBeInTheDocument();
    expect(screen.getByText("Path")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();

    // Verify some file data is present
    expect(screen.getByText("smss.exe")).toBeInTheDocument();
    expect(screen.getByText("netsh.exe")).toBeInTheDocument();
    expect(screen.getByText("Stark")).toBeInTheDocument();
    expect(screen.getByText("Targaryen")).toBeInTheDocument();
  });

  test("selects files when checkboxes are clicked", () => {
    render(<App />);

    // Initially "Select All" is displayed
    expect(screen.getByText("Select All")).toBeInTheDocument();

    // Select a file
    const firstCheckbox = screen.getByLabelText("Select smss.exe");
    fireEvent.click(firstCheckbox);
    expect(screen.getByText("Selected 1 of 5")).toBeInTheDocument();

    // Select another file
    const secondCheckbox = screen.getByLabelText("Select netsh.exe");
    fireEvent.click(secondCheckbox);
    expect(screen.getByText("Selected 2 of 5")).toBeInTheDocument();

    // Click first checkbox again to deselect
    fireEvent.click(firstCheckbox);
    expect(screen.getByText("Selected 1 of 5")).toBeInTheDocument();
  });

  test('selects all files when "Select All" checkbox is clicked', () => {
    render(<App />);

    // Click the select all checkbox
    const selectAllCheckbox = screen.getByLabelText("Select all files");
    fireEvent.click(selectAllCheckbox);
    expect(screen.getByText("Selected 5 of 5")).toBeInTheDocument();

    // Click again to deselect all
    fireEvent.click(selectAllCheckbox);
    expect(screen.getByText("Select All")).toBeInTheDocument();
  });

  test("alerts when download button is clicked with available files selected", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();

    render(<App />);

    // Select an available file
    const availableFileCheckbox = screen.getByLabelText("Select netsh.exe");
    fireEvent.click(availableFileCheckbox);

    // Click download button
    const downloadButton = screen.getByText("Download Selected");
    fireEvent.click(downloadButton);

    // Verify alert was shown with correct content
    expect(alertMock).toHaveBeenCalledWith(
      expect.stringContaining("Downloading the following files:")
    );
    expect(alertMock).toHaveBeenCalledWith(
      expect.stringContaining("Device: Targaryen")
    );

    alertMock.mockRestore();
  });

  test("download button is disabled when only scheduled files are selected", () => {
    render(<App />);

    // Select a scheduled file (not available)
    const scheduledFileCheckbox = screen.getByLabelText("Select smss.exe");
    fireEvent.click(scheduledFileCheckbox);

    // Button should remain disabled
    const downloadButton = screen.getByText("Download Selected");
    expect(downloadButton).toBeDisabled();
  });

  test("download button is disabled when no available files are selected", () => {
    render(<App />);

    // Initially the button should be disabled
    const downloadButton = screen.getByText("Download Selected");
    expect(downloadButton).toBeDisabled();

    // Select an available file
    const availableFileCheckbox = screen.getByLabelText("Select netsh.exe");
    fireEvent.click(availableFileCheckbox);

    // Now button should be enabled
    expect(downloadButton).not.toBeDisabled();
  });
});
