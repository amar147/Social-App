"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailTemplate = void 0;
const verifyEmailTemplate = ({ code, title }) => {
    return `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <style type="text/css">
    body {
      background-color: #88BDBF;
      margin: 0px;
    }
  </style>
</head>
<body style="margin:0px;">
  <table border="0" width="50%" style="margin:auto;padding:30px;background-color:#F3F3F3;border:1px solid #630E2B;">
    <tr>
      <td>
        <table border="0" width="100%">
          <tr>
            <td style="text-align:center;">
              <h1 style="color:#630E2B;margin:0 0 20px 0;">${title}</h1>
              <h2 style="background:#88BDBF;color:#fff;padding:10px 20px;letter-spacing:5px;display:inline-block;border-radius:4px;margin:0;">${code}</h2>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
exports.verifyEmailTemplate = verifyEmailTemplate;
