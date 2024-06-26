import Header from '@/components/layout/Header';
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const HomePageStyles = styled.div``;

const HomePage = () => {
  return (
    <HomePageStyles>
      <Header />
    </HomePageStyles>
  );
};

export default HomePage;
