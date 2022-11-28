import React, {useState} from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';

import './Footer.scss';

const Footer = () => {
  const [ formData, setFormData ] = useState({ name: '', email: '', message: ''});
  const [ isFormSubmitted, setIsFormSubmitted ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message
    }

    client.create(contact)
      .then(()=>{
        setLoading(false);
        setIsFormSubmitted(true);
    })
  }
  return (
    <>
      <h2 className='head-text'>Take a coffe & chat with me</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:mr.qmi5plus@gmail.com" className='p-text'>mr.qmi5plus@gmail.com</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +821056227140" className='p-text'>+82 10 5622 7140</a>
        </div>
        {!isFormSubmitted ? 
          (<div className="app__footer-form app__flex">
            <div className="app__flex">
              <input type="text" className="p-text" placeholder='Your name' value={name} onChange={handleChangeInput} name="name" />
            </div>
            <div className="app__flex">
            <input type="text" className="p-text" placeholder='Your email' value={email} onChange={handleChangeInput} name="email" />
            </div>
            <div>
              <textarea name="message" id="" cols="30" rows="10" className='p-text' placeholder='Your message' value={message} onChange={handleChangeInput}></textarea>
            </div>
            <button className='p-text' onClick={handleSubmit} type="button">{loading ? "Sending":"Send Message"}</button>
          </div>) 
          :
          (<div>
            <h3 className="head-text">Thank you for getting in touch</h3>
          </div>)
        }
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer,'app__footer'),
  'contact',
  "app__primarybg"
);