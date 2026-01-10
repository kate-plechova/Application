import type { FC } from "react";
import { useForm } from 'react-hook-form'
import { useLazySearchQuery } from "../../book.api";
import { BookOpenIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";
import { LanguageIcon } from "@heroicons/react/24/outline";

export interface SearchParams {
    title?: string
    author?: string
    lang?: string
    subject?: string
    publisher?: string
}

export interface SearchFormProps {
    search: (params: SearchParams) => void
}

const langs = ["", "eng", "fr", "ge"]

const subjects: {[key: string]: string} = {
    "": "",
    "id1": "subject 1",
    "id2": "subject 2",
    "id3": "subject 3"
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
            <div 
                className="grid grid-cols-3 gap-4"
            >
                
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
                 
                <select defaultValue="" className="select" {...register("subject")}>
                    {Object.keys(subjects).map(key => 
                        <option key={key} value={key}>{subjects[key]}</option>
                    )}
                </select>

                <select defaultValue={""} className="select" {...register("lang")}>
                    {langs.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>

            </div>

            <div>
                {errors.root && <div style={{ color: 'red' }}>{errors.root.message}</div>}
            </div>
        </form>
    )
}