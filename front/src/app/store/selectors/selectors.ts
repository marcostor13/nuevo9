import { createSelector } from '@ngrx/store';




export const selectData = (state: any) => state;
export const selectLoading = (state: any) => state;

// export const selectVisibleBooks = createSelector(
//     selectUser,
//     selectAllBooks,
//     (selectedUser: User, allBooks: Book[]) => {
//         if (selectedUser && allBooks) {
//             return allBooks.filter((book: Book) => book.userId === selectedUser.id);
//         } else {
//             return allBooks;
//         }
//     }
// );