import asyncHandler from 'express-async-handler';
import Document from '../models/documentModel.js';
import User from '../models/userModel.js';

// @desc    Get documents
// @route   GET /api/documents
// @access  Public
const getDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({ user: req.user._id.toHexString() });

  if (documents) {
    res.status(200).json(documents);
  } else {
    res.status(400);
    throw new Error("Documents not found");
  }
});

// @desc    Create document
// @route   POST /api/document
// @access  Public
const createDocument = asyncHandler(async (req, res) => {
  const file = req.files.file;
  const fileDir = "uploads/"+file.name;
  await file.mv("backend/"+fileDir);
  if (!file || Object.keys(req.files).length === 0) {
    return res.status(400).console.error('No files were uploaded.');
  }
  const userId = req.user?._id?.toHexString();
  const document = await Document.create({
    name:req.body.name ?? file.name,
    file:fileDir,
    user:userId
  });
  const user = await User.findById(req.user._id);
  if (document) {
    user.documents.push(document);
    await user.save();
    res.status(201).json(document);
  } else {
    res.status(400);
    throw new Error("Invalid member data");
  }
});


// @desc    Delete documents
// @route   DELETE /api/documents
// @access  Public
const deleteDocument = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.body.id);

  if (document) {
    const user = await User.findById(req.user._id);
    user.documents.pop(document);
    user.save()
    await Document.deleteOne({_id:req.body.id});
    res.status(201).json({ message: "Document deleted successfully" });
  } else {
    res.status(400);
    throw new Error("Document not found");
  }
});

export {
  getDocuments,
  createDocument,
  deleteDocument
};
