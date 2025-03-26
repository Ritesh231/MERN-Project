import * as React from 'react';
import "../pages/TextLayout/TextLayout.css"

const ImageTextLayout = () => {
  return (
    <div>
      {/* First ImageTextLayout */}
      <div className="image-text-container1">
        <div className="image-container">
          <img
            src="../../src/assets/Background.jpg"
            alt="Your Alt Text"
            className="image"
          />
        </div>
        <div className="text-container">
          <h2>Watch Movie With Friends</h2>
          <p>Watching a movie with friends is a fun and memorable experience that brings people closer. 
            Whether at home, in a theater, or through an online watch party, sharing a film allows for laughter, excitement, and meaningful discussions. 
            It’s a great way to unwind, bond over favorite genres, and enjoy snacks together. With advancements in technology, even long-distance friends 
            can watch movies together through video chatting and synchronized streaming platforms. From classic films to the latest blockbusters, movie nights 
            with friends create lasting memories and enhance the joy of storytelling in a shared atmosphere.
          </p>
        </div>
      </div>

      {/* Second ImageTextLayout with text on left and image on right */}
      <div className="image-text-container2">
        <div className="text-container">
          <h2>Video Chatting Featured Movie Platform</h2>
          <p>A video chatting featured movie platform is an innovative way to watch
             movies with friends and family remotely while staying connected through live video chat. 
             This platform integrates real-time video calls with synchronized movie streaming, allowing users to watch films together,
              react instantly, and engage in conversations without needing third-party apps. Features often include group watch parties,
               screen-sharing options, interactive emojis, and chat overlays to enhance the experience. 
          </p>
        </div>
        <div className="image-container">
          <img
            src="../../src/assets/pc2.jpg"
            alt="Your Alt Text"
            className="image"
          />
        </div>
      </div>

      {/* Third ImageTextLayout */}
      <div className="image-text-container3">
        <div className="image-container">
          <img
            src="../../src/assets/pc1.jpg"
            alt="Your Alt Text"
            className="image"
          />
        </div>
        <div className="text-container">
          <h2>Minimum Payment Plans with more Features</h2>
          <p>Minimum payment plans with more features offer a budget-friendly way for users to access premium 
            services without compromising on quality or functionality. These plans provide essential benefits at a 
            lower cost while including additional perks like ad-free experiences, higher resolution streaming, cloud storage,
             or exclusive content. Many platforms, such as streaming services, SaaS products, and mobile apps, offer tiered pricing where 
             users can choose a basic yet feature-rich plan that suits their needs. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageTextLayout;
