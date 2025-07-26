const express = require("express");
const sendgrid = require("@sendgrid/mail");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/sendmail", async (req, res) => {
  const email = req.body.email;
  const msg = {
    to: email,
    from: "christianghantous1@gmail.com",
    subject: "Welcome to Dev@Deakin",
    text: "Thanks for joining Dev@Deakin.",
    html: "<strong>Thanks for signing up!</strong>",
  };

  try {
    await sendgrid.send(msg);
    console.log("Email sent successfully!");
    res.redirect("/");
  } catch (e) {
    console.error("Error sending email:", e);
    if (e.response) {
      console.error("SendGrid response:", e.response.body);
      res.status(500).send("Failed to send email.");
    }
  }
});

const hostname = "localhost";
const port = 5000;

app.listen(port, hostname, (req, res) => {
  console.log(`Server running at http://${hostname}:${port}`);
});

// recovery code: 68452M17GSCN9HVMRXSSWQHZ
