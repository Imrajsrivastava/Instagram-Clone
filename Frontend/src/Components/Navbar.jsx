import React from 'react'
import logo from '../img/logo.png'
import {NavLink,Link} from 'react-router-dom'
import './Navbar.css'
import { useContext } from 'react'
import { LoginContext } from '../Contextapi/Logincontext'


import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
 
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

// const Links = ['profile', 'createPost', 'signup'];

// const NavLink = ({ children }: { children: ReactNode }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={'md'}
//     _hover={{
//       textDecoration: 'none',
//       bg: useColorModeValue('gray.200', 'gray.700'),
//     }}
//     href={'#'}>
//     {children}
//   </Link>
// );

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {userLogin} = useContext(LoginContext);


  const loginfun = ()=>{
    let token  = localStorage.getItem("jwt");
    console.log(token);
    if(token || userLogin){
      return [

        <NavLink to="/profile">Profile</NavLink>,
        <NavLink to="/createPost">Create Post</NavLink>

      ]
    }else{
      return [
        <NavLink to="/signup">SignUp</NavLink>,
        <NavLink to="/signin">SignIn</NavLink>

      ]
    }
  }

  // loginfun();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Link to="/"><Box><img src={logo} alt="" height="100px" width="110px"/></Box></Link>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              
              
             {loginfun()}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                {/* <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                /> */}
              </MenuButton>
              {/* <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList> */}
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            
           {/* <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/signup">SignUp</NavLink>
                <NavLink to="/signin">SignIn</NavLink>
                <NavLink to="/createPost">Create Post</NavLink> */}

                {loginfun()}
             
            </Stack>
          </Box>
        ) : null}
      </Box>

     
    </>
  );
}