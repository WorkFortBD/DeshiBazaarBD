import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

function FallbackImg(props) {
    const { withNextImg = false } = props;
    
    const [src, setSrc] = useState(props.src);
    const [errored, setErrored] = useState(false);

    const fallbackImgSrc = '/images/default/fallback-image.png';
    
    const onError = () => {
        if(!errored) {
            setErrored(true);
            setSrc(fallbackImgSrc);
        }
    }

    useEffect(() => {
        setSrc(props.src)
    }, [props.src])

    if(withNextImg) {
        return (
            <Image {...props} src={src ?? fallbackImgSrc} onError={onError} />
        )
    } else {
        return (
            <img className='img-responsive' {...props} src={src ?? fallbackImgSrc} onError={onError} />
        )
    }

}

FallbackImg.propTypes = {
  src: PropTypes.string,
  fallbackSrc: PropTypes.string,
  withNextImg: PropTypes.bool
};

export default FallbackImg;