import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

async function sendMessage(data) {
   const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
         user: process.env.NAME,
         pass: process.env.PASSWORD,
      },
   });

   const info = await transporter.sendMail({
      from: process.env.NAME,
      to: process.env.NAME,
      subject: "Nauja zinute is kliento",
      text: `
            Name: ${data.name}\n
            Email: ${data.email}\n
            Phone: ${data.phone}\n
            Web: ${data.web}\n
            Country: ${data.country}\n
            Project: ${data.project}`,
   });

   console.log(`Message sent: ${info.messageId}`);
}

app.post("/", async (req, res) => {
   try {
      await sendMessage(req.body);
      res.status(200).send({
         message: "Your information has been submitted successfully!",
      });
   } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to sent email" });
   }
});

app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`);
});
