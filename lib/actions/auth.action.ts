'use server'

import {auth} from'@/lib/better-auth/auth'
import { inngest } from '../inngest/client'
import { headers } from 'next/headers'

export const signUpWithEmail=async(data:SignUpFormData)=>{
 try {
    const response=await auth.api.signUpEmail({
        body:{
            email:data.email,
            password:data.password,
            name:data.fullName
        }
    })

    if(response){
        await inngest.send({
            name:'app/user.created',
            data:{
                email:data.email,
                name:data.fullName,
                country:data.country,
                investmentGoals:data.investmentGoals,
                risktolerance:data.riskTolerance,
                perferredIndustry:data.preferredIndustry
            }
        })

        return {success:true,data:response}
    }
    
 } catch (e) {
    console.log('Sign up failed',e)
    return{
        success:false,error:'sign up failed'
    }
 }
}

export const signout=async()=>{

    try {
        await auth.api.signOut({headers:await headers()})
       
    } catch (e) {
        console.log('Sign out failed',e)
        return{
            success:false,error:'sign out failed'
        }

        
    }
    
}

export const signInWithEmail=async(data:SignInFormData)=>{
 try {
    const response=await auth.api.signInEmail({
        body:{
            email:data.email,
            password:data.password,
            
        }
    })

   

        return {success:true,data:response}
    
    
 } catch (e) {
    console.log('Sign in failed',e)
    return{
        success:false,error:'sign in failed'
    }
 }
}

