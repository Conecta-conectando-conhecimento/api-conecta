import { sendEmail } from './mail_service';

export const resetPasswordEmail = (email: string, token: string) => {
    const title = 'Conecta - Recuperar senha';
    const link = `${process.env.API_URL}/auth/reset-password?token=${token}`;

    const content = `<!doctype html>
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Recuperar senha</title>
            <style>
                /* -------------------------------------
                    GLOBAL RESETS
                ------------------------------------- */
                
                /*All the styling goes here*/
                
                img {
                    border: none;
                    -ms-interpolation-mode: bicubic;
                    max-width: 100%; 
                }
                
                body {
                    background-color: #f6f6f6;
                    font-family: sans-serif;
                    -webkit-font-smoothing: antialiased;
                    font-size: 14px;
                    line-height: 1.4;
                    margin: 0;
                    padding: 0;
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%; 
                }
                
                table {
                    border-collapse: separate;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    width: 100%; }
                    table td {
                        font-family: sans-serif;
                        font-size: 14px;
                        vertical-align: top; 
                }
                
                /* -------------------------------------
                    BODY & CONTAINER
                ------------------------------------- */
                
                .body {
                    background-color: #f6f6f6;
                    width: 100%; 
                }
                
                /* Set a max-width, and center the table */
                .container {
                    display: block;
                    margin: 0 auto !important;
                    /* makes it centered */
                    max-width: 580px;
                    padding: 10px;
                    width: 580px; 
                }
                
                /* -------------------------------------
                    HEADER, FOOTER, MAIN
                ------------------------------------- */
                .main {
                    background: #ffffff;
                    border-radius: 3px;
                    width: 100%;
                }
                
                .wrapper {
                    box-sizing: border-box;
                    padding: 20px; 
                }
                
                .content-block {
                    padding-bottom: 10px;
                    padding-top: 10px;
                }
                
                .footer {
                    clear: both;
                    margin-top: 10px;
                    text-align: center;
                    width: 100%; 
                }
                    .footer td,
                    .footer p,
                    .footer span,
                    .footer a {
                        color: #999999;
                        font-size: 12px;
                        text-align: center;
                    }
                
                /* -------------------------------------
                    TYPOGRAPHY
                ------------------------------------- */
                h1,
                h2,
                h3,
                h4 {
                    color: #000000;
                    font-family: sans-serif;
                    font-weight: 400;
                    line-height: 1.4;
                    margin: 0;
                    margin-bottom: 30px; 
                }
                
                h1 {
                    font-size: 35px;
                    font-weight: 300;
                    text-align: center;
                    text-transform: capitalize; 
                }   
                
                p,
                ul,
                ol {
                    font-family: sans-serif;
                    font-size: 14px;
                    font-weight: normal;
                    margin: 0;
                    margin-bottom: 15px;
                }
                    p li,
                    ul li,
                    ol li {
                        list-style-position: inside;
                        margin-left: 30px; 
                }
                
                a {
                    color: #3498db;
                    text-decoration: underline; 
                }
            </style>
        </head>
        <body>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
                <tr>
                    <td>&nbsp;</td>
                    <td class="container">
                        <div class="content">
                            <!-- START CENTERED WHITE CONTAINER -->
                            <table role="presentation" class="main">
                                <!-- START MAIN CONTENT AREA -->
                                <tr>
                                    <td class="wrapper">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <p>Olá ${email},</p>
                                                    <p>Para recuperar sua senha, basta clicar no botão abaixo.</p>
                                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                                        <tbody>
                                                            <tr>
                                                                <td align="left">
                                                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td> <a href="${link}" target="_blank">Recuperar minha senha</a> </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>                                    
                                                            </tr>
                                                        </tbody>            
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <!-- END MAIN CONTENT AREA -->
                            </table>
                            <!-- END CENTERED WHITE CONTAINER -->
                        </div>
                    </td>
                    <td>&nbsp;</td>
                </tr>
            </table>
        </body>
    </html>
    `;

    return sendEmail(email, title, content);
};
