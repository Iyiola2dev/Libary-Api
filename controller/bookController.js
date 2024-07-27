import Book from "../model/bookSchema.js";
import dotenv from "dotenv";

dotenv.config();

export const getAllBook = async (req, res) =>{
    try{
        const books = await Book.find()
        return res.status(200).json({
            message: "All books fetched successfully"
        })
    }catch(error){
        res.status(500).json({
            message: "Enable to get all books"
        })
    }
};


//This is for updating the database 

export const addBook = async (req, res)=>{
    try{
        const newBook = new Book(req.body);
        await newBook.save();
        return res.status(201).json({
            message: "New Books added successfully"
        })
    }catch(error){
        res.status(500).json({
            message: "Unable to add new books"
        })
    }
};

//This is for Updating books to to the webpage
export const updateBook = async ( req, res) =>{
    try{
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!updatedBook){
            res.status(404).json({
                message: "Book Not Found"
            })
        }
    res.status(200).json({
        message:"Books updated successfully"
    })
    }catch (error){
        res.status(500).json({ message: 'Failed to update book' });
    }
};

// This is to delete books 

export const deleteBook = async (req, res) =>{
    try{
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if(!deletedBook){
            res.status(404).json({
                message: "Book Not Found"
            })
        }
        res.status(200).json({
        message:"Books deleted successfully"
    })
    }catch(error){
        res.status(500).json({ message: 'Failed to delete book' });
    }
}