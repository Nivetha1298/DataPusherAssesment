// src/routes/formRoutes.ts
import express, { Request, Response } from "express";
import formDao from "../dao/formDao";
import { Form } from "../entity/Form";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, phoneNumber } = req.body;

  try {
    const form = new Form();
    form.name = name;
    form.phoneNumber = phoneNumber;

    await formDao.createForm(form);

    res.status(201).json({ message: "Form entry created successfully" });
  } catch (error) {
    console.log("Failed to create form entry:", error);
    res.status(500).json({ error: "Failed to create form entry" });
  }
});

export const formRoutes = router;