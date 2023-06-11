import React, { useState } from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { SearchDialog } from '@/components/SearchDialog'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[] | null>(null)

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    console.log('leaving drag')
    setIsDragging(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    console.log(event.dataTransfer.files)
    const file = event.dataTransfer.files[0]
    const files = Array.from(event.dataTransfer.files)
    const filteredFiles = files.filter(
      (file) => file.type.startsWith('text/') || file.type.startsWith('video/')
    )
    setFiles(filteredFiles)
    setSelectedFile(file)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const filteredFiles = files.filter(
      (file) => file.type.startsWith('text/') || file.type.startsWith('video/')
    )
    setFiles(filteredFiles)
  }

  const renderFilePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          style={{ aspectRatio: '1 / 1', width: 50 }}
        />
      )
    } else if (file.type.startsWith('video/')) {
      return <video src={URL.createObjectURL(file)} controls />
    } else {
      return <p>{file.name}</p>
    }
  }

  return (
    <>
      <div
        className={styles.main}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDrop={handleDrop}
      >
        <Head>
          <title>Next.js OpenAI Template</title>
          <meta
            name="description"
            content="Next.js Template for building OpenAI applications with Supabase."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main
          className={styles.main}
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          {/* File upload overlay */}
          {isDragging && (
            <div
              className={styles.overlay}
              style={{
                background: 'rgba(255, 0, 0, 0.8)',
                width: '100vw',
                height: '100vh',
                margin: 0,
                padding: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
              }}
            >
              <div className={styles.uploadIcon}>
                <FontAwesomeIcon
                  icon={faCloudArrowUp}
                  color="white"
                  style={{ width: 50, height: 50 }}
                />
              </div>
            </div>
          )}


          {/* File preview */}

          {files && files.length > 0 && (
            <div className={styles.preview}>
              {files.map((file, index) => (
                <div key={index}>
                  {renderFilePreview(file)}
                  <p>{file.name}</p>
                  <p>{file.size} bytes</p>
                  <p>{file.type}</p>
                </div>
              ))}
            </div>
          )}

          <div className={styles.center}>
            {/* <SearchDialog /> */}
            <br></br>
            <input type="file" onChange={handleFileChange} multiple accept="text/*,video/*" />
            or drag and drop your files anywhere 
          </div>
          <div className="py-8 w-full flex items-center justify-center space-x-6">
            <Link href="https://skm.alonesolutions.ca" className="flex items-center justify-center">
              <Image src={'/icon-128.png'} width="20" height="20" alt="Supabase logo" />
              <p className="text-base mr-2">SkmAI</p>
            </Link>
          </div>
        </main>
      </div>
    </>
  )
}
