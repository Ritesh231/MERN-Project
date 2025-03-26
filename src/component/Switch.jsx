import React from 'react';
import '../pages/switch/switch.css';
const SocialMediaRadioSection = () => {
  return (
    <section className="radio-section">
      <div className="radio-list"  style={{ paddingleft: window.innerWidth <= 768 ? '300px' : '100px',}}>
        <div className="radio-item">
          <input name="radio" id="radio1" type="radio" />
          <label htmlFor="radio1" className='text'>Human Detection AI</label>
        </div>
        <div className="radio-item">
          <input name="radio" id="radio2" type="radio" />
          <label htmlFor="radio2" className='text'>Fire Detection AI</label>
        </div>
        <div className="radio-item">
          <input name="radio" id="radio3" type="radio" />
          <label htmlFor="radio3" className='text'>Number Plate Detection AI</label>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaRadioSection;
