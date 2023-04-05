import * as nodemailer from 'nodemailer';

export const sendSimpleEmail = async (dataSend: any) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const htmlContent = `<h3>Xin chào ${dataSend.patientName}</h3>
                        <p>Thông tin đặt lịch khám bệnh của bạn như sau: </p>
                        <fieldset>
                            <legend style="margin-bottom: 10px; font-weight: bold;">Thông tin lịch khám bệnh</legend>
                            <label>Bác sĩ:</label>
                            <span>${dataSend.doctorName}</span><br><br>
                            <label>Thời gian:</label>
                            <span>${dataSend.time}</span><br>
                        </fieldset>
                        <p>Nếu thông tin trên là sự thật, vui lòng nhấn vào <a href="${dataSend.redirectLink}" target="?_blank">liên kết này</a> để xác nhận đặt lịch khám bệnh.</p>
                        <p>Chúc bạn một ngày tốt lành</p>`;
  await transporter.sendMail({
    from: '"Cuong Nguyen 👻" <foo@example.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: 'Thông tin đặt lịch khám bệnh', // Subject line
    text: 'Hello world?', // plain text body
    html: htmlContent, // html body
  });
};
