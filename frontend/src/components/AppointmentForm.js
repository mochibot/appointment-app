import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Form, Input, DatePicker, Switch, Button, Radio, } from 'antd';

const AppointmentForm = (props) => {
  const [input, setInput] = useState({
    email: '',
    firstName: '',
    lastName: '',
    slotTime: '',
    slotDate: ''
  })
  const [AM, setAM] = useState(true);
  const [error, setError] = useState('')

  const slotsAM = ['8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00'];
  const slotsPM = ['1:00-2:00', '2:00-3:00', '3:00-4:00', '4:00-5:00'];
  const baseUrl = 'http://localhost:5000';

  const changeHandler = event => {
    setError('');
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  }

  const switchHandler = () => {
    setError('');
    setAM(!AM);
  }

  const dateHandler = (date, datestring) => {
    setError('');
    setInput({
      ...input, 
      slotDate: date
    })
  }

  const validateInput = () => {
    if (!input.email || !input.firstName || !input.lastName || !input.slotTime || !input.slotDate) {
      setError('All fields are required');
      return false;
    } else {
      return true;
    }
  }

  const submitHandler = event => {
    event.preventDefault();
    if (validateInput()) {
      axios.post(`${baseUrl}/appointments`, input)
        .then(response => {
          console.log('success adding appointment:', response);
          setInput({
            email: '',
            firstName: '',
            lastName: '',
            slotTime: '',
            slotDate: ''
          })
          props.history.push('/');
        })
        .catch(error => {
          console.log('error adding appointment:', error);
        })
    }
  }

  return (
    <Form className='appt-form' onSubmit={submitHandler}>
      <Input name='email' value={input.email} placeholder='Email' onChange={changeHandler} />
      <Input name='firstName' value={input.firstName} placeholder='First name' onChange={changeHandler} />
      <Input name='lastName' value={input.lastName} placeholder='Last name' onChange={changeHandler} />
      <Switch checkedChildren="AM" unCheckedChildren="PM" defaultChecked onChange={switchHandler}/>
      {AM ? (
        <Radio.Group name='slotTime' value={input.slotTime} onChange={changeHandler}>
          {slotsAM.map(item => <Radio key={item} value={`${item} AM`}>{`${item} AM`}</Radio>)}
        </Radio.Group>
      ) : (
        <Radio.Group name='slotTime' value={input.slotTime} onChange={changeHandler}>
          {slotsPM.map(item => <Radio key={item} value={`${item} PM`}>{`${item} PM`}</Radio>)}
        </Radio.Group>
      )}
      <DatePicker onChange={dateHandler}/>
      {error && <div>{error}</div>}
      <Button onClick={submitHandler}>Submit</Button>
    </Form>
  )
}

export default withRouter(AppointmentForm);