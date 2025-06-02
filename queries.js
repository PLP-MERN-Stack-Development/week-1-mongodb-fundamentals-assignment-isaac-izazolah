// Task 2: Basic CRUD

// Find all books in a specific genre
db.books.find({ genre: "Self-help" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2010 } })

// Find books by a specific author
db.books.find({ author: "George Orwell" })

// Update the price of a specific book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 12.99 } }
)

// Delete a book by its title
db.books.deleteOne({ title: "To Kill a Mockingbird" })

// Task 3: Advanced Queries

// Books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// Projection: title, author, and price only
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// Sort books by price (ascending)
db.books.find().sort({ price: 1 })

// Sort books by price (descending)
db.books.find().sort({ price: -1 })

// Pagination: Page 1 (first 5 books)
db.books.find().skip(0).limit(5)

// Pagination: Page 2 (next 5 books)
db.books.find().skip(5).limit(5)

// Task 4: Aggregation Pipeline

// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
])

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// Books grouped by publication decade
db.books.aggregate([
  {
    $group: {
      _id: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] },
      booksPerDecade: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])

// Task 5: Indexing

// Create an index on title
db.books.createIndex({ title: 1 })

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 })

// Use explain() to analyze performance
db.books.find({ title: "1984" }).explain("executionStats")
