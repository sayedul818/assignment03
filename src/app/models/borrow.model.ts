import { Model, Schema, model} from 'mongoose';
import { BorrowStaticMethods, IBorrow } from '../interfaces/borrow.interface';
const borrowSchema = new Schema<IBorrow,BorrowStaticMethods>({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  quantity: { 
    type: Number, 
    required: true, 
    min: 1 
  },
  dueDate: { 
    type: Date, 
    required: true 
  }
}, { timestamps: true });


borrowSchema.static('getBorrowSummary', async function() {
  return this.aggregate([
    {
      $group: {
        _id: '$book',
        totalQuantity: { $sum: '$quantity' }
      }
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: '_id',
        as: 'book'
      }
    },
    { $unwind: '$book' },
    {
      $project: {
        _id: 0,
        totalQuantity: 1,
        book: {
          title: '$book.title',
          isbn: '$book.isbn'
        }
      }
    }
  ]);
});
const Borrow = model<IBorrow ,BorrowStaticMethods>('Borrow', borrowSchema);
export default Borrow;
