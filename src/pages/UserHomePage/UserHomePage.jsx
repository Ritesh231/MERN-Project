import React, { useState } from 'react';
import Navigation2 from '../../component/Navigation2';
import VideoPlayer from '../../component/videoplayer';

function UserHomePage() {
  const [videoId, setVideoId] = useState(null);
  const [sessionJoined, setSessionJoined] = useState(false);

  function playVideo(e, videoId) {
    e.preventDefault();
    setVideoId(videoId);
  }

  return (
    <div>
      <Navigation2 />
      <div className="App">
        {videoId && <VideoPlayer videoId={videoId} onSessionJoin={() => setSessionJoined(true)} />} <br />
        
        {/* Hide buttons when session is joined */}
        {!sessionJoined && (
          <>
            <button onClick={(e) => playVideo(e, 'cdn')}>Play Video 1</button>
            <button onClick={(e) => playVideo(e, 'cdn')}>Play Video 2</button>
          </>
        )}
      </div>
    </div>
  );
}

export default UserHomePage;
