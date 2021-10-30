import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 4rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--shape);
      color: var(--text-body);
      border-radius: 0.25rem;

      &:first-child { // O primeiro TD sempre fica com a cor da variável --text-child
        color: var(--text-child);
      }

      &.deposit { // Todos os TD com o className deposit ficam com a cor da variável --green
        color: var(--green);
      }

      &.withdraw { // Todos os TD com o className deposit ficam com a cor da variável --red
        color: var(--red);
      }
    }
  }
`;