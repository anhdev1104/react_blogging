import Layout from '@/components/layout/Layout';
import { auth } from '@/firebase/config';
import HomeBanner from '@/modules/home/HomeBanner';
import HomeFeature from '@/modules/home/HomeFeature';
import HomeNewest from '@/modules/home/HomeNewest';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const HomePageStyles = styled.div``;

const HomePage = () => {
  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;
