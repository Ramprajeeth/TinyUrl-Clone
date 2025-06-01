import React, { use } from 'react'
import api from '../api/axiosconfig.js'
import { useState } from 'react';
import { Container,Form,Button,Card } from 'react-bootstrap';
import ToastNotify from '../components/toastNotify';
import ModalConfirm from '../components/modal.jsx';

const ShortenPage = () => {

const [shortUrl,setShortUrl]=useState('');
const [longUrl,setLongUrl]=useState('');
const [showToast,setShowToast]=useState(false);
const [toastMsg,setToastMsg]=useState('');
const [showModal, setShowModal] = useState(false);

const handleShorten=async(e)=>{
const username = localStorage.getItem('username');
  e.preventDefault();

const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

if (!longUrl || !urlPattern.test(longUrl.trim())) {
  setToastMsg('Please enter a valid URL');
  setShowToast(true);
  return;
}


try{
  const response=await api.post('/url/shorten',{username:username,longUrl})
  const generated=response.data.shortCode;
  setShortUrl('http://localhost:8080/s/'+generated)
}
catch(err){
  console.error("shortening error: ",err)
}
}

const handleShare=async()=>{
  const shareData={
    url:shortUrl
  }
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    }
    await navigator.clipboard.writeText(shortUrl);
    setToastMsg("Link shared and copied to clipboard!");
    setShowToast(true);
  }catch (err){
    try{
      await navigator.clipboard.writeText(shortUrl);
      setToastMsg("Link copied to clipboard!");
      setShowToast(true);
    } catch (copyErr) {
      setToastMsg("Sharing failed. Please try again.");
      setShowToast(true);
    }
  }

}
const handleDelete=async()=>{
  const username = localStorage.getItem('username');
   try{ 
    const code=shortUrl.split('/').pop()
    await api.delete('/url/delete',{data:{username,shortCode:code}})
    setToastMsg('Link deleted successfully!')
  setShowToast(true)
  setShortUrl('')
  }
  catch(err){
    console.log(err)
    setToastMsg('Failed to delete link')
  setShowToast(true)
  }

}

  return (
    <Container className='mt-4 px-3 px-md-5'>
      <h2 className='display-6 text-center p-4 mt-5 pt-5'>Shorten your URLs</h2>
      <Form className=' mt-2' onSubmit={handleShorten}>
        <Form.Group className='mb-3'>
          <Form.Label>Enter your URL</Form.Label>
          <Form.Control className='form-control-lg shadow-sm' type='text' placeholder='https://' 
          value={longUrl} onChange={(e)=>setLongUrl(e.target.value)}/>

        </Form.Group>
        <Form.Group className='text-center'>
          <Button type='submit' className='btn-secondary mt-3 btn-lg bg-success'>Convert</Button>

        </Form.Group>
      </Form>

      { shortUrl && (
      <Card className='mt-4 shadow-sm light-roumded bg-light'>
      <Card.Header className='bg-dark text-white py-2'> Your Tiny URL</Card.Header>
      <Card.Title className='p-3 text-center fs-3'><a className='text-decoration-none text-success fw-light' href={shortUrl} target='_blank' rel='noopener noreferrer'>{shortUrl}</a></Card.Title>

      <div className='d-flex justify-content-end gap-3 p-3'>
      <Button className='bg-info mr-2 border-0' onClick={handleShare}>Share</Button>
      <Button className='bg-danger border-0' onClick={()=>setShowModal(true)}>Delete</Button></div>
      </Card>)}
      <ToastNotify show={showToast} setShow={setShowToast} msg={toastMsg}/>
        <ModalConfirm show={showModal} onHide={() => setShowModal(false)} 
  onConfirm={() => {
    handleDelete();
    setShowModal(false);
  }}
  title="Confirm Delete" body="Are you sure you want to delete this link?"/>
    </Container>
  )
}

export default ShortenPage
