import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './MainPage.css'; //폰트방법 찾으면 지울예정
import axios from 'axios';
import API_KEY from '../config';
import { useNavigate } from 'react-router';

function MainPage({ history }) {
  const [result, setResult] = useState({});
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  //현재 위치 성공
  const getPosSucc = (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const curCoords = { lat, lon };
    curWeather(curCoords);
    console.log('curCoords.lat : ', curCoords.lat);
    console.log('curCoords.lon : ', curCoords.lon);
  };

  //현재 위치 실패
  const getPosErr = () => {
    console.log('ERR :: 현재 위치를 가져오는 데 실패했습니다.');
    alert('ERR :: 현재 위치를 가져오는 데 실패했습니다.');
  };

  //현재 위치 Geolocation 성공/실패 함수
  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(getPosSucc, getPosErr);
  };

  //현재위치에 따른 현재날씨
  const curWeather = async (curCoords) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${curCoords.lat}&lon=${curCoords.lon}&appid=${API_KEY}&units=metric`;

    try {
      const curData = await axios({
        method: 'get',
        url: url,
      });
      setResult(curData);
      console.log('curData : ', curData.data);
    } catch (err) {
      console.log(err);
      alert('ERROR');
    }
  };

  useEffect(() => {
    getPosition();
  }, []);

  //Enter Key 누르면 페이지 이동
  const searchWeather = (e) => {
    if (e.key === 'Enter') {
      navigate('/search', {
        state: search,
      });
    }
  };
  return (
    <AppWrap>
      <div className='mainContainer'>
        <div className='mainLogo'>SUN-SAT</div>
        <input
          className='mainSearchbar'
          placeholder='지역을 검색하세요'
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={searchWeather}
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
