import express from "express";
import {
  calculateFunction,
  getAllCalculation,
  updateCalculation,
  deleteCalculation,
  getCalculationById,
  getByStudentName,
} from "../controller/calculation-controller";
const router = express.Router();

router.post("/calculate", calculateFunction);
router.get("/all", getAllCalculation);
router.get("/get/:id", getCalculationById);
router.put("/update/:id", updateCalculation);
router.delete("/delete/:id", deleteCalculation);

router.get("/name/:stu", getByStudentName);

module.exports = router;
