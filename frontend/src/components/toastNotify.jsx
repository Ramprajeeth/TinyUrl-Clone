import React from 'react'
import { Button, Toast,ToastContainer } from 'react-bootstrap'
const ToastNotify = ({show,setShow,msg,delay=3000}) => {
  return (
   <ToastContainer className=' position-fixed top-0 end-0 p-3' aria-live='polite'>
    <Toast className='rounded shadow align-items-center' onClose={()=>setShow(false)} show={show} delay={delay} autohide={true}>
        <div className='d-flex'>
        <Toast.Body className='text-center'>{msg}</Toast.Body>
        <button type='button' className='btn-close me-2 m-auto' aria-label='Close' onClick={()=>setShow(false)}></button>
        </div>
    </Toast>
   </ToastContainer>
  )
}

export default ToastNotify