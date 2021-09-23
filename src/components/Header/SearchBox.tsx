import { Flex, Input as ChakraInput, Icon } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

// Tipos de Forms no React !!Tomar cuidado com o debounce no Searching!!
// Controlled Components -> useState() -> Para Forms Simples
// OR
// Uncontrolled Components -> useRef()
// Imperativa vs Declarativa

export function SearchBox() {
  // const [search, setSearch] = useState('');

  const searchInputRef = useRef<HTMLInputElement>(null);

  // console.log(searchInputRef?.current?.value); // Imperativa

  return (
    <Flex
      as='label'
      flex='1'
      py='4'
      px='8'
      ml='6'
      maxWidth={400}
      alignSelf='center'
      color='gray.200'
      position='relative'
      bg='gray.800'
      borderRadius='full'
    >
      <ChakraInput
        color='gray.50'
        variant='unstyled'
        px='4'
        mr='4'
        placeholder='Buscar na plataforma'
        _placeholder={{ color: 'gray.400' }}
        ref={searchInputRef}
        // value={search}
        // onChange={(event) => setSearch(event.target.value)}
        // focus={searchActive === true} // Declarativa
      />
      <Icon as={RiSearchLine} fontSize='20' />
    </Flex>
  );
}
