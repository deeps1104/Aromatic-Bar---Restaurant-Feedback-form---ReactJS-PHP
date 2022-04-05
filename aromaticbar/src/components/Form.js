import React, {useState} from 'react'
import {checkboxObject} from './Data'
import axios from 'axios'

const Form = () => {

  const [data, setData] = useState({
    customerName: "",
    customerEmail: "",
    customerMobile: "",
    Q1: '',
    Q2: '',
    Q3: '',
    Q4: ''
  })
  const [resData, setresData] = useState({})
  const [error, setError] = useState()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data, //Important Line (concatenate previous data value)
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await axios.post("/aromaticapi/controller/Feedback.php", data)
    
    const responseData = await res.data

    if(res.status === 200){
      setData({
        customerName: "",
        customerEmail: "",
        customerMobile: "",
      })
      // console.log(responseData)
      setresData(responseData) 
    }else{
      setError("There is a problem while submitting the form! Try Again.")
    }
  }

  const resetRadio = () => {
    const radio = document.querySelectorAll('[name="Q1"], [name="Q2"], [name="Q3"], [name="Q4"]')
    // console.log(radio)
    for(var i=0;i<radio.length;i++){
      radio[i].checked = false;
    }
  }
  

  return (
    <div className='formbg'>
      <form className='feedbackForm' onSubmit={handleSubmit} method="POST">
        <div className='formeleText'>
          <label htmlFor='custName'>Customer Name</label>
          <input type='text' onChange={handleChange} id='custName' value={data.customerName} name='customerName' autoComplete='off' required /><br />
          <label htmlFor='custEmail'>Customer Email</label>
          <input type='email' id='custEmail' onChange={handleChange} value={data.customerEmail} name='customerEmail' autoComplete='off' required /><br />
          <label htmlFor='custMobile'>Customer Mobile</label>
          <input type='text' id='custMobile' onChange={handleChange} value={data.customerMobile} name='customerMobile' autoComplete='off' required placeholder='+91 (India)' minLength={10} maxLength={10} />
        {
          resData.status === 200 ? <p id='successMsg'>{resData.msg}</p> : <p id='ErrorMsg'>{error}</p>
        }
        </div>
        <div className='formeleCheck'>
          {
            checkboxObject.map((item, index) => {
              return <div className={`questionSection${index+1}`} key={item.qID}>
              <p className={`ques${index+1}`}>{item.que}</p>
              <ul className='feedItems'>
                {
                  item.feedoption.map((option, i) => {
                    return <li key={i}>
                    <input type='radio' onChange={handleChange} value={option} name={`Q${index+1}`} id={`Q${index+1}-${i+1}`} />
                    <label htmlFor={`Q${index+1}-${i+1}`}>{option}</label>
                  </li>
                  })
                }
              </ul><br/>
            </div>
            })
          }
        </div>
        <button className='btn-sub' onClick={resetRadio}>Submit</button>
      </form>

    </div>
  )
}

export default Form