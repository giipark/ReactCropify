import {useEffect, useState} from "react";
import ImageCropper from "./ui/ImageCropper";
import ImageGallery from "./ui/ImageGallery";
import useImageCompress from "./hooks/useImageCompress";
import {dataURItoFile} from "./utils/common";
import axios from "axios";

function App() {
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressedImageFile, setCompressedImageFile] = useState<File[]>([]);
  const {isLoading: isCompressLoading, compressImage} = useImageCompress();

  const handleUploadImage = (image: string) => setUploadImage(image || null);

  const handleCompressImage = async () => {
    if (!uploadImage) return;

    const imageFile = dataURItoFile(uploadImage);

    const compressedImage = await compressImage(imageFile);

    const compressedImageArray: File[] = [];

    // 이미지 서버 저장 로직
    if (!compressedImage) return;
    compressedImageArray.push(compressedImage);
    const imageUrl = URL.createObjectURL(compressedImage);
    setCompressedImage(imageUrl);

    setCompressedImageFile(prevImages => [...prevImages, ...compressedImageArray])
  };

  const addFilesToFormData = (files: File[], formData: FormData) => {
    files.forEach((file, index) => {
      formData.append('images', file);
    });
  };

  const handleDownloadImage = async () => {

    const formData = new FormData;

    addFilesToFormData(compressedImageFile, formData);

    try {
      const response = await axios.post<string>('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          charset: 'utf-8',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST"
        },
      });

      if (response.status === 200) {
        console.log("Image uploaded successfully");
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  useEffect(() => {
    if (uploadImage) {
      handleCompressImage();
    }
  }, [uploadImage]);

  return (
    <div className="App">
      <div className="top-gallery">
        {compressedImageFile ? (
          <ImageGallery imageFiles={compressedImageFile}/>
        ) : null}
      </div>
      <div className="profile">
        {compressedImage ? (
          <img src={compressedImage}/>
        ) : (
          <div className="cover">
            {isCompressLoading ? "이미지 압축 중.." : "이미지가 없어요."}
          </div>
        )}
      </div>
      <div>
        <ImageCropper onCrop={handleUploadImage}>
          <button className="image-upwload-button">이미지 등록</button>
        </ImageCropper>
        <button className="image-upwload-button" onClick={handleDownloadImage}>저장하기</button>
      </div>
    </div>
  );
}

export default App;