import React from 'react'

function FilePreview({file,type}) {
  return (
    <div className='w-full flex justify-center'>
      {type === 'Image' && <img src={file} alt="file" height="400"/>}
      {type === 'Video' && <video src={file} controls height="400"/>}
      {type === 'Pdf' && <iframe src={file} title="file" height="400"/>}
    </div>
  )
}

export default FilePreview