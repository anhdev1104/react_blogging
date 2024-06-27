import styled from 'styled-components';
import PostFeatureItem from '../posts/PostFeatureItem';
import Heading from '@/components/layout/Heading';
const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container-page">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
