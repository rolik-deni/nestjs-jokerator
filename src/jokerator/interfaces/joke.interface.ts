import { CategoryEnum } from '../enums/category.enum'
import { TypeEnum } from '../enums/type.enum'

import { FlagsType } from './flags-type.interface'

export interface JokeType {
    error: false

    category: CategoryEnum

    type: TypeEnum

    joke?: string

    setup?: string

    delivery?: string

    flags: FlagsType

    id: number

    safe: boolean

    lang: string
}
