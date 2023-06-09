import * as nodemailer from 'nodemailer';

const transport = async () => {
  return await nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });
};

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

export const sendFinishMail = async (dataSend: any) => {
  const transporter = await nodemailer.createTransport({
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
                        <p>Cảm ơn bạn đã tin tưởng đặt và hoàn thành lịch khám bệnh trên hệ thống của chúng tôi</p>
                        <p>Thông tin hóa đơn được gửi trong file đính kèm</p>
                        <p>Chúc bạn một ngày tốt lành</p>`;
  await transporter.sendMail({
    from: '"Cuong Nguyen 👻" <foo@example.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: 'Kết quả đặt lịch khám bệnh', // Subject line
    text: 'Hello world?', // plain text body
    html: htmlContent, // html body
    attachments: [
      {
        filename: `remedy-${dataSend.patientName}-${new Date().getTime()}.png`,
        content: dataSend.file.split('base64,')[1],
        encoding: 'base64',
      },
    ],
  });
};

export const sendContactReply = async (dataSend: any) => {
  const transporter = await transport();
  const content = `<h3>
    Xin chào ${dataSend.gender === 'm' ? 'anh' : 'chị'} ${dataSend.name}
  </h3>
  <h4>
    Cảm ơn bạn đã phản hồi với chúng tôi về vấn đề gặp phải.
  </h4>
  <p>
    Chúng tôi nhận được phản hồi của bạn qua email với câu hỏi như sau.
  </p>
  <p>${dataSend.comment}</p>
  <hr/>
  <p>Chúng tôi xin trả lời câu hỏi của bạn như sau:</p>
  <p>${dataSend.replyContent}</p>
  <p>Hi vọng câu trả lời trên sẽ giúp ích cho bạn. Chúc bạn một ngày tốt lành</p>`;
  await await transporter.sendMail({
    from: '"Cuong Nguyen 👻" <foo@example.com>',
    to: dataSend.email,
    subject: 'Thông tin phản hồi',
    text: 'Hello world?',
    html: content,
  });
};
