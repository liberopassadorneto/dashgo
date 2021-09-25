import { Box, Stack, Text } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

interface PaginationProps {
  totalOfUsers: number;
  usersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

// exemplo para currentPage = 5
// páginas irmãs: "4 e 6"
// uma irmã da esquerda e outra irmã da direita
const siblingsCount = 1;

// exemplo generatePagesArray(2, 5)
// criar um novo Array de tamanho 3
// percorrer/preencher este Array da seguinte forma:
// [2+0+1, 2+1+1, 2+2+1] => [3, 4, 5]
// Ou seja, gera um Array de páginas que "cabem" dentro de 2-5 (não incluindo o from, isto é, 2)
function generatePagesArray(from: number, to: number) {
  return (
    [...new Array(to - from)]
      .map((_, index) => {
        return from + index + 1;
      })
      // excluir as páginas que são negativas (<1)
      // instância: to < from
      .filter((page) => page > 0)
  );
}

export function Pagination({
  totalOfUsers,
  usersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.floor(totalOfUsers / usersPerPage);

  // exemplo para currentPage = 5
  // exibir as páginas da seguinte maneira: "1 ,..., 4, 5, 6,..., 20"
  // 5-1-1, 5-1 => 3 , 4
  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  // exemplo para currentPage = 5
  // 5, min(5 + 1, 100/10)
  // 5 , min(6, 10) => 5, 6
  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  return (
    <Stack
      direction={['column', 'row']}
      spacing='6'
      mt='8'
      justify='space-between'
      align='center'
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction='row' spacing='2'>
        {/* se a página anterior não for a primeira */}
        {/* currentPage = 5 => 5 > 1 + 1 => 5 > 2 => true */}
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem number={1} />
            {currentPage > 2 + siblingsCount && (
              <Text color='gray.300' width='8' textAlign='center'>
                ...
              </Text>
            )}
          </>
        )}

        {/* página anteriores */}
        {previousPages.length > 0 &&
          previousPages.map((page) => {
            return <PaginationItem key={page} number={page} />;
          })}

        <PaginationItem number={currentPage} isCurrent />

        {/* páginas posteriores */}
        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return <PaginationItem key={page} number={page} />;
          })}

        {/* se página posterior não for a última página */}
        {/* currentPage = 5 => 5 + 1 < 10  => 6 < 10 => true */}
        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color='gray.300' width='8' textAlign='center'>
                ...
              </Text>
            )}
            <PaginationItem number={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
