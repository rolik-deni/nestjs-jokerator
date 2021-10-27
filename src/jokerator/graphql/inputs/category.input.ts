import { Field, InputType } from '@nestjs/graphql'

import { CategoryEnum } from '../enums/category.enum'

// @InputType()
// export class CategoryInput {
//     @Field(() => [CategoryEnum], { defaultValue: CategoryEnum.Any, nullable: true })
//     categories: CategoryEnum[]
// }

@InputType()
export class CategoryInput {
    @Field(() => [CategoryEnum], {
        defaultValue: CategoryEnum.Any,
        nullable: true,
    })
    categories: CategoryEnum[]
}
