import express from "express"
import { v2 as cloudinary } from "cloudinary";
import Book from "../models/Book.js";
import protectRoute from "../middleware/auth.protectRoute.js";

const router = express.Router();

router.post("/",protectRoute, async (req, res) =>{
    try {
        const {title, caption, rating, image} = req.body;
        if(!title || ! caption || !rating || !image){
            return res.status(400).json({message : "All Field are Required!"});
        }
        //Upload Img
        const UploadResponse = cloudinary.uploader.upload(image);
        const imgaeurl = (await UploadResponse).secure_url;

        const newBook = new Book({
            title,
            caption,
            rating,
            image : imgaeurl,
            user : req.user._id
        });
        await newBook.save();
        res.status(200).json(newBook)
    } catch (error) {
        return res.status(401).json({message : "You can not add book"});
    }
});
// Example call react native => localhost:3000/api/books?page=1&limit=5
router.get("/",protectRoute, async (req, res) =>{
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit ||5;
        const skip = (page - 1) * limit;
        const books = await Book.find().sort({createdAt : -1}).skip(skip).limit(limit).populate("user", "usernaem profileimage");
        const totalBook = Book.countDocuments();
        res.send({books,
            currentpage : page,
            totalBook,
            totalPages  : Math.ceil(totalBook / limit)
        }
        ); 

    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
});

//get recommend boook
router.get("/user",protectRoute, async (req, res) =>{
    try {
        const books = await Book.find({user : req.user._id}).sort({createdAt : -1});
        res.json(books);
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }

});
router.delete("/:id",protectRoute, async (req, res) =>{
    try {
        const book = await Book.findById(req.params.id);
        if(!book) return  res.status(401).json({message : "Book not found"});
        //Check book owner
        if(book.user.toString() !== req.user._id.toString()){
            return res.status(401).json({message : "Your are the owner"});
        }
        if(book.image && book.image.includes("cloudinary")){
            try {
                const publicId = book.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(publicId);
            } catch (Deleterror) {
                console.log("The error in" , Deleterror);
            }
        }
        await book.deleteOne();
        res.json({message : "Deleted successfully"});
    } catch (error) {
        res.status(500).json({message : "Internal Server Error"});
    }

});
export default router;