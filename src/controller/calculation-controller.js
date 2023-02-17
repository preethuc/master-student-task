import Calculation from "./../model/calculation-model";

const times = (a) => (b) => a * b;
const plus = (a) => (b) => a + b;
const minus = (a) => (b) => a - b;
const divided_by = (a) => (b) => Math.round(a / b);

const operations = {
  times: times,
  plus: plus,
  minus: minus,
  divided_by: divided_by,
};

// POST - Create Mathematical Calculation
export const calculateFunction = async (req, res) => {
  try {
    const { student, master_input } = req.body;
    const newdata = await new Calculation(req.body);
    const [a, op, b] = master_input.split(" ");
    const result = operations[op](parseInt(a))(parseInt(b));
    newdata.result = result;
    newdata.save();
    console.log(`${student} calculated ${master_input} and got ${result}`);
    res.status(201).json({
      status: "success",
      message: "successfully executed",
      final_result: {
        student,
        master_input,
        result,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: "Error Occured",
      error: err,
    });
  }
};

//GET - ALL Calculation
export const getAllCalculation = async (req, res) => {
  try {

    const all_data = await Calculation.find();
    return res.status(200).json({
      status: "success",
      results: all_data.length,

      message: "List of results for the mathematical operation",
      data: all_data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: "Error Occured",
      error: err,
    });
  }
};

//GET - Calculation by Id
export const getCalculationById = async (req, res, next) => {
  try {
    const data = await Calculation.findById(req.params.id);

    return res.status(200).json({
      status: "success",
      message: "List of calculation by Id",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: "Error Occured",
      error: err,
    });
  }
};

//UPDATE - Calculation by Id
export const updateCalculation = async (req, res, next) => {
  try {
    const data = await Calculation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json({
      status: "success",
      updatedData: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: "Error Occured",
      error: err,
    });
  }
};

//DELETE - Calculation by Id
export const deleteCalculation = async (req, res, next) => {
  try {
    const data = await Calculation.findByIdAndDelete(req.params.id);

    return res.status(204).json({
      status: "success",
      message: "no-content",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: "Error Occured",
      error: err,
    });
  }
};


//GET - Calculation data by Student Name
export const getByStudentName = async (req, res, next) => {
    try {
        const data = await Calculation.find({student:req.params.stu})
        
    return res.status(200).json({
        status: "success",
        results:data.length,
        message: "List by Name",
        data:data,
      });
    } catch (err) {
        console.log(err);
        res.status(400).json({
          status: "failed",
          message: "Error Occured",
          error: err,
        }); 
    }
}