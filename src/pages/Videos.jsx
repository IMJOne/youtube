import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import VideoCard from '../components/VideoCard';
import axios from 'axios';

export default function Videos() {
  const { keyword } = useParams();
  const {
    isLoding,
    error,
    data: videos,
  } = useQuery(['videos', keyword], async () => {
    return axios //
      .get(`/videos/${keyword ? 'search' : 'popular'}.json`)
      .then(response => response.data.items);
  });

  return (
    <>
      <div>Videos {keyword ? `🔎${keyword}` : '🔥'}</div>
      {isLoding && <p>Loading...</p>}
      {error && <p>Error ❌</p>}
      {videos && (
        <ul>
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
}
