const mailer = require("./mailer");

mailer.sendMail(
  {
    from: "wilhem.hafsa@outlook.fr",
    to: "wilhemh38@hotmail.fr",
    subject: "This is a test email",
    text: "Hello world1",
    html: "<p>Hello <em>world2 celui la fonctionne pas l'autre</em></p>",
  },
  (err, info) => {
    if (err) console.error(err);
    else console.log(info);
  }
);
