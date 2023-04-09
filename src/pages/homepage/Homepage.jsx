import React from 'react'
import Navbar from '../../components/navbar/Navbar'

const Homepage = () => {
  return (
    <div>
        <Navbar />
        <h1>Homepage</h1>
        <button type="button" class="btn btn-danger">Button</button><br />
        <img src="./assets/images/test.jpg" alt="city" width="300px" />
    </div>
  )
}

export default Homepage