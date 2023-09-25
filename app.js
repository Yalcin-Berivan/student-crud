const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
const StudentModel = require("./student.schema");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/my-db");

  //ÖĞRENCİLERİ GETİR:
  app.get("/students", async (req, res) => {
    const students = await StudentModel.find();
    res.send(students);
  });

  // İD'Sİ VERİLEN ÖĞRENCİYİ GETİR:
  app.get("/students/:id", async (req, res) => {
    console.log("---------------------");
    const id = req.params.id;
    const students = await StudentModel.findById(id);
    res.send(students);
  });

  //ÖĞRENCİ OLUŞTURMA:
  app.post("/students", async (req, res) => {
    const body = req.body;
    body.createdAt = new Date();
    await StudentModel.create(body);
    res.send(body);
  });

  // ÖĞRENCİ GÜNCELLEME:
  app.put("/students/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    body.updatedAt = new Date();
    await StudentModel.findOneAndUpdate({ _id: id }, body);
    res.send(body);
  });

  // ÖĞRENCİ SİLME
  app.delete("/students/:id", async (req, res) => {
    const id = req.params.id;
    await StudentModel.deleteOne({ _id: id });
    res.send("Kayıt silidi");
  });

  // ÖĞRENCİYİ TC KİMLİK NUMARASINA GÖRE GETİRME:
  app.get("/students/tc/:tcId", async (req, res) => {
    const tcId = parseInt(req.params.tcId, 10);
    const student = await StudentModel.findOne({ tcId: tcId });
    res.send(student);
  });

  // SADECE AKTİF ÖĞRENCİLERİ GETİR:
  app.get("/students/active/all", async (req, res) => {
    const users = await StudentModel.find({ isActive: true });
    res.send(users);
  });

  // SADECE PASİF ÖĞRENCİLERİ GETİR:
  app.get("/students/deActive/all", async (req, res) => {
    const users = await StudentModel.find({ isActive: false });
    res.send(users);
  });

  // VERİLEN İSME GÖRE ÖĞRENCİYİ ÇEKME:
  app.get("/students/names/:name", async (req, res) => {
    const name = req.params.name;
    const users = await StudentModel.find({ name });
    res.send(users);
  });

  const port = 3000;
  app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı`);
  });
}
