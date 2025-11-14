import { Resend } from "resend"
import { RESEND_API_KEY } from "../config/config.js"

const resend = new Resend(RESEND_API_KEY)

const sendEmail = async (templateId, emailData) => {
  const { data, error } = await resend.emails.send({
    from: "Qodex <support@qodex.co.in>",
    to: [emailData.TO_EMAIL],
    template: {
      id: templateId,
      variables: {
        USER_NAME: emailData?.USER_NAME,
        VERIFICATION_URL: emailData?.VERIFICATION_URL,
      },
    },
  })

  if (error) {
    return { error }
  }

  return { data }
}

export default sendEmail
