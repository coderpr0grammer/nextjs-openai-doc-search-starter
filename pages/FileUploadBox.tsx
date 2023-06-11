import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

const FileUploadBox: React.FC = () => {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const filteredFiles = files.filter(
        (file) => file.type.startsWith('text/') || file.type.startsWith('video/')
      )

      setFiles(filteredFiles)
    },
    [setFiles]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div
      {...getRootProps()}
      className={`p-4 border-2 border-dashed rounded-lg ${
        isDragActive ? 'border-primary' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} accept="text/*,video/*" />

      {files.length === 0 ? (
        <>
          <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">
            Drag and drop your files here, or click to select files.
          </p>
        </>
      ) : (
        <>
          <ul>
            {files.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-gray-500">{files.length} file(s) selected.</p>
        </>
      )}
    </div>
  )
}

export default FileUploadBox
