import React, { useRef } from 'react';
import { hot } from 'react-hot-loader';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import './style.css';

const App = () => {
  const video = useRef(null);
  const downloadBlobAsFile = function (data, filename, contentType) {
    if (!data) {
      console.error(' No data');
      return;
    }

    if (!filename) filename = 'filetodonwload.txt';

    if (typeof data === 'object') {
      data = JSON.stringify(data, undefined, 4);
    }

    var blob = new Blob([data], {
        type: contentType || 'application/octet-stream',
      }),
      e = document.createEvent('MouseEvents'),
      a = document.createElement('a');

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
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
      null
    );
    a.dispatchEvent(e);
  };
  const transcode = async ({ target: { files } }) => {
    const ffmpeg = createFFmpeg({ log: true });
    const { name } = files[0];
    if (!ffmpeg.isLoaded()) await ffmpeg.load();
    ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
    await ffmpeg.run('-i', name, 'output.mp4');
    const data = ffmpeg.FS('readFile', 'output.mp4');
    downloadBlobAsFile(data.buffer, 'output.mp4', 'video/mp4');
  };

  return (
    <div className="App">
      <input type="file" onChange={transcode} />
    </div>
  );
};

export default hot(module)(App);
