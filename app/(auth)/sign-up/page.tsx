"use client"
import {CountrySelectField} from '@/components/forms/CountrySelectField';
import FooterLInk from '@/components/forms/FooterLInk';
import Inputfield from '@/components/forms/Inputfeild';
import SelectField from '@/components/forms/SelectField';
import { Button } from '@/components/ui/button';
import { signUpWithEmail } from '@/lib/actions/auth.action';
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from '@/lib/constants';
import { Sign } from 'crypto';
import { useRouter } from 'next/navigation';
import React from 'react'
import { Form, useForm } from 'react-hook-form'
import { toast } from 'sonner';



const SignUp = () => {
 const router=useRouter();

  const{
    register,
    handleSubmit,
    formState:{errors,isSubmitting},
    control,

  }=useForm<SignUpFormData>({
    defaultValues:{
    fullName: '',
    email: '',
    password: '',
    country: 'US',
    investmentGoals: 'Grow',
    riskTolerance: 'Medium',
    preferredIndustry: 'Technology',
    
  },
  mode:'onBlur'
});

const onSubmit=async(data:SignUpFormData)=>{
  try {
    
    // signupwithemail

    const result= await signUpWithEmail(data);
    if(result?.success) router.push('/');
  } catch (e) {
    
    console.log(e);

    toast.error('sign up failed',{
      description:e instanceof Error ? e.message:'failed to create an account'
    })
  }
}
  return (
   <>
   <h1 className='form-title' >Sign Up & Personalize</h1>

   <form onSubmit={handleSubmit(onSubmit)} className='space-y-5' >

    <Inputfield
    name='fullName'
    label='Full Name'
    placeholder='Enter your full name'
    register={register}
    error={errors.fullName}
    validation={{required:'Full name is required',minLength:2}}
    ></Inputfield>
   
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
    validation={{required:'password is required',minLength:8}}
    ></Inputfield>

    

    <CountrySelectField 
    name="country"
    label='Country'
    control={control}
    error={errors.country}
    required
    />
     
     <SelectField
     name='Investment Goals'
      label='Investment Goals'
      placeholder='Select your investment goals'
      options={INVESTMENT_GOALS}
      control={control}
      error={errors.investmentGoals}
      required
     />
      
     <SelectField
     name='Risk Tolerance'
      label='Risk Tolerance'
      placeholder='Select your risk level'
      options={RISK_TOLERANCE_OPTIONS}
      control={control}
      error={errors.riskTolerance}
      required
     />
      
     <SelectField
     name='Preferred Industry'
      label='Preferred Industry'
      placeholder='Select your preferred industry'
      options={PREFERRED_INDUSTRIES}
      control={control}
      error={errors.preferredIndustry}
      required
     />
      
    



    <Button type='submit' disabled={isSubmitting} className='yellow-btn w-full mt-5' >
      {isSubmitting ? 'Creating Account...' : ' start Your Investing  Journey'}


    </Button>
    <FooterLInk text='Already have an account ' linkText='Sigin in' href='/sign-in'/>

   </form>
   </>
  )
}

export default SignUp