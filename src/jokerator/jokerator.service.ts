import { Injectable } from '@nestjs/common'
import { ApolloError } from 'apollo-server-errors'
import axios, { AxiosRequestConfig } from 'axios'

import { CategoryEnum } from './graphql/enums/category.enum'
import { CategoryInput } from './graphql/inputs/category.input'
import { JokeType } from './graphql/types/joke.type'
import ApiError from './interfaces/api-error.interface'

/**
 * Parses jokes from https://v2.jokeapi.dev/
 */
@Injectable()
export class JokeratorService {
    /**
     * Сreate an api request
     * @param categories - list of categories to be searched for
     * @returns AxiosRequestConfig
     */
    protected generateRequest(
        categories: CategoryEnum[] | CategoryEnum.Any,
    ): AxiosRequestConfig {
        return {
            url: [categories].join(',') + '404',
            method: 'get',
            baseURL: 'https://v2.jokeapi.dev/joke/',
        }
    }

    /**
     * Execute a request to the api
     * @param input
     * @returns Promise<JokeType>
     */
    async parse(input: CategoryInput): Promise<JokeType> {
        const { data } = await axios.request<JokeType | ApiError>(
            this.generateRequest(input.categories),
        )

        if (data.error) {
            throw new ApolloError(data.message, 'JOKE_NOT_FOUND_ERROR', {
                error: data,
            })
        }
        return data
    }
}
