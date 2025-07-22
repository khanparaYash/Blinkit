const verifyEmailTemplate = ({name, url}) => {
  return `
    <p>Dear, ${name}</p>
    <p>Thank you for registering Hear</p>
    <a href=${url} style="color:white;background:blue;margin-top:10px">
    verify Email
    </a>
    `;
};
export default verifyEmailTemplate