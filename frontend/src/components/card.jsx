import React from 'react'
import { Card,Button } from 'react-bootstrap'
import ToastNotify from './toastNotify'
import api from '../api/axiosconfig.js'


const Urlcard = ({longUrl, shortUrl,setShowToast,setToastMsg,onDelete}) => {
const username = localStorage.getItem('username');
  const handleShare=async()=>{
  const shareData={
    url:shortUrl
  }
  try{
    if(navigator.share) {
      await navigator.share(shareData);
    }
    await navigator.clipboard.writeText(shortUrl);
    setToastMsg("Link shared and copied to clipboard!");
    setShowToast(true);
  }catch(err){
    try{
      await navigator.clipboard.writeText(shortUrl);
      setToastMsg("Link copied to clipboard!");
      setShowToast(true);
    }catch(copyErr) {
      setToastMsg("Sharing failed. Please try again.");
      setShowToast(true);
    }
  }
}

const handleDelete=async()=>{
  try{
  const shortCode=shortUrl.split('/').pop()
    await api.delete('/url/delete',{data:{username,shortCode}})
    setToastMsg('Link deleted successfully!')
  setShowToast(true)
  onDelete(shortCode);
  }
  catch(err){
    console.log(err)
    setToastMsg('Failed to delete link')
  setShowToast(true)
  }
}
  return (
    <Card className='mb-3 shadow-sm border-0 light-rounded bg-light'>
        <Card.Body className='p-3'>
        <Card.Title className='mb-2 '>
        <a href={shortUrl} target='_blank' rel='noopener noreferrer' className='text-decoration-none text-dark'>
        {shortUrl}
      </a>
        </Card.Title>
        <Card.Text className='text-muted mb-4'><a href={longUrl} target='_blank' rel='noopener noreferrer' className='text-decoration-none text-muted'>
        {longUrl}
      </a></Card.Text>

        <div className='d-flex justify-content-end gap-3'>
        <Button className='bg-info mr-2 border-0 ' onClick={handleShare}>Share</Button>
        <Button className='bg-danger border-0' onClick={handleDelete}>Delete</Button></div>
        </Card.Body>
    </Card>
  )
}

export default Urlcard