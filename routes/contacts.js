const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const requireAuth = require('../middleware/requireAuth');
const Contact = require('../models/Contact');

// @route     GET /api/contacts
// @desc      Get user contacts
// @access    Private
router.get('/', requireAuth, async (req, res) => {
  try {
    // Get user contacts and sort by date created (recent first)
    const contacts = await Contact.find({ user: req.user.id }).sort('-date');
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST /api/contacts
// @desc      Create user contact
// @access    Private
router.post(
  '/',
  [
    requireAuth,
    [
      check('name')
        .not()
        .isEmpty()
        .withMessage('Please provide a name')
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, phone, type } = req.body;
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT /api/contacts/:id
// @desc      Update user contact
// @access    Private
router.put('/:id', requireAuth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Initiate contact's fields object to update Contact later
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    // Check if contact with that ID exists
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ errors: [{ msg: 'Contact not found' }] });
    }
    // Check if the contact belongs to the current user
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'Access denied' }] });
    }
    // Otherwise find and update contact
    contact = await Contact.findByIdAndUpdate(req.params.id, contactFields, {
      new: true
    });
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE /api/contacts/:id
// @desc      Delete user contact
// @access    Private
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    // Check if contact with that ID exists
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ errors: [{ msg: 'Contact not found' }] });
    }
    // Check if the contact belongs to the current user
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'Access denied' }] });
    }
    // Otherwise find and remove contact
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
