import type { FC } from "react";
import { useForm } from 'react-hook-form'
import { useGetLanguagesQuery, useLazySearchQuery } from "../../book.api";
import { BookOpenIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";
import { LanguageIcon } from "@heroicons/react/24/outline";
import { langs } from "../../../langs";
import { useNavigate, useSearchParams } from "react-router";

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


const subjects: {[key: string]: string} = {
    "": "",
    "id1": "subject 1",
    "id2": "subject 2",
    "id3": "subject 3"
}

export const SearchForm: FC<SearchFormProps> = ({search}) => {

    // const [search, ] = useLazySearchQuery()
    const navigate = useNavigate()
    const [_, setSearchParams] = useSearchParams()

    const { data: langs } = useGetLanguagesQuery()

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

        // const req: SearchParams = {}
        const req: Record<string, string> = {}
        // const req: URLSearchParams = new URLSearchParams()

        let searchQueryArgs = [] 
        if(data.title){
            req.title = data.title
            searchQueryArgs.push(`title=${data.title}`)
        }
        if(data.author){
            req.author = data.author
            searchQueryArgs.push(`author=${data.author}`)
        }
        if(data.lang && data.lang.length > 0){
            req.lang = data.lang
            searchQueryArgs.push(`lang=${data.lang}`)
        }
        if(data.subject){
            req.subject = data.subject
            searchQueryArgs.push(`subject=${data.subject}`) 
        }

        setSearchParams(req)
        // navigate({
        //     pathname: "/layout",
        //     search: `?${searchQueryArgs.join("&")}`
        // })

        // search(req)
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
                 
                <label className="input">
                    <input
                        type='search'
                        placeholder="subject"
                        className="grow"
                        {...register('subject')}
                    />
                </label>

                <select defaultValue={""} className="select" {...register("lang")}>
                    <option value={""}>Language</option>
                    {langs && Object.entries(langs).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
                </select>

            </div>

            <div>
                {errors.root && <div style={{ color: 'red' }}>{errors.root.message}</div>}
            </div>
        </form>
    )
}