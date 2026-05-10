import React from 'react';
import "../App.css";

const LandingPage = () => {
  return (
    <div className='landingPageContainer'>
      <nav>
        <div className='logo'>
          <h2>MyVideo</h2>


        </div>
        <div className='credentials'>
          <div className='black-color-btn'>
          <button>Join as guest</button>
          <button>Sign in</button>
          </div>
          <button className='sign-up'>Sign up</button>


        </div>
      </nav>

      <main className='landingMain'>
        <div className='landingLeft'>
          <p className='main-title'><span style={{color:"(#1e293b"}}>Real-time video meetings,</span> <i style={{color:"#e040a0"}}>reimagined.</i></p>
          <p className='main-texts'>Experience seamless collaboration powered by a high-performance Socket.io engine. Engineered specifically for the Google internship application to showcase low-latency synchronization and scalable architecture.</p>

          <div className='landingButtons'>
            <button className='start-meeting-btn'>Start a Meeting</button>
            {/* <button>View Project Details</button>  */}
          </div>
        </div>


        <div className='landingRight'>
          <div className='heroImageContainer'>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFP_nNWFx6eouuSy_dx9ZK6uzDna4bCOQEslJj4GVHSzOcN3z6auO6JAjO87euzzbHqfBu9yZCtn3-HrbRRiVVBI4mDIjyeqU3L4JXfYyCmAtCxerwnSFIshGVKPq2I9N1L7O_-1w6QbKdPhjRYqAt6qUzjJFfRsFD0KMzfJMCliaj7iubhll2YiXHITWiEDggqSJLQhtP4iLYZPatdTQvx8eDHkeAnJuAouZvBGDNlJCoZLLK_WqPnZb21U3_315PETEwVFkfkkXW" alt="hero-image"></img>

          </div>

        </div>

      </main>




    </div>
  )
}

export default LandingPage;
