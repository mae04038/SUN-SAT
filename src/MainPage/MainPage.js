import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import API_KEY from '../config';
import { useNavigate } from 'react-router';
import Slider from 'react-slick';

function MainPage() {
  const [result, setResult] = useState({}); //OpenWeather에서 받아온 모든 값 저장
  const [search, setSearch] = useState('');
  const [icon, setIcon] = useState(''); //OpenWeather ICon
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
      setIcon(curData.data.weather[0].icon);
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

  //슬라이더
  const settings = {
    arrows: true, //이전,다음 화살표 보이게
    infinite: true, //무한으로
    speed: 500, //넘어가는 속도
    slidesToShow: 3, //3개씩 보여주기
    slidesToScroll: 1, //1개씩 넘어가기
    responsive: [
      // 반응형 웹 구현 옵션
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <MainWrap>
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
<<<<<<< HEAD
            <img
              id='mainWeather'
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt='weatherIcon'
            />
            <div id='cityName'>{result.data.name}</div>
            <div id='temperature'>{result.data.main.temp}℃</div>
            <SliderWrap>
              <Slider {...settings}>
                <div>
                  <span>Weather</span>
                  <h3 id='sky'>{result.data.weather[0].main}</h3>
                </div>
                <div>
                  <span>Min/Max Tmperature</span>
                  <h3>
                    {result.data.main.temp_min}℃/
                    {result.data.main.temp_max}℃
                  </h3>
                </div>
                <div>
                  <span>Feels like</span>
                  <h3>{result.data.main.feels_like}℃</h3>
                </div>
                <div>
                  <span>Wind</span>
                  <h3>{result.data.wind.speed}m/s SSE</h3>
                </div>
                <div>
                  <span>Humidity</span>
                  <h3>{result.data.main.humidity}%</h3>
                </div>
              </Slider>
            </SliderWrap>
=======
            <div id='mainSlider' type='text'>
              <img
                id='mainWeather'
                src={'Images/cloudy.png'}
                alt='cloudy'
              ></img>
              <div id='cityName'>{result.data.name}</div>
              <div id='temperature'>{(result.data.main.temp).toFixed(0)}°⁣C</div>
              <div id='sky'>{result.data.weather[0].main}</div>
            </div>
>>>>>>> 18e1eec06e2d23ad6add0d74adf756ed2bc51395
          </ResultWrap>
        )}
      </div>
    </MainWrap>
  );
}

export default MainPage;

const MainWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ddeeb7;
  align-items: center;
  text-align: center;

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

    @media screen and (max-width: 580px) {
      max-width: 450px;
    }
  }
`;

const ResultWrap = styled.div`
  #mainWeather {
    width: 100px;
    height: 100px;
  }
`;

const SliderWrap = styled.div`
  width: 570px;
  margin: 10% auto;
  @media screen and (max-width: 645px) {
    max-width: 500px;
  }
  @media screen and (max-width: 580px) {
    max-width: 400px;
  }
`;
