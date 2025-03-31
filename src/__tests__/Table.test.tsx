import { render, screen } from '@testing-library/react';
import { Table } from '../components/Table';

describe('Table Component', () => {
  test('renders table with children', () => {
    render(
      <Table>
        <tbody>
          <tr>
            <td>Test Content</td>
          </tr>
        </tbody>
      </Table>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders table with caption when provided', () => {
    render(
      <Table caption="Test Caption">
        <tbody>
          <tr>
            <td>Test Content</td>
          </tr>
        </tbody>
      </Table>
    );
    
    const caption = screen.getByText('Test Caption');
    expect(caption).toBeInTheDocument();
    expect(caption).toHaveClass('sr-only');
  });

  test('renders table with aria-label when provided', () => {
    render(
      <Table ariaLabel="Test Table Label">
        <tbody>
          <tr>
            <td>Test Content</td>
          </tr>
        </tbody>
      </Table>
    );
    
    const table = screen.getByLabelText('Test Table Label');
    expect(table).toBeInTheDocument();
  });

  test('renders Table.Head properly', () => {
    render(
      <Table>
        <Table.Head>
          <tr>
            <th>Header Content</th>
          </tr>
        </Table.Head>
      </Table>
    );
    
    expect(screen.getByText('Header Content')).toBeInTheDocument();
    const thead = screen.getByText('Header Content').closest('thead');
    expect(thead).toBeInTheDocument();
  });

  test('renders Table.Row with className when provided', () => {
    render(
      <Table>
        <tbody>
          <Table.Row className="test-row-class">
            <td>Row Content</td>
          </Table.Row>
        </tbody>
      </Table>
    );
    
    const row = screen.getByText('Row Content').closest('tr');
    expect(row).toHaveClass('test-row-class');
  });

  test('renders Table.Cell as a td by default', () => {
    render(
      <Table>
        <tbody>
          <tr>
            <Table.Cell>Cell Content</Table.Cell>
          </tr>
        </tbody>
      </Table>
    );
    
    const cell = screen.getByText('Cell Content');
    expect(cell.tagName).toBe('TD');
  });

  test('renders Table.Cell as a th when scope is provided', () => {
    render(
      <Table>
        <thead>
          <tr>
            <Table.Cell scope="col">Header Cell</Table.Cell>
          </tr>
        </thead>
      </Table>
    );
    
    const cell = screen.getByText('Header Cell');
    expect(cell.tagName).toBe('TH');
    expect(cell).toHaveAttribute('scope', 'col');
  });

  test('applies className to Table.Cell when provided', () => {
    render(
      <Table>
        <tbody>
          <tr>
            <Table.Cell className="test-cell-class">Cell Content</Table.Cell>
          </tr>
        </tbody>
      </Table>
    );
    
    const cell = screen.getByText('Cell Content');
    expect(cell).toHaveClass('test-cell-class');
  });
});