- Запросы для вставки данных о двух книгах в коллекцию `books`:

```
db.books.insertOne({
	title: "Beginning Node.js, Express & MongoDB Development",
	description: "",
	authors: ""
})

db.books.insertOne({
	title: "Programming TypeScript: Making Your JavaScript Applications Scale",
	description: "Any programmer working with a dynamically typed language will tell you how hard it is to scale to more lines of code and more engineers...",
	authors: "Boris Cherny"
})
```

- Запрос для поиска полей документов коллекции `books` по полю `title`:

```
db.books.find(
	{ title: /^Mongo/ },
	{ title: 1, description: 1, authors: 1}
)
```

- Запрос для редактирования полей `description` и `authors` коллекции `books` по `_id` записи:

```
db.books.updateOne(
	{ _id: 1 }
	{ $set: { authors: "Greg Lim", description: "In this book, we take you on a fun, hands-on and pragmatic journey to learning Node.js, Express and MongoDB development..." } }
)
```
