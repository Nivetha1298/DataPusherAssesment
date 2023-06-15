// src/dao/formDao.ts
import { createConnection } from "typeorm";
import { Form } from "../entity/Form";

const formDao = {
  createForm: async (form: Form) => {
    try {
      const connection = await createConnection();
      const formRepository = connection.getRepository(Form);
      await formRepository.save(form);
    } catch (error) {
      console.log("Failed to create form entry:", error);
      throw new Error("Failed to create form entry");
    }
  },
};

export default formDao;
