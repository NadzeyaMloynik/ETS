import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

const ConvertImage = ({ imageByteArray }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (imageByteArray) {
      const base64String = btoa(String.fromCharCode(...new Uint8Array(imageByteArray)));
      setImageSrc(`data:image/jpeg;base64,${base64String}`);
    }
  }, [imageByteArray]);

  return imageSrc ? <Image src={imageSrc} alt="Question Image" fluid /> : null;
};

export default ConvertImage;
