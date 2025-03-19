
const fs = require('fs');
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
exports.checkID = (req, res, next, val) => {
    console.log(`this is from middleware and it's id is : ${val}`);
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
    next();
}
exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours,
        },
    });
};
exports.getTour = (req, res) => {
    console.log(req.params);
    const tour = tours.find((el) => el.id === id);
    const id = req.params.id * 1;

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tours: tour,
        },
    });
};
exports.updateTour = (req, res) => {
    // if (req.params.id * 1 > tours.length) {
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid ID',
    //     });
    // }

    res.status(200).json({
        status: 'success',
        data: {
            tours: '< Updated Tour.....>',
        },
    });
};

exports.deleteTour = (req, res) => {
    // if (req.params.id * 1 > tours.length) {
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid ID',
    //     });
    // }

    res.status(204).json({
        status: 'success',
        data: {
            tours: null,
        },
    });
};
exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour,
                },
            });
        }
    );
};