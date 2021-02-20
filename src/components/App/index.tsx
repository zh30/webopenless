import React, { useState } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
// import init, { greet } from 'wasm';
import './style.scss';

const App = () => {
  const [message, setMessage] = useState('Click Start to transcode!');
  const ffmpeg = createFFmpeg({
    corePath:
      'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.8.5/dist/ffmpeg-core.js',
    // log: true,
    progress: ({ ratio }) =>
      setMessage(`Complete: ${(ratio * 100.0).toFixed(2)}%`),
  });
  const downloadBlobAsFile = function (
    url: string,
    filename: string,
    contentType: string,
  ) {
    if (!url) {
      console.error(' No data');
      return;
    }

    if (!filename) filename = 'filetodonwload.txt';

    let e = document.createEvent('MouseEvents'),
      a = document.createElement('a');

    a.download = filename;
    a.href = url;
    a.dataset.downloadurl = [
      contentType || 'application/octet-stream',
      a.download,
      a.href,
    ].join(':');
    e.initMouseEvent(
      'click',
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null,
    );
    a.dispatchEvent(e);
  };
  const transcode = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // await init();
    // greet();
    const { files } = e.target;
    if (!files) return;
    const { name } = files[0];
    const outFileName = `openless_${name}.mp4`;
    if (!ffmpeg.isLoaded()) {
      setMessage('Loading ffmpeg-core.js');
      await ffmpeg.load();
    }
    setMessage('Start transcoding');
    ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
    await ffmpeg.run(
      '-i',
      name,
      '-vf',
      'scale=1280:-1',
      '-c:v',
      'libx264',
      '-preset',
      'veryslow',
      '-crf',
      '24',
      outFileName,
    );
    setMessage('Complete transcoding');
    const url = URL.createObjectURL(
      new Blob([ffmpeg.FS('readFile', outFileName).buffer], {
        type: 'video/mp4',
      }),
    );
    downloadBlobAsFile(url, outFileName, 'video/mp4');
  };

  return (
    <div className="App">
      <input type="file" onChange={transcode} />
      <p>{message}</p>
    </div>
  );
};

export default App;
