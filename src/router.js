const express = require("express");
const path = require("node:path");
const mailer = require("./service/mailer");
const formValidator = require("./service/formValidator");

const router = express.Router();

router.get("/download-cv", (req, res) => {
  const cvPath = path.join(__dirname, "../public", "cv.pdf");
  res.download(cvPath, "HAFSA_Wilhem_cv.pdf");
});

router.post("/sendMail", formValidator, (req, res) => {
  const { firstname, lastname, mail, message } = req.body;

  mailer.sendMail(
    {
      from: "wilhem.hafsa@outlook.fr",
      to: "wilhemh38@hotmail.fr",
      subject: `Message Portfolio de ${mail}`,
      text: message,
      html: `<p> From: ${firstname} ${lastname} <br/> Mail:${mail} <br/><br/>${message}</p>`,
    },
    (err, info) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de l'envoi de l'email.");
      } else {
        console.log(info);
        res.status(200).send("Email envoyé avec succès !");
      }
    }
  );
});

module.exports = router;
