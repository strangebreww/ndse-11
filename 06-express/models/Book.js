class Book {
	static idCounter = 1;

	constructor(
		title = "",
		description = "",
		authors = "",
		favorite = "",
		fileCover = "",
		fileName = ""
	) {
		this.id = Book.idCounter.toString();
		this.title = title;
		this.description = description;
		this.authors = authors;
		this.favorite = favorite;
		this.fileCover = fileCover;
		this.fileName = fileName;

		Book.idCounter++;
	}
}

module.exports = Book;
