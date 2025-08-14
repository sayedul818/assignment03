import {  Model, Schema,model} from 'mongoose';
import { BookInstanceMethods, IBook } from '../interfaces/book.interface';


const bookSchema = new Schema<IBook,Model<IBook>,BookInstanceMethods>({
  title: {
    type: String,
    required: true
  },
  author: { 
    type: String,
    required: true
  },
  genre: {
    type: String, 
    required: true, 
    enum:  ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'] 
  },
  isbn: { 
    type: String, 
    required: true, 
    unique: true 
  },
  description: { 
    type: String 
  },
  copies: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  available: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true 
}
);
bookSchema.method("borrowBook", function (quantity: number) {
  if (this.copies < quantity) return "Not enough copies available";
  this.copies -= quantity;
  this.available = this.copies > 0;
  return `Book borrowed successfully. Remaining copies: ${this.copies}`;
});

const Book = model('Book', bookSchema);
export default Book;