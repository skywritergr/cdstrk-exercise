import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '../components/Checkbox';

describe('Checkbox Component', () => {
  test('renders unchecked checkbox by default', () => {
    const handleChange = jest.fn();
    render(<Checkbox onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('renders checked checkbox when checked is true', () => {
    const handleChange = jest.fn();
    render(<Checkbox checked={true} onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('calls onChange when checkbox is clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('renders with correct ID when provided', () => {
    const handleChange = jest.fn();
    render(<Checkbox id="test-id" onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'test-id');
  });

  test('renders with label when provided', () => {
    const handleChange = jest.fn();
    render(
      <Checkbox 
        id="test-checkbox" 
        label="Test Label" 
        onChange={handleChange} 
      />
    );
    
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'test-checkbox');
  });

  test('renders with aria-label when provided', () => {
    const handleChange = jest.fn();
    render(
      <Checkbox 
        ariaLabel="Accessibility Label" 
        onChange={handleChange} 
      />
    );
    
    const checkbox = screen.getByLabelText('Accessibility Label');
    expect(checkbox).toBeInTheDocument();
  });
});