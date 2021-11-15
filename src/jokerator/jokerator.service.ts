import { Injectable } from '@nestjs/common'
import { ApolloError } from 'apollo-server-errors'
import axios, { AxiosRequestConfig } from 'axios'

import { CategoryDto } from './dtos/category.dto'
import { CategoryEnum } from './enums/category.enum'
import ApiError from './interfaces/api-error.interface'
import { JokeType } from './interfaces/joke.interface'

/**
 * Parses jokes from https://v2.jokeapi.dev/
 */
@Injectable()
export class JokeratorService {
    /**
     * Execute a request to the api
     * @param input
     * @returns Promise<JokeType>
     */
    async parse(input: CategoryDto): Promise<JokeType> {
        const { data } = await axios.request<JokeType | ApiError>(
            this._generateRequest(input.categories),
        )

        if (data.error) {
            throw new ApolloError(data.message, 'JOKE_NOT_FOUND_ERROR', {
                error: data,
            })
        }
        return data
    }

    /**
     * Сreate an api request
     * @param categories - list of categories to be searched for
     * @returns AxiosRequestConfig
     */
    private _generateRequest(
        categories: CategoryEnum[] | CategoryEnum.Any,
    ): AxiosRequestConfig {
        return {
            url: [categories].join(','),
            method: 'get',
            baseURL: 'https://v2.jokeapi.dev/joke/',
        }
    }
}
