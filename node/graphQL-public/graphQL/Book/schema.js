export const type = `
  
  type Book {
    _id: String
    ean: String
    isbn: String
    title: String
    smallImage: String
    mediumImage: String
    userId: String
    publisher: String
    publicationDate: String
    pages: Int
    authors: [String]
    subjects: [String]
    tags: [String]
    isRead: Boolean
    dateAdded: String
    editorialReviews: [EditorialReview]
    similarItems: [String]
  }

  type BookQueryResults {
    Books: [Book!]!
    Meta: QueryResultsMetadata!
  }

  type BookSingleQueryResult {
    Book: Book
  }

  type BookMutationResult {
    Book: Book
    success: Boolean!
    Meta: MutationResultInfo!
  }

  type BookMutationResultMulti {
    Books: [Book]
    success: Boolean!
    Meta: MutationResultInfo!
  }

  type BookBulkMutationResult {
    success: Boolean!
    Meta: MutationResultInfo!
  }

  input BookInput {
    _id: String
    ean: String
    isbn: String
    title: String
    smallImage: String
    mediumImage: String
    userId: String
    publisher: String
    publicationDate: String
    pages: Int
    authors: [String]
    subjects: [String]
    tags: [String]
    isRead: Boolean
    dateAdded: String
    editorialReviews: [EditorialReviewInput]
    similarItems: [String]
  }

  input BookMutationInput {
    ean: String
    isbn: String
    title: String
    smallImage: String
    mediumImage: String
    userId: String
    publisher: String
    publicationDate: String
    pages: Int
    pages_INC: Int
    pages_DEC: Int
    authors: [String]
    authors_PUSH: String
    authors_CONCAT: [String]
    authors_UPDATE: StringArrayUpdate
    authors_UPDATES: [StringArrayUpdate]
    authors_PULL: [String]
    authors_ADDTOSET: [String]
    subjects: [String]
    subjects_PUSH: String
    subjects_CONCAT: [String]
    subjects_UPDATE: StringArrayUpdate
    subjects_UPDATES: [StringArrayUpdate]
    subjects_PULL: [String]
    subjects_ADDTOSET: [String]
    tags: [String]
    tags_PUSH: String
    tags_CONCAT: [String]
    tags_UPDATE: StringArrayUpdate
    tags_UPDATES: [StringArrayUpdate]
    tags_PULL: [String]
    tags_ADDTOSET: [String]
    isRead: Boolean
    dateAdded: String
    editorialReviews: [EditorialReviewInput]
    editorialReviews_PUSH: EditorialReviewInput
    editorialReviews_CONCAT: [EditorialReviewInput]
    editorialReviews_UPDATE: EditorialReviewArrayMutationInput
    editorialReviews_UPDATES: [EditorialReviewArrayMutationInput]
    editorialReviews_PULL: EditorialReviewFilters
    similarItems: [String]
    similarItems_PUSH: String
    similarItems_CONCAT: [String]
    similarItems_UPDATE: StringArrayUpdate
    similarItems_UPDATES: [StringArrayUpdate]
    similarItems_PULL: [String]
    similarItems_ADDTOSET: [String]
  }

  input BookSort {
    _id: Int
    ean: Int
    isbn: Int
    title: Int
    smallImage: Int
    mediumImage: Int
    userId: Int
    publisher: Int
    publicationDate: Int
    pages: Int
    authors: Int
    subjects: Int
    tags: Int
    isRead: Int
    dateAdded: Int
    editorialReviews: Int
    similarItems: Int
  }

  input BookFilters {
    _id: String
    _id_ne: String
    _id_in: [String]
    _id_nin: [String]
    ean_contains: String
    ean_startsWith: String
    ean_endsWith: String
    ean_regex: String
    ean: String
    ean_ne: String
    ean_in: [String]
    ean_nin: [String]
    isbn_contains: String
    isbn_startsWith: String
    isbn_endsWith: String
    isbn_regex: String
    isbn: String
    isbn_ne: String
    isbn_in: [String]
    isbn_nin: [String]
    title_contains: String
    title_startsWith: String
    title_endsWith: String
    title_regex: String
    title: String
    title_ne: String
    title_in: [String]
    title_nin: [String]
    smallImage_contains: String
    smallImage_startsWith: String
    smallImage_endsWith: String
    smallImage_regex: String
    smallImage: String
    smallImage_ne: String
    smallImage_in: [String]
    smallImage_nin: [String]
    mediumImage_contains: String
    mediumImage_startsWith: String
    mediumImage_endsWith: String
    mediumImage_regex: String
    mediumImage: String
    mediumImage_ne: String
    mediumImage_in: [String]
    mediumImage_nin: [String]
    userId_contains: String
    userId_startsWith: String
    userId_endsWith: String
    userId_regex: String
    userId: String
    userId_ne: String
    userId_in: [String]
    userId_nin: [String]
    publisher_contains: String
    publisher_startsWith: String
    publisher_endsWith: String
    publisher_regex: String
    publisher: String
    publisher_ne: String
    publisher_in: [String]
    publisher_nin: [String]
    publicationDate_contains: String
    publicationDate_startsWith: String
    publicationDate_endsWith: String
    publicationDate_regex: String
    publicationDate: String
    publicationDate_ne: String
    publicationDate_in: [String]
    publicationDate_nin: [String]
    pages_lt: Int
    pages_lte: Int
    pages_gt: Int
    pages_gte: Int
    pages: Int
    pages_ne: Int
    pages_in: [Int]
    pages_nin: [Int]
    authors_count: Int
    authors_textContains: String
    authors_startsWith: String
    authors_endsWith: String
    authors_regex: String
    authors: [String]
    authors_in: [[String]]
    authors_nin: [[String]]
    authors_contains: String
    authors_containsAny: [String]
    authors_containsAll: [String]
    authors_ne: [String]
    subjects_count: Int
    subjects_textContains: String
    subjects_startsWith: String
    subjects_endsWith: String
    subjects_regex: String
    subjects: [String]
    subjects_in: [[String]]
    subjects_nin: [[String]]
    subjects_contains: String
    subjects_containsAny: [String]
    subjects_containsAll: [String]
    subjects_ne: [String]
    tags_count: Int
    tags_textContains: String
    tags_startsWith: String
    tags_endsWith: String
    tags_regex: String
    tags: [String]
    tags_in: [[String]]
    tags_nin: [[String]]
    tags_contains: String
    tags_containsAny: [String]
    tags_containsAll: [String]
    tags_ne: [String]
    isRead: Boolean
    isRead_ne: Boolean
    isRead_in: [Boolean]
    isRead_nin: [Boolean]
    dateAdded_contains: String
    dateAdded_startsWith: String
    dateAdded_endsWith: String
    dateAdded_regex: String
    dateAdded: String
    dateAdded_ne: String
    dateAdded_in: [String]
    dateAdded_nin: [String]
    editorialReviews_count: Int
    editorialReviews: EditorialReviewFilters
    similarItems_count: Int
    similarItems_textContains: String
    similarItems_startsWith: String
    similarItems_endsWith: String
    similarItems_regex: String
    similarItems: [String]
    similarItems_in: [[String]]
    similarItems_nin: [[String]]
    similarItems_contains: String
    similarItems_containsAny: [String]
    similarItems_containsAll: [String]
    similarItems_ne: [String]
    OR: [BookFilters]
  }
  
`;

export const mutation = `

  createBook (
    Book: BookInput
  ): BookMutationResult

  updateBook (
    _id: String,
    Updates: BookMutationInput
  ): BookMutationResult

  updateBooks (
    _ids: [String],
    Updates: BookMutationInput
  ): BookMutationResultMulti

  updateBooksBulk (
    Match: BookFilters,
    Updates: BookMutationInput
  ): BookBulkMutationResult

  deleteBook (
    _id: String
  ): DeletionResultInfo

`;

export const query = `

  allBooks (
    _id: String,
    _id_ne: String,
    _id_in: [String],
    _id_nin: [String],
    ean_contains: String,
    ean_startsWith: String,
    ean_endsWith: String,
    ean_regex: String,
    ean: String,
    ean_ne: String,
    ean_in: [String],
    ean_nin: [String],
    isbn_contains: String,
    isbn_startsWith: String,
    isbn_endsWith: String,
    isbn_regex: String,
    isbn: String,
    isbn_ne: String,
    isbn_in: [String],
    isbn_nin: [String],
    title_contains: String,
    title_startsWith: String,
    title_endsWith: String,
    title_regex: String,
    title: String,
    title_ne: String,
    title_in: [String],
    title_nin: [String],
    smallImage_contains: String,
    smallImage_startsWith: String,
    smallImage_endsWith: String,
    smallImage_regex: String,
    smallImage: String,
    smallImage_ne: String,
    smallImage_in: [String],
    smallImage_nin: [String],
    mediumImage_contains: String,
    mediumImage_startsWith: String,
    mediumImage_endsWith: String,
    mediumImage_regex: String,
    mediumImage: String,
    mediumImage_ne: String,
    mediumImage_in: [String],
    mediumImage_nin: [String],
    userId_contains: String,
    userId_startsWith: String,
    userId_endsWith: String,
    userId_regex: String,
    userId: String,
    userId_ne: String,
    userId_in: [String],
    userId_nin: [String],
    publisher_contains: String,
    publisher_startsWith: String,
    publisher_endsWith: String,
    publisher_regex: String,
    publisher: String,
    publisher_ne: String,
    publisher_in: [String],
    publisher_nin: [String],
    publicationDate_contains: String,
    publicationDate_startsWith: String,
    publicationDate_endsWith: String,
    publicationDate_regex: String,
    publicationDate: String,
    publicationDate_ne: String,
    publicationDate_in: [String],
    publicationDate_nin: [String],
    pages_lt: Int,
    pages_lte: Int,
    pages_gt: Int,
    pages_gte: Int,
    pages: Int,
    pages_ne: Int,
    pages_in: [Int],
    pages_nin: [Int],
    authors_count: Int,
    authors_textContains: String,
    authors_startsWith: String,
    authors_endsWith: String,
    authors_regex: String,
    authors: [String],
    authors_in: [[String]],
    authors_nin: [[String]],
    authors_contains: String,
    authors_containsAny: [String],
    authors_containsAll: [String],
    authors_ne: [String],
    subjects_count: Int,
    subjects_textContains: String,
    subjects_startsWith: String,
    subjects_endsWith: String,
    subjects_regex: String,
    subjects: [String],
    subjects_in: [[String]],
    subjects_nin: [[String]],
    subjects_contains: String,
    subjects_containsAny: [String],
    subjects_containsAll: [String],
    subjects_ne: [String],
    tags_count: Int,
    tags_textContains: String,
    tags_startsWith: String,
    tags_endsWith: String,
    tags_regex: String,
    tags: [String],
    tags_in: [[String]],
    tags_nin: [[String]],
    tags_contains: String,
    tags_containsAny: [String],
    tags_containsAll: [String],
    tags_ne: [String],
    isRead: Boolean,
    isRead_ne: Boolean,
    isRead_in: [Boolean],
    isRead_nin: [Boolean],
    dateAdded_contains: String,
    dateAdded_startsWith: String,
    dateAdded_endsWith: String,
    dateAdded_regex: String,
    dateAdded: String,
    dateAdded_ne: String,
    dateAdded_in: [String],
    dateAdded_nin: [String],
    editorialReviews_count: Int,
    editorialReviews: EditorialReviewFilters,
    similarItems_count: Int,
    similarItems_textContains: String,
    similarItems_startsWith: String,
    similarItems_endsWith: String,
    similarItems_regex: String,
    similarItems: [String],
    similarItems_in: [[String]],
    similarItems_nin: [[String]],
    similarItems_contains: String,
    similarItems_containsAny: [String],
    similarItems_containsAll: [String],
    similarItems_ne: [String],
    OR: [BookFilters],
    SORT: BookSort,
    SORTS: [BookSort],
    LIMIT: Int,
    SKIP: Int,
    PAGE: Int,
    PAGE_SIZE: Int,
    searchChildSubjects: Boolean,
    publicUserId: String,
    ver: String,
    cache: Int
  ): BookQueryResults!

  getBook (
    _id: String,
    searchChildSubjects: Boolean,
    publicUserId: String,
    ver: String,
    cache: Int
  ): BookSingleQueryResult!

`;
