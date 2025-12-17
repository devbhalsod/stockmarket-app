
"use client"
import Inputfield from '@/components/forms/Inputfeild'
import React from 'react'
import{useForm}  from 'react-hook-form'

import { Button } from '@/components/ui/button'
import FooterLInk from '@/components/forms/FooterLInk'
const SignIn = () => {
  const{
     register,
    handleSubmit,
    formState:{errors,isSubmitting},
    
  }=useForm<SignInFormData>({
    defaultValues:{

      email:'',password:''
    },  mode:'onBlur'
  })

  const onSubmit=async(data:SignInFormData)=>{
  try {
    console.log(data);
  } catch (error) {
    
    console.log(error);
  }
}
  return (
    <>
    <h1 className='form-title' >Login to your Account</h1>

    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
 <Inputfield 
    name='email'
    label='Email'
    placeholder='contact@gmail.com'
    register={register}
    error={errors.email}
    validation={{required:'Email is required', pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:'email is required'}}
    ></Inputfield>

     <Inputfield
    name='password'
    label='Password'
    placeholder='Enter a Strong Password'
    register={register}
    type='password'
    error={errors.password}
    validation={{required:'Full name is required',minLength:8}}
    ></Inputfield>
<Button type='submit'  disabled={isSubmitting} className='yellow-btn w-full mt-5' >
      {isSubmitting ? 'Siginig in...' : ' Log In'}


    </Button>

    <FooterLInk text='Dont have an account' linkText='Sigin Up' href='/sign-up'/>

    
    </form>

    </>
  )
}

export default SignIn