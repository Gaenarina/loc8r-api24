const express = require('express');
const router = express.Router();
//const ctrlMain = require('../controllers/main');

const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');

/* Locations page */
router.get('/', ctrlLocations.homelist);
router.get('/location/:locationid', ctrlLocations.locationInfo);
router
    .route('/location/:locationid/review/new')
    .get(ctrlLocations.addReview)
    .post(ctrlLocations.doAddReview);

/* Other page */
router.get('/about', ctrlOthers.about);

module.exports = router;


/*
/* GET homepage. * /
router.get('/', ctrlMain.index);

const homepageController = (req, res) => {
  res.render('index', {title: 'Express'});
};
*/
/*
/* GET home page. * /
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express & Nodemon by 2023810025 NahyunBae' });
});

module.exports = router;
*/
