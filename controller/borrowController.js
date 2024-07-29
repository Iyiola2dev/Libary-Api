import Borrowing from "../model/borrowSchema.js";
import Book from "../model/bookSchema.js";

export const borrowBook = async (req, res) =>{
    try{
        const {bookId} = req.body;
        const {userId} = req.user.id;

        const book = await Book.findById(bookId);
        if(!book || book.copiesAvailable < 1){
            return res.status(400).json({message: "Book copy is not Avaiable"})
        }
        const borrow = new Borrowing ({userId, bookId});
        await borrow.save();

        book.copiesAvailable -= 1,
        await book.save()

        return res.status(200).json({message: "Books borrowed Successfully"})
    }catch(error){
        res.status(500).json({ message: 'Failed to borrow book' });
    }
}