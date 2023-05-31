import React, { useEffect, useState } from "react";
import { TextInput, Button, Group, Box, Select } from '@mantine/core';
import { useForm } from '@mantine/form';

import { createBook, getAuthors } from "../../../../api";

export const Form = ({ book, onSubmit }) => {
    const [authors, setAuthors] = useState([])

    const getAuthorsData = async () => {
        const result = await getAuthors(0, 0)
        setAuthors(result.data.rows)
    }

    const form = useForm({
        initialValues: {
            name: book?.name ?? '',
            authorId: book?.Author?.name ?? '',
            price: book?.price ?? 0,
        },

        validate: {
            name: (value) => (
                value.length === 0
                    ? 'Название не может быть пустым'
                    : /^[а-яА-Я ]+$/.test(value)
                        ? null
                        : 'Некорректное название'
            ),
            authorId: (value) => (value.length === 0 ? 'Выберите автора' : null),
            price: (value) => (/^(?:[1-9]\d*|0)(?:\.\d+)?$/.test(value) ? null : 'Цена должна быть целым либо дробным положительным числом ')
        },
    });

    // const postData = async (values) => {
    //     await createBook(values.name, values.author, values.price)
    //     onSubmit({})
    // }

    useEffect(() => {
        getAuthorsData()
    }, [])

    const selectData = authors.map((authorRow) => {
        return { value: authorRow.id, label: authorRow.name }
    })

    return (
        <Box maw={300} mx="auto" style={{ height: 400 }}>
            {/*<form onSubmit={form.onSubmit((values) => postData(values))}>*/}
            <form onSubmit={form.onSubmit((values) => {
                onSubmit({ ...book, ...values })

            })}>
                <TextInput
                    withAsterisk
                    label="Название"
                    {...form.getInputProps('name')}
                />

                <Select
                    withAsterisk
                    label="Автор"
                    placeholder="Выберите автора"
                    searchable
                    nothingFound="Ничего не найдено"
                    data={selectData}
                    {...form.getInputProps('authorId')}
                />

                <TextInput
                    label="Цена"
                    {...form.getInputProps('price')}
                />

                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    )
}