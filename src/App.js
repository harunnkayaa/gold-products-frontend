import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});

  useEffect(() => {
    axios.get('https://gold-products-api.onrender.com/products')

      .then(response => {
        setProducts(response.data);

        const initialColors = {};
        response.data.forEach((product, index) => {
          initialColors[index] = 'yellow';
        });
        setSelectedColors(initialColors);
      })
      .catch(error => {
        console.error('Hata:', error);
      });
  }, []);

  const handleColorChange = (index, color) => {
    setSelectedColors(prev => ({
      ...prev,
      [index]: color
    }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Product List</h1>

      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={4}
        slidesPerGroup={4}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                height: '100%'
              }}
            >
              <img
                src={product.images[selectedColors[index]]}
                alt={product.name}
                style={{
                  width: '100%',
                  maxWidth: '220px',
                  height: 'auto',
                  borderRadius: '8px',
                  marginBottom: '10px'
                }}
              />

              <h3 style={{ fontSize: '16px', margin: '5px 0' }}>
                {product.name}
              </h3>

              <p style={{ fontWeight: 'bold', margin: '5px 0' }}>
                ${product.price} USD
              </p>

              <p style={{ margin: '5px 0' }}>
                ⭐ {product.popularityScore} / 5
              </p>

              <div style={{ marginTop: '10px' }}>
                {Object.keys(product.images).map(color => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(index, color)}
                    style={{
                      backgroundColor:
                        color === 'yellow' ? '#E6CA97'
                          : color === 'white' ? '#D9D9D9'
                          : color === 'rose' ? '#E1A4A9'
                          : '#ccc',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border:
                        selectedColors[index] === color
                          ? '2px solid black'
                          : '1px solid #ccc',
                      margin: '3px',
                      cursor: 'pointer'
                    }}
                  ></button>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default App;
