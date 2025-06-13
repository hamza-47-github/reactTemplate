import React, { useRef, useState } from 'react';
import { Chip } from "primereact/chip";
const TabList = ({ categories, handleCategoryClick, selectedCategoryId }) => {
  const containerRef = useRef(null);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].pageX);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!startX) return;
    const x = e.touches[0].pageX;
    const distance = x - startX;
    containerRef.current.scrollLeft = scrollLeft - distance;
  };

  const handleTouchEnd = () => {
    setStartX(null);
  };

  return (
    <div
      ref={containerRef}
      className="tablist-container"
      style={{
        // overflowX: 'hidden',
        whiteSpace: 'nowrap',
        WebkitOverflowScrolling: 'touch',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {categories && categories.map((category, index) => (
        <div key={index} onClick={() => handleCategoryClick(category.id)} style={{ display: 'inline-block' }}>
   
          <div className={`card me-2 border-0 mb-2 rounded-1 px-2 py-2  ${category.id === selectedCategoryId ? 'active' : ''}`} style={{background:'transparent'}}>
            <div className='card-image'>
              <img width={'96px'}
               height={'96px'}
                src={category.imageUr} 
                alt='image' className='rounded-circle'  />
              <br/>
            
            </div>
          </div>
          <div className={`me-4 mb-2 cuisine-tile__title tab-category ${category.id === selectedCategoryId ? 'active' : ''}`}>
          <span className=''>{category.name}</span>
          </div>

          {/* <Chip  icon={<i className="fa-solid fa-utensils icon-spacing"></i>} 
           label={category.name} className={`redChip mx-2 my-4 box ${category.id === selectedCategoryId ? 'active' : ''}`} /> */}
        </div>
      ))}
    </div>
  );
};

export default TabList;