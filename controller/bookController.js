import Book from "../model/bookSchema.js";

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

export const updateBook = async ( req, res) =>{
    try{
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!updatedBook){
            res.status(404).json({
                message: "Books Not Found"
            })
        }
    res.status(200).json({
        message:"Books updated successfully"
    })
    }catch (error){

    }
}
