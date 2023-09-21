import React from 'react'

const Banner = () => {
  return (
    <>  
   <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval={10000}>
      <img src="/imagess/s7.jpg" className="d-block w-100"  style={{height:"400px"}}    alt="..." />
    </div>
    <div className="carousel-item" data-bs-interval={2000}>
      <img src="/imagess/s1.jpg" className="d-block w-100"  style={{height:"400px"}}  alt="..." />
    </div>
    <div className="carousel-item">
      <img src="/imagess/s5.jpg" className="d-block w-100"style={{height:"400px"}}  alt="..." />
    </div>
    <div className="carousel-item">
      <img src="/imagess/s2.jpg" className="d-block w-100" style={{height:"400px"}} alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>


    </>
  )

}

export default Banner