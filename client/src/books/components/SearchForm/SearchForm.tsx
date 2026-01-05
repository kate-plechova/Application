import type { FC } from "react";
import { useForm } from 'react-hook-form'
import { useLazySearchQuery } from "../../book.api";

export interface SearchParams {
    title?: string
    author?: string
    publisher?: string
}

export const SearchForm: FC = () => {

    const [search, ] = useLazySearchQuery()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<SearchParams>()

    const onSubmit = (data: SearchParams) => {
        const hasSearchTerm = Object.values(data).some(value => value && value.trim())

        if (!hasSearchTerm) {
            setError('root', { message: 'Please enter at least one search term' })
            return
        }

        search(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {errors.root && <div style={{ color: 'red' }}>{errors.root.message}</div>}
            <input
                type='text'
                placeholder="title"
                className="input"
                {...register('title')}
            />

            <input
                type='text'
                placeholder="author"
                className="input"
                {...register('author')}
            />

            <button type='submit'>Search</button>
        </form>
    )
}