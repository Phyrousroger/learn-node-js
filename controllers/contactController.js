const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");

//@desc get contact
//@routes GET /api/contacts
//@access private

const getMethod = asyncHandler(async (req, resp) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  resp.status(200).json(contacts);
});

{
  /*  
@desc post contact
@routes post /api/contacts
@access private
*/
}
const createMethod = asyncHandler(async (req, resp) => {
  console.log("your request body is:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    resp.status(400);
    throw new Error("All fields are mendatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  resp.status(201).json(contact);
});

//@desc put contact
//@routes post /api/contacts/:id
//@access private
const getdetailmethod = asyncHandler(async (req, resp) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    resp.status(400);
    throw new Error("Contact Not Found");
  }
  resp.status(200).json(contact);
});

{
  /*@desc put contact
    @routes post /api/contacts/:id
    @access private*/
}
const updateMethod = asyncHandler(async (req, resp) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    resp.status(400);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    resp.status(403);
    throw new Error("you don't have permission to update other user contacts");
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  resp.status(200).json(updateContact);
});

//@desc delete contact
//@routes post /api/contacts/:id
//@access private
const deleteMethod = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You don't have permission to delete this contact");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getMethod,
  createMethod,
  updateMethod,
  deleteMethod,
  getdetailmethod,
};
