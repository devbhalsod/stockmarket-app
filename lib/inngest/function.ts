
import { sendWelcomeEmail } from "../nodemailer";
import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompt";


export const sendSignUpEmail=inngest.createFunction(
    {id:'sign-up-email'},
    {event:'app/user.created'},
    async({event,step})=>{
        const userProfile=`
        - Country :${event.data.country}
        - Investment goals :${event.data.investmentGoals}
        - Risk tolerance:${event.data.risktolerance}
        - Preferred industry:${event.data.preferredIndustry}


        `

        const prompt=PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}',userProfile)

        const response =await step.ai.infer('generate-welcome-intro',{
            model:step.ai.models.gemini({model:'gemini-2.5-flash-lite'}),
            body:{
                contents:[
                    {
                        role:'user',
                        parts:[
                            {
                                text:prompt
                            }
                        ]
                    }
                ]
            }
        })

        await step.run('send-welcome-email',async()=>{
            const part=response.candidates?.[0].content?.parts?.[0];
            const intoText=(part && 'text' in part ? part.text:null)|| 'Thanks for joining Signalist.you now have the tools to track markets and smarter moves '

            // email sending logic
            const {data:{email,name}}=event

            return await sendWelcomeEmail({
                email,name,intro:intoText
            })

        })

        return{
            success:true,
            message:'welcome email sent successfully'
        }

    }
)