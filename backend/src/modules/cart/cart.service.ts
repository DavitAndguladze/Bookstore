import { AppError } from '../../shared/middleware/error.middleware';
import * as CartRepository from './cart.repository';
import * as BookRepository from '../books/books.repository';

export const getCart = async (userId: bigint) => {
    let cart = await CartRepository.findActiveCart(userId);
    if (!cart) {
        await CartRepository.createCart(userId);
        cart = await CartRepository.findActiveCart(userId);
    }
    return {
        ...cart!,
        id: cart!.id.toString(),
        userId: cart!.userId.toString(),
        cartItems: cart!.cartItems.map(item => ({
            ...item,
            id: item.id.toString(),
            cartId: item.cartId.toString(),
            bookId: item.bookId.toString(),
            book: {
                ...item.book,
                id: item.book.id.toString()
            }
        }))
    };
}

export const addItem = async (userId: bigint, bookId: bigint, quantity: number) => {
    const cart = await getCart(userId);
    const book = await BookRepository.findBookById(bookId);
    if (!book) throw new AppError(404, 'Book not found');
    if (!book.isActive || book.visibility !== 'PUBLISHED') throw new AppError(400, 'Book is not available');

    const existingItem = await CartRepository.findCartItemByBookId(BigInt(cart.id), bookId);
    if (existingItem) {
        const updated = await CartRepository.updateCartItem(existingItem.id, existingItem.quantity + quantity);
        return {
            ...updated,
            id: updated.id.toString(),
            cartId: updated.cartId.toString(),
            bookId: updated.bookId.toString()
        }
    }

    const newCart = await CartRepository.createCartItem(BigInt(cart.id), bookId, quantity, book.price);
    return {
        ...newCart,
        id: newCart.id.toString(),
        cartId: newCart.cartId.toString(),
        bookId: newCart.bookId.toString()
    }
}  

export const updateItem = async (userId: bigint, itemId: bigint, quantity: number) => {
    const item = await CartRepository.findCartItem(itemId);
    if (!item) throw new AppError(404, "Not found");

    const userCart = await getCart(userId);
    if (item.cartId.toString() !== userCart.id) throw new AppError(403, 'Forbidden');

    const updated = await CartRepository.updateCartItem(itemId, quantity);
    return {
        ...updated,
        id: updated.id.toString(),
        cartId: updated.cartId.toString(),
        bookId: updated.bookId.toString()
    };
}

export const removeItem = async (userId: bigint, itemId: bigint) => {
        const item = await CartRepository.findCartItem(itemId);
        if (!item) throw new AppError(404, "Not found");

        const userCart = await getCart(userId);
        if (item.cartId.toString() !== userCart.id) throw new AppError(403, 'Forbidden')
        
        return await CartRepository.deleteCartItem(itemId);
}