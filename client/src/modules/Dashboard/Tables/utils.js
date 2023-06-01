export const columnsAuthor = [
    { field: 'name', headerName: 'Имя', flex: 1 },
    { field: 'rating', headerName: 'Рейтинг', flex: 1 },
    { field: 'created_at', headerName: 'Дата создания', flex: 1 }
]

export const columnsBook = [
    { field: 'name', headerName: 'Имя', flex: 1 },
    { field: 'Author.name', headerName: 'Автор', flex: 1 },
    { field: 'price', headerName: 'Цена', flex: 1 },
    { field: 'createdAt', headerName: 'Дата создания', flex: 1 }
]