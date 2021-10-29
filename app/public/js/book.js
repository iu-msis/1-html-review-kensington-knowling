const booksApp = {
    data() {
      return {
            // "books":[],
            // result: undefined,
            // app: 0,
            books: [],
            bookForm: {},
            selectedBook: null
        }
    },
    computed:  {},
    methods: {
      prettyDollar(n) {
        const d = new Intl.NumberFormat("en-US").format(n);
        return "$ " + d;
    },
        fetchBooksData() {
            // console.log("Fetching books for", s);
            fetch('/api/books/')
            .then(response => response.json())
            .then((parsedJson) => {
                console.log(parsedJson);
                this.books = parsedJson
            })
            .catch( err => {
                console.error(err)
            })
            console.log("B");
        },
        postNewBook(evt) {
            // this.bookForm.Title = this.selectedBook.Title;        
            // console.log("Posting:", this.bookForm);
            // alert("Posting!");

            // check naming convention
            console.log("Posting:", this.bookForm);
            alert("Posting!");
    
            fetch('api/books/create.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                
                // reset the form
                this.bookForm = {};
                this.fetchBooksData();
              })
          },
          postBook(evt) {
            console.log ("Test:", this.selectedBook);
            if (this.selectedBook === null) {
                this.postNewBook(evt);
            } else {
                this.postEditBook(evt);
            }
          },
          postNewBook(evt) {
            // this.bookForm.studentId = this.selectedStudent.id;        
            
            console.log("Creating!", this.bookForm);
    
            fetch('api/books/create.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.offers = json;
                
                this.resetBookForm();
              // })
              // .catch( err => {
              //   alert("Something went horribly wrong!");
              });
          },
          postEditBook(evt) {
            // this.bookForm.studentId = this.selectedStudent.id;
            this.bookForm.id = this.selectedBook.id;       
            
            console.log("Updating!", this.bookForm);
    
            fetch('api/books/update.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                
                this.resetBookForm();
              });
          },
          postDeleteBook(o) {
            if (!confirm("Are you sure you want to delete the book from "+o.title+"?")) {
                return;
            }
            fetch('api/books/delete.php', {
                method:'POST',
                body: JSON.stringify(o),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                
                this.resetBookForm();
              });
          },
          selectBook(book) {
            this.selectedBook = book;
            this.bookForm = Object.assign({}, this.selectedBook);
          },
          resetBookForm() {
            this.selectedBook = null;
            this.bookForm = {};
          }
      },
    created() {
        this.fetchBooksData();
    }
}

  Vue.createApp(booksApp).mount('#booksApp');