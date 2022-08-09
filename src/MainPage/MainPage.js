import React, { useState } from 'react';
import styled from 'styled-components';
import './MainPage.css'; //폰트방법 찾으면 지울예정
import axios from 'axios';
import API_KEY from '../config';

function MainPage() {
  const [location, setLocation] = useState('');
  const [result, setResult] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
  //const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  //Enter Key 누를 때 비동기방식으로 검색진행
  const searchWeather = async (e) => {
    if (e.key === 'Enter') {
      try {
        const data = await axios({
          method: 'get',
          url: url,
        });
        console.log(data);
        setResult(data);
      } catch (err) {
        alert(err);
      }
    }
  };
  return (
    <AppWrap>
      <div className='mainContainer'>
        <div className='mainLogo'>SUN-SAT</div>
        <input
          className='mainSearchbar'
          placeholder='지역을 검색하세요'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type='text'
          onKeyDown={searchWeather}
        />
        {/* setResult : useState 안에 {} 빈 오브젝트가 아니면 */}
        {Object.keys(result).length !== 0 && (
          <ResultWrap>
            <div id='mainSlider' type='text'>
              <img
                id='mainWeather'
                src={'Images/cloudy.png'}
                alt='cloudy'
              ></img>
              <div id='cityName'>{result.data.name}</div>
              <div id='temperature'>{result.data.main.temp}°⁣C</div>
              <div id='sky'>{result.data.weather[0].main}</div>
            </div>
          </ResultWrap>
        )}
      </div>
    </AppWrap>
  );
}

export default MainPage;

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ddeeb7;
  align-items: center;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;

  .mainContainer {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }

  .mainLogo {
    font-size: 50px;
  }

  .mainSearchbar {
    box-sizing: border-box;

    width: 561px;
    height: 42px;
    margin: 45px;
    padding: 20px;

    background: #ffffff;
    border: 1px solid #d1cece;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
  }
`;

const ResultWrap = styled.div`
  #mainWeather {
    width: 70px;
    height: 70px;
  }
`;
