import type { FC } from "react";
import { useForm } from 'react-hook-form'
import { useLazySearchQuery } from "../../book.api";
import { BookOpenIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";

export interface SearchParams {
    title?: string
    author?: string
    publisher?: string
}

export interface SearchFormProps {
    search: (params: SearchParams) => void
}

export const SearchForm: FC<SearchFormProps> = ({search}) => {

    // const [search, ] = useLazySearchQuery()

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
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-between items-center p-4"
        >
            <div className="flex flex-row justify-between items-center gap-4">
                
                {/* {errors.root && <div style={{ color: 'red' }}>{errors.root.message}</div>} */}
                <label className="input">
                    <BookOpenIcon className="w-5 h-5" />
                    <input
                        type='search'
                        placeholder="title"
                        className="grow"
                        {...register('title')}
                    />
                </label>

                <label className="input">
                    <UserIcon className="w-5 h-5" />
                    <input
                        type='search'
                        placeholder="author"
                        className="grow"
                        {...register('author')}
                    />
                </label>

                <button type='submit' className="btn"><MagnifyingGlassIcon className="w-5 h-5" /> Search</button>
            </div>

            <div>
                {errors.root && <div style={{ color: 'red' }}>{errors.root.message}</div>}
            </div>
        </form>
    )
}