// middleware/validationMiddleware.js
const { body, param, validationResult } = require("express-validator");

// User validations
const validateSignup = [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Item validations
const validateItem = [
  body("itemname").notEmpty().withMessage("Item name is required"),
  body("itemdescription")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];


// Claimant validations
// Claimant validations


const validateClaimant = [
  body("claimantname").notEmpty().withMessage("Name is required"),
  body("mobilenumber")
    .notEmpty().withMessage("Mobile number is required")
    .isMobilePhone().withMessage("Enter a valid mobile number"),
  body("hostelname").notEmpty().withMessage("Hostel name is required"),
  body("proofofclaim")
    .notEmpty().withMessage("Proof of claim is required")
    .isLength({ min: 5 }).withMessage("Proof must be at least 5 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];



const validateHelper = [
  body("helpername").notEmpty().withMessage("Helper name is required"),
  body("mobilenumber")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Enter a valid 10-digit Indian mobile number"),
  body("hostelname").notEmpty().withMessage("Hostel name is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateSignup,
  validateLogin,
  validateItem,
  validateClaimant,
  validateHelper,
};
