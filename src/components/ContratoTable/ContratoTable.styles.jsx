import styled from 'styled-components';

export const TableContainer = styled.div`
  margin-top: 2rem;
  margin: 0 5rem;
  padding: 2rem;
  background-color: ${(props) => props.theme['gray-150']}; 
  border-radius: 0.5rem;
  overflow-x: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); 

  
  @media (max-width: 1024px) { 
    margin: 0 1rem;
    width: 98%;
  }

  @media (max-width: 768px) { 
    margin: 0.5rem;
    padding: 1.5rem;
    width: 98%;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: ${(props) => props.theme['gray-800']};
  margin-bottom: 0.5rem;
`;

export const OrgaoInfo = styled.div`
  font-size: 1rem;
  color: ${(props) => props.theme['gray-700']};
  margin-bottom: 1rem;

  p {
    margin: 0.25rem 0;
  }
`;

export const Description = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme['gray-700']};
  margin-bottom: 1.5rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); 
`;

export const TableHeader = styled.thead`
  background-color: ${(props) => props.theme['gray-250']}; 
  color: ${(props) => props.theme['gray-800']}; 
`;

export const TableHeaderRow = styled.tr`
  background-color: ${(props) => props.theme['gray-250']}; 
  border-bottom: 2px solid ${(props) => props.theme['gray-300']}; 
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  background-color: ${(props) => props.theme['white']}; 
  &:hover {
    background-color: ${(props) => props.theme['gray-100']}; 
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  text-align: left;
  color: ${(props) => props.theme['gray-700']}; 
  border-bottom: 1px solid ${(props) => props.theme['gray-300']}; 

  
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

export const TotalRow = styled.tr`
  background-color: ${(props) => props.theme['gray-250']}; 
  color: ${(props) => props.theme['gray-800']}; 
  border-top: 2px solid ${(props) => props.theme['gray-300']}; 
`;

export const TotalCell = styled.td`
  padding: 1rem;
  text-align: right;
  font-weight: bold;
  color: ${(props) => props.theme['gray-800']}; 

  
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export const PaginationButton = styled.button`
  background-color: ${(props) => props.theme['gray-300']};
  color: ${(props) => props.theme['gray-800']};
  border: none;
  padding: 1rem 1.75rem;
  margin: 0 0.5rem;
  border-radius: 0.25rem;

  &:hover {
    background-color: ${(props) => props.theme['gray-400']};
  }

  &:disabled {
    background-color: ${(props) => props.theme['gray-200']};
    cursor: not-allowed;
  }
`;
