import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (email: string, title: string, content: string): Promise<{ status: boolean; message: string }> => {
    const msg = {
        to: email,
        from: process.env.EMAIL_FROM,
        subject: title,
        html: content,
    };

    let status: boolean;
    let message: string;

    await sgMail.send(msg)
        .then(() => {
            console.log('Email sent');
            status = true;
            message = 'Email enviado com sucesso';
        })
        .catch((error) => {
            console.error(error);
            status = false;
            message = 'Falha ao enviar o email';
        });

    return { status, message };
};
