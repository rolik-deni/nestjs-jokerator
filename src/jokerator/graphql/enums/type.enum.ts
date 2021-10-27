import { registerEnumType } from '@nestjs/graphql'

export enum TypeEnum {
    Single = 'single',
    Twopart = 'twopart',
}

registerEnumType(TypeEnum, {
    name: 'TypeEnum',
})
