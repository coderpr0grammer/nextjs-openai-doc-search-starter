import React, {useState} from 'react';
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


  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[] | null>(null);

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    console.log('leaving drag');
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    console.log(event.dataTransfer.files);
    const file = event.dataTransfer.files[0];
    const files = Array.from(event.dataTransfer.files);
    setFiles(files);
    setSelectedFile(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFiles(files);
  };

  const renderFilePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <img src={URL.createObjectURL(file)} alt={file.name} />;
    } else if (file.type.startsWith('video/')) {
      return <video src={URL.createObjectURL(file)} controls />;
    } else {
      return <p>{file.name}</p>;
    }
  };

  return (
    <>
     <div
      className={styles.main}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(event) => {event.preventDefault(); setIsDragging(true)}}
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
      <main className={styles.main} onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>

        {/* File upload overlay */}
      {isDragging && (
        <div className={styles.overlay} style={{background: 'rgba(255, 0, 0, 0.8)', width: '100vw', height:'100vh', margin: 0, padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', }}>
          <div className={styles.uploadIcon}>
            <FontAwesomeIcon icon={faCloudArrowUp} color="white" style={{width:50, height: 50}}/>
          </div>
        </div>
      )}

      {/* File preview */}
      {selectedFile && (
        <div className={styles.preview} style={{background: 'red',  width: 100, height:100}}>
          {/* Render file preview here */}
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
          <SearchDialog />
        <input type="file"  onChange={handleFileChange} multiple />
        </div>
        <div className="py-8 w-full flex items-center justify-center space-x-6">
            <Link href="https://supabase.com" className="flex items-center justify-center">
              <p className="text-base mr-2">Built by Supabase</p>
              <Image src={'/supabase.svg'} width="20" height="20" alt="Supabase logo" />
            </Link>
          </div>
          <div className="border-l border-gray-300 w-1 h-4" />
          <div className="flex items-center justify-center space-x-4">
            <div className="opacity-75 transition hover:opacity-100 cursor-pointer">
              <Link
                href="https://github.com/supabase/supabase"
                className="flex items-center justify-center"
              >
                <Image src={'/github.svg'} width="20" height="20" alt="Github logo" />
              </Link>
            </div>
            <div className="opacity-75 transition hover:opacity-100 cursor-pointer">
              <Link
                href="https://twitter.com/supabase"
                className="flex items-center justify-center"
              >
                <Image src={'/twitter.svg'} width="20" height="20" alt="Twitter logo" />
              </Link>
            </div>
          </div>
      </main>
      </div>
    </>
  )
}
