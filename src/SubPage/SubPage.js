import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_KEY from '../config';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const SubPage = () => {
  const location = useLocation();
  const city = location.state; // 임시 설정 - 나중에 변경해주기
  const [weather, setWeather] = useState('');
  const [icon, setIcon] = useState(''); // 날씨 api에서 아이콘 받아와서 저장 
  
  // 현재 날짜 가져오기
  const now = new Date();
  const year = now.getFullYear();
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const todayMonth = month[now.getMonth()];
  const todayDate = now.getDate();
  const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const dayOfWeek = week[now.getDay()];


  // 날씨 api 불러온 결과 확인용
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      .then((response) => {
        const data = response.data; // api에서 가져오는 날씨정보 저장
        console.log(data);
        setWeather({
          id: data.weather[0].id,
          temperature: data.main.temp,
          main: data.weather[0].main,
          description: data.weather[0].description,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          feels_like: data.main.feels_like,
          humidity: data.main.humidity,
          wind_speed: data.wind.speed,
          
          loading: false,
          
        });
        setIcon(data.weather[0].icon);
        
      });
  }, []);

  
  // 슬라이더 적용 속성
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    focusOnSelect: true,
    responsive : [
      
      {
        breakpoint: 780,
        settings: {
            slidesToShow: 2,
        }
      },
      {
        breakpoint: 500,
        settings: {
            slidesToShow: 1,
        }
      },
    ]
  };
  

  return (
    <AppWrap>
    <div>
      <SearchBar>
        <span className='search_bar'>SearchBar</span>
        {/* <div></div> */}
      </SearchBar>
      <div className=''>
        <div className='city'><h2>{city}</h2></div>
        <div className='current_date'><h4>{todayMonth} {todayDate}, {dayOfWeek}</h4></div>
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
        <h1>{(weather.temperature - 273.15).toFixed(0)}℃</h1>
        <h3>{weather.main}</h3>
        <div>{weather.description}</div>
        <br />
        <br />
        <br />
        
        
        <SliderWrap>
          <Slider {...settings} >
            <div>
              <span>Min/Max Tmperature</span>
              <h3>
                {(weather.temp_min - 273.15).toFixed(0)}℃/
                {(weather.temp_max - 273.15).toFixed(0)}℃
              </h3>
            </div>
            <div>
              <span>Feels like</span>
              <h3>{(weather.feels_like - 273.15).toFixed(0)}℃</h3>
            </div>
            <div>
              <span>Wind</span>
              <h3>{weather.wind_speed}m/s SSE</h3>
            </div>
            <div>
              <span>Humidity</span>
              <h3>{weather.humidity}%</h3>
            </div>
          </Slider>
        </SliderWrap>
      </div>

    </div>
    </AppWrap>
  );
};

export default SubPage;

const SearchBar = styled.div`

  text-align: right;
  padding : 1% 4%;
  
  .search_bar {
    width: 150px;
    border-bottom: 1px solid black;
  }
`;

const SliderWrap = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ddeeb7;
  align-items: center;
  text-align: center;

`;