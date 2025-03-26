import React, { useState, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import emailjs from 'emailjs-com';
import ReactQuill from 'react-quill';
import { RxDoubleArrowRight } from "react-icons/rx";
import '../pages/SupportPage/SupportPage.css';

const SupportPage = () => {
  const [senders, setSenders] = useState([]); // Array to store sender email addresses
  const [messageValue, setMessageValue] = useState('');
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [isMessageFocused, setMessageFocused] = useState(false);
  const messageRef = useRef(null);

  const handleInputChange = (event) => {
    setSenders(event.target.value.split(',')); // Splitting input by comma to get multiple email addresses
  };

  const handleQuillChange = (value) => {
    setMessageValue(value);
  };

  const handleMessageFocus = () => {
    setMessageFocused(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    senders.forEach((senderEmail) => {
      const cleanMessage = messageValue.replace(/<\/?p>|<\/?strong>/g, '')
      const templateParams = {
        from_name: senderName,
        to_name: recipientName,
        email_id: senderEmail,
        Message: cleanMessage,
      };

      emailjs.send('service_s9aaynj', 'template_qb8d506', templateParams, 'VhzjhqhO6ZwZQTrFY')
        .then((response) => {
          console.log('Email sent successfully:', response);
          alert('Email sent successfully!');
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          alert('Failed to send email. Please try again later.');
        });
    });

    // Clear form fields after submission
    setSenders([]);
    setMessageValue('');
    setSenderName('');
    setRecipientName('');
  };

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image'],
    [{ 'align': [] }],
    ['clean'],                   
  ];
  return (
    <div className="support-page-container">
      <div className='First-Section'>
        <h1 className="title">How Can We Help You?</h1>
      </div>
      <h3 className='contact-heading'>Contact Us</h3>
      <section className="contact-section">
        <div className="contact-content">
          <form className="contact-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <input 
              className='email'
                type="text" 
                name="name" 
                placeholder="Sender Email address here" 
                value={senders.join(',')} // Joining array back to a comma-separated string
                onChange={handleInputChange}
              />
              <label ref={messageRef} className={`message-container ${isMessageFocused ? 'focused' : ''}`} onClick={handleMessageFocus}>
                <ReactQuill
                  value={messageValue}
                  onChange={handleQuillChange}
                  placeholder="Type your message..."
                  modules={{
                    toolbar: toolbarOptions
                  }}
                />
              </label>
              <button type="submit" className='Submit1'>Send <RxDoubleArrowRight /></button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );                             
};

export default SupportPage;
