const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.getAll = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.find();
    res.status(200).json({
        status: 'success',
        requestTime:req.requestTime,
        results:doc.length,
        data:{
            doc
        }
    });
});

exports.getOne =  (Model, populateOptions) => catchAsync(async (req, res,next)=>{
    const id = req.params.id;
    let doc
    let data = await Model.findById(id)
    
    if(!data) {
        return next(new AppError('Cant find doc From This ID...!',404));
    }   
    res.status(200).json({
        status: "success",
        data
    });
});

exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.create(req.body);
        if (!req.body.email) {
        doc.user = req.user.id;
        if (req.body.duration) {
            doc.hour = new Date().toISOString().split("T")[1].split(".")[0];
        }
        doc.save().catch((err) => {
            console.error("Error 🔥: ", err);
        });
        }
        if (req.body.title) {
            if (!req.body.date)
                doc.date = new Date().toISOString().split("T")[0]
        res.status(200).json({
            status: "success",
            requestTime: req.requestTime,
            Message: "Create New Mood",
        });
        } else {
        res.status(200).json({
            status: "success",
            data: {
            doc,
            },
        });
        }
});

exports.deleteOne = (Model) => catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
        return next(new ApiError(`No document for this id ${id}`, 404));
    }

    res.status(204).send();
});


exports.updateOne = Model => catchAsync(async (req, res,next) => {
    const id = req.params.id;
    const doc = await Model.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators: true
    });
    if(!doc) {
        return next(new AppError('Cant find document From This ID To Update It...!',404));
    }   
    res.status(200).json({
        status: "success",
        data:{
            doc
        }
    });
});