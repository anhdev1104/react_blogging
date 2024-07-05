import styled from 'styled-components';
import PostFeatureItem from '../posts/PostFeatureItem';
import Heading from '@/components/layout/Heading';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';
const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, 'posts');
    const q = query(colRef, where('status', '==', 1), where('hot', '==', true));
    onSnapshot(q, snapshot => {
      const result = [];
      snapshot.forEach(doc => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(result);
    });
  }, []);
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container-page">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {posts.map(post => (
            <PostFeatureItem key={post.id} data={post} />
          ))}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
