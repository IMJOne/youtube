import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';

import Guidebar from '../components/Guidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import NotFound from './NotFound';
import VideoCard from '../components/VideoCard';

export default function Videos() {
  // React query
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(['videos', keyword], () => youtube.search(keyword), {
    staleTime: 1000 * 60, // 받아온 데이터를 1분동안 캐싱
  });

  // Set page title
  useEffect(() => {
    const pageTitle = document.querySelector('title');
    pageTitle.innerText = 'YouTube';
  }, []);

  return (
    <section className="flex p-4">
      <Guidebar />
      {isLoading && <LoadingSpinner />}
      {error && <NotFound />}
      {videos && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 px-3 lg:px-10">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} isLoading={isLoading} />
          ))}
        </ul>
      )}
    </section>
  );
}
