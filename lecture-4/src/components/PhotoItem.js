import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { showModal } from '../redux/imageModal';
import LazyLoad from 'react-lazyload'
import {getAverageColorOfImage} from "../utils/getAverageColorOfImage";
import { setBgColor } from "../redux/imageModal";

function PhotoItem({ photo: { urls, alt } }) {
  const dispatch = useDispatch();

  const openModal = (e) => {
    dispatch(showModal({ src: urls.full, alt }));

    // 섬네일 이미지로 배경색 계산 후, 리덕스에 저장
    const averageColor = getAverageColorOfImage(e.target);
    dispatch(setBgColor(averageColor));
  };

  return (
    <ImageWrap>
      <LazyLoad offset={1000}>
        <Image crossOrigin="*" src={urls.small + '&t=' + new Date().getTime()} alt={alt} onClick={openModal} />
      </LazyLoad>
    </ImageWrap>
  );
}

const ImageWrap = styled.div`
  width: 100%;
  
  //padding-bottom: 56.25%;
  //position: relative;
  
  aspect-ratio: 16 / 9;
`;

const Image = styled.img`
  cursor: pointer;
  width: 100%;
  
  //position: absolute;
  //height: 100%;
  //top: 0;
  //left: 0;
  
  height: 100%;
`;

export default PhotoItem;