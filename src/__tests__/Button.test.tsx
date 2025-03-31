import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "../components/Button";

describe("Button Component", () => {
  test("renders button with correct text", () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const buttonElement = screen.getByText("Click Me");
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies className prop correctly", () => {
    render(<Button className="test-class">Click Me</Button>);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toHaveClass("test-class");
  });

  test("respects disabled state", () => {
    render(<Button disabled>Click Me</Button>);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeDisabled();
  });

  test("renders with aria-label when provided", () => {
    render(<Button ariaLabel="Test button">Click Me</Button>);
    const buttonElement = screen.getByLabelText("Test button");
    expect(buttonElement).toBeInTheDocument();
  });
});
