import React, { useEffect, useState } from 'react'
import Urlcard from '../components/card'
import { Container } from 'react-bootstrap'
import ToastNotify from '../components/toastNotify'
import { Form } from 'react-bootstrap'
import api from '../api/axiosconfig.js'


const Dashboard = () => {
const [showToast,setShowToast]=useState(false);
const [toastMsg,setToastMsg]=useState('');
const [urls,setUrls]=useState([]);
const [search,setSearch]=useState('')
const [filteredUrls,setFilteredUrls]=useState([])
const username = localStorage.getItem('username');
    useEffect(()=>{
        const fetchUrls=async()=>{
            try{
                const response=await api.get(`/url/user-urls/${username}`);
                console.log(response.data);
                setUrls(response.data);
                setFilteredUrls(response.data);
            }
            catch(err){
                 console.error('Error fetching URLs:',err);
                setToastMsg('Failed to fetch URLs.');
                setShowToast(true);
            }
            
        }
        fetchUrls();
    },[])

    useEffect(()=>{
        const filtered=urls.filter((url)=>
        url.longUrl.toLowerCase().includes(search.toLowerCase())) //|| url.shortUrl.toLowerCase().includes(search.toLowerCase()))
        setFilteredUrls(filtered)
    },[search,urls])

    const handleDelete=(code)=>{
        const updated=urls.filter((url)=>url.shortCode!==code)
        setUrls(updated)
        setFilteredUrls(updated)
    }

  return (
    <Container>
        <h2 className='display-5 p-4 mt-5 pt-5 '>Your Shortened URLs</h2>
        <Form.Control type='text' placeholder='Search' className='mb-4 w-50 mx-auto'value={search}
        onChange={(e)=>setSearch(e.target.value)}/>

        {filteredUrls.length==0?
            (<p>No URLs created yet. Start shortening!</p>):
            (filteredUrls.map((url)=>(
                <Urlcard key={url.id} longUrl={url.longUrl} shortUrl={'http://localhost:8080/s/'+url.shortCode} setShowToast={setShowToast}
            setToastMsg={setToastMsg} onDelete={handleDelete}/>
            )))
        }
        <ToastNotify show={showToast} setShow={setShowToast} msg={toastMsg}/>
    </Container>
  )
}

export default Dashboard