# README #

## 실행 방법
### 설치
```shell
cd ./frontend; pnpm install
cd ./backend; pnpm install
```
### 실행
Client
```shell
# package.json의 scripts에 Port 번호 set 하여 사용. (현재 PORT = 3002)
cd ./frontend; pnpm start
```
Server
```shell
# ./routes/index.js에 Port 설정. (현재 PORT = 3001)
# .env 파일로 따로 세팅해서 사용할 수도 있음.
cd ./backend; pnpm start
```
#### 프로세스
1. 이미지 등록 후 원하는 영역 드래그하여 자르기.
2. 원하는 영역을 선택했다면, 적용하기. (파일 압축 처리) 
3. 적용한 이미지 들이 Gallery 형식으로 위에 표시.
4. 1~3번 반복
5. 모든 이미지들을 등록했다면, 저장하기. (서버의 uploads폴더에 저장)


## react-cropper
이미지 자르기 기능이 포함된 라이브러리 <br/>
cropper.js를 React 용으로 변경한 라이브러리 <br/>

**Main Function**
```javascript
interface PropsType {
    onCrop: (image: string) => void;
    aspectRatio?: number;
    children: React.ReactNode;
}

...

const cropperRef = useRef<ReactCropperElement>(null);

...

const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
        onCrop(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
        setImage(null);
    }
};
```


* Github: [react-cropper](https://github.com/react-cropper/react-cropper)
* Github: [cropperjs](https://github.com/fengyuanchen/cropperjs/tree/main)

## browser-image-compression
이미지 파일 사이즈 압축하는 라이브러리

**Main Function**
```javascript
// you should provide one of maxSizeMB, maxWidthOrHeight in the options
const options: Options = { 
  maxSizeMB: number,            // (default: Number.POSITIVE_INFINITY)
  maxWidthOrHeight: number,     // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
                                // but, automatically reduce the size to smaller than the maximum Canvas size supported by each browser.
                                // Please check the Caveat part for details.
  onProgress: Function,         // optional, a function takes one progress argument (percentage from 0 to 100) 
  useWebWorker: boolean,        // optional, use multi-thread web worker, fallback to run in main-thread (default: true)
  libURL: string,               // optional, the libURL of this library for importing script in Web Worker (default: https://cdn.jsdelivr.net/npm/browser-image-compression/dist/browser-image-compression.js)
  preserveExif: boolean,        // optional, use preserve Exif metadata for JPEG image e.g., Camera model, Focal length, etc (default: false)

  signal: AbortSignal,          // optional, to abort / cancel the compression

  // following options are for advanced users
  maxIteration: number,         // optional, max number of iteration to compress the image (default: 10)
  exifOrientation: number,      // optional, see https://stackoverflow.com/a/32490603/10395024
  fileType: string,             // optional, fileType override e.g., 'image/jpeg', 'image/png' (default: file.type)
  initialQuality: number,       // optional, initial quality value between 0 and 1 (default: 1)
  alwaysKeepResolution: boolean // optional, only reduce quality, always keep width and height (default: false)
}

imageCompression(file: File, options: Options): Promise<File>
```

* Github: [brower-image-compression](https://github.com/Donaldcwl/browser-image-compression)