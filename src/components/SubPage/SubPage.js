import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './SubPage.css'
import API_KEY from '../../config';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';

const SubPage = () => {
    const city = 'Seoul'; // 임시 설정 - 나중에 변경해주기
    const [weather, setWeather] = useState("");
        
    // 날씨 api 불러온 결과 확인용
    useEffect(() => {
        axios        
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
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
            
                loading: false,
            });
        })
    }, []);
        

    const settings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode:true,
        centerPadding: '0px',
        focusOnSelect: true
    }

    return (
        <div >
            <SearchBar><span>SearchBar</span></SearchBar>
            <div>
                <h2>{city}</h2>
                <h4>날짜-시간</h4>
                <div>날씨 아이콘</div>
                <h1>{(weather.temperature - 273.15).toFixed(0)}℃</h1>
                <h3>{weather.main}</h3>
                <div>{weather.description}</div>
                <br />
                <br />
                <br />
                <div>슬라이더 위치</div>
                <Slider {...settings}>
                    <div>
                        <h3>최저/최고 기온</h3>
                        <div>{(weather.temp_min - 273.15).toFixed(0)}℃/{(weather.temp_max - 273.15).toFixed(0)}℃</div>
                    </div>
                    <div>
                        <h3>습도</h3>
                        <div></div>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                </Slider>
            </div>

        </div>
    );
}


export default SubPage;

const SearchBar = styled.div`
    text-align: right
`;