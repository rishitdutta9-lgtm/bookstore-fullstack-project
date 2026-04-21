package com.bookstore.bookstore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bookstore.bookstore.entity.Book;
import com.bookstore.bookstore.service.BookService;

@RestController
@RequestMapping("/books")
@CrossOrigin
public class BookController {

    @Autowired
    private BookService bookService;

    // Add Book
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookService.saveBook(book);
    }

    // Get All Books
    @GetMapping
    public List<Book> getBooks() {
        return bookService.getAllBooks();
    }

    // Delete Book
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return "Book deleted successfully";
    }
}