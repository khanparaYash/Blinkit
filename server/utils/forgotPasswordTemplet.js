const forgotPasswordTemplet=({name,otp})=>{
    return `
    <p>Dear, ${name}</p>
    <p>You're requested a password resent. Please use following OTP code to reset your password. </p>
    <p style="color:white;background:blue;margin-top:10px">
    ${otp}
    </p>
    <br/>
    <p>This otp is valid for 1hour only. Enter this otp in the website to proceed with resetting your password.</p>
    <br/>
    <P>Thanks</P>
    `;
}
export default forgotPasswordTemplet