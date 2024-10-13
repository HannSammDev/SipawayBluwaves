import React, { useState, useEffect } from 'react';

function ViewportSize() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
   
    function handleResize() {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    }

   
    window.addEventListener('resize', handleResize);

   
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  return (
    <div>
      <p>Viewport Width: {viewportWidth}px</p>
      <p>Viewport Height: {viewportHeight}px</p>
    </div>
  );
}

export default ViewportSize;
