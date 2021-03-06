import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap-modal'
import logo from './logo.svg';
import tekieLogo from './tekieLogo.png'
import flex from './flex.png'
import info from './info.png'
import './App.css';
import { ReactComponent as PlaySVG } from './play.svg'
import { ReactComponent as EditSVG } from './edit.svg'
import { ReactComponent as VideoSVG } from './video.svg'


const uri = 'https://script.google.com/macros/s/AKfycbyvC6_554Eh5Bs709VCOipMUnhIUZ5bd0sfMVRCBg/exec'
function App() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [fromSMS, setfromSMS] = useState(false)
  const [fromFB, setfromFB] = useState(false)

  let referred_from = useRef()
  useEffect(() => {
    const queryString = window.location.search
    console.log(queryString.includes('?fbclid='))
    if (queryString.includes('?r=s')) {
      setfromSMS(true)
    }
    if (queryString.includes('?fbclid=') || queryString.includes('?r=fb')) {
      setfromFB(true)
    }
    const URLParams = new URLSearchParams(queryString)
    referred_from.current = URLParams.get('refer')

  }, [])

  return (
    <div className="App">
      <div className="logo-container collab">
        <div className="bold  school-name" style={{
          textAlign: 'center'
        }}>D.A.V School</div>
        <div className="collab-text">in collaboration with</div>
        <img src={tekieLogo} className="tekieLogo collab" />
      </div>
      <div className="container">

        <div className="text big">Dear Parent,</div>
        <div className="text we-present">
          We present to you the <span className="underline">world's first educational series</span> to learn the basics of programming. Watch the teaser below.
        </div>
        <div class="videoWrapper">
          <iframe allowfullscreen="true" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="788.54" height="443" type="text/html" src="https://www.youtube.com/embed/bliaWebwP08?autoplay=1&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0"></iframe>
        </div>
        </div>
        <div className="team-container">
          <div className="text small">Brought to you by a team from</div>
          <div className="flex-container">
            <div className="flex-grid-wrapper">
              <div className="flex-items google">
              </div>
              <div className="flex-items intel"></div>
              <div className="flex-items microsoft"></div>
              <div className="flex-items amazon"></div>
              <div className="flex-items iitDelhi">IIT Delhi</div>
              <div className="flex-items iitAhemdabad">IIM Ahemdabad</div>
              <div className="flex-items iitNit">NITs</div>
            </div>
          </div>
        </div>
        <div className="container">
        <div className="title collab">REINVENTING EDUCATION.</div>
        <div className="subTitle">
          ABOUT TEKIE
        </div>
        <div className="text">
          Tekie is a platform built by people from IIT IIM Google Intel Microsoft Amazon, to teach programming, live 1:1 to students of age 12+ worldwide.
        </div>
        <div className="text noMargin">
          We are on a mission to train innovators and entrepreneurs of next-generation on the right skills they need for the future.
        </div>
        <div className="subTitle" id="free-session">
          CLAIM YOUR FIRST FREE SESSION!
        </div>
        <div className="text">
          Enrolling now for our first ever batch this summer. We recommend you to book at the earliest since we have <span className="underline">limited spots available</span>.
        </div>
        <form>
          <input onChange={(e) => {
            setName(e.target.value)
          }} name="name" type="text" placeholder="Enter your name" className="name-input" value={name}></input>
          <input onChange={(e) => {
            setPhone(e.target.value)
          }} name="phone_number" type="tel" placeholder="Phone number" value={phone}></input>
          <div className={isLoading ? "button isLoading" : "button"} onClick={async () => {
            if (!isLoading) {
              let monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
              let dateObj = new Date();       
              let month = monthNames[dateObj.getMonth()];
              let day = String(dateObj.getDate()).padStart(2, '0');
              let year = dateObj.getFullYear();
              let date = day + ', ' + month  + ' ' + year;
              let hours = dateObj.getHours()
              let clock = ''
              if (hours >= 12) {
                if (hours !== 12) {
                  hours = hours - 12
                } 
                clock = 'pm'
              } else {
                clock = 'am'
              }
              hours = String(hours).padStart(2, '0')
              let minute = String(dateObj.getMinutes()).padStart(2, '0')
              let time = `${hours}:${minute} ${clock}`

              let url = `${uri}?name=${name}&phone_number=${phone}&time=${date + ' ' + time}&from_sms=${fromSMS}&from_fb=${fromFB}`
              if (referred_from.current) {
                url = `${url}&referred_from=${referred_from.current}`
              }
              console.log(url)
              if (name && phone) {
                setIsLoading(true)
                console.log()
                await fetch(url)
                setIsLoading(false)
                setShowModal(true)
                setName('')
                setPhone('')
              }
            }
          }}>
          {isLoading ? 'Enrolling...' : 'Enroll now' }
          </div>
        </form>
      </div>
      <div className="showcase">
      </div>

      <div>

      </div>
      <div className="subTitle">
        ABOUT THIS COURSE
      </div>
      
      <div className="aboutCourseContainer">
        <div className='aboutCourseWrapper'>
          <div className="iconContainer">
            <PlaySVG/>
          </div>
          <div className="title blue">45 LESSONS</div>
          <div className="text course">Videos and lesson workbooks made by the best teachers, period.</div>
        </div>

        <div className='aboutCourseWrapper'>
          <div className="iconContainer">
            <VideoSVG/>
          </div>
          <div className="title blue">LIVE 1:1 SESSIONS</div>
          <div className="text course">Our instructors thoroughly discuss and show you how to analyze algorithms. </div>
        </div>

        <div className='aboutCourseWrapper projects'>
          <div className="iconContainer">
            <EditSVG/>
          </div>
          <div className="title blue">PROJECTS</div>
          <div className="text course">Over 900 coding exercises to practice with hands-on projects.</div>
        </div>
      </div>
      


      <div className="container">
        <div className="subTitle">
          Frequently Asked Questions
        </div>
        <div className="text question">
          1. Who should take this course?	
        </div>
        <div className="text answer">
          Well, anyone over age 12 who wants to start learning to program or get a flavor of what programming is all about or to see if this excites you can start with this course.
        </div>
        <div className="line-break"></div>
        <div className="text question">
          2. Do I need to be familiar with coding to take this course?
        </div>
        <div className="text answer">
          No, you can start without any previous knowledge.
        </div>
        <div className="line-break"></div>
        <div className="text question">
          3. Is this course completely online?
        </div>
        <div className="text answer">
          Yes, you can go anywhere in the universe (with wifi) and you'll be able to take this course.
        </div>
        <div className="line-break"></div>
        <div className="text question">
          4. Is this course beginner friendly?	
        </div>
        <div className="text answer">
          Don’t worry! All our classes are beginner-friendly. We have sessions designed specifically for beginners. Right from your first class, we’ll make sure we help you get started and feel totally comfortable.
        </div>
        <div className="line-break"></div>
        <div className="text question">
          5. I have never coded before. From where should I begin?
        </div>
        <div className="text answer">
          If this is your first time coding, we recommend you start with our foundation series. The guided sessions with our highly trained instructors make it a cakewalk so you can easily sit and learn. By the end of this series, you will go deeper into the world of coding. 
        </div>
        <div className="line-break"></div>
        <div className="text question">
          6. I have programmed at an intermediate level before. Should I take this course?
        </div>
        <div className="text answer">
          You can always choose to skip the foundation series. However, there is a treasure of knowledge around algorithmic thinking that we offer in the foundation series. So, we recommend that you try them out even if you have coded before.
        </div>
        <div className="line-break"></div>
        <div className="text question">
          7. How are the classes designed and scheduled?
        </div>
        <div className="text answer">
          Your classes are designed by highly qualified teachers. Classes are planned very logically keeping in mind various factors such as covering all learning goals over a session through multiple intuitive formats of content that develops algorithmic thinking, improves problem solving skills & creativity. We also make sure that the session is interesting, fun and pushes students just the right amount.
        </div>
        <div className="line-break"></div>
        <div className="text question email-us">
          More Questions? Email <a href="mailto:hello@tekie.in?">hello@tekie.in</a>
        </div>
        <div className="text creator">
          Made by entrepreneurs for the next generation entrepreneurs.
        </div>
      </div>
      <Modal
          show={showModal}
          onHide={() => { setShowModal(false)}}
          aria-labelledby="ModalHeader"
        >
        <Modal.Header closeButton>
          <Modal.Title id='ModalHeader'>Thanks for enrolling.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>We'll get back to you shortly to know more about your child and share other details.</p>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary' onClick={() => { setShowModal(false)}}>
            Ok
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
