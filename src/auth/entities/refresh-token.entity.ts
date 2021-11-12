import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('refresh_tokens')
export class RefreshTokenEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    userId: string

    @Column()
    token: string

    @Column()
    expiresAt: Date
}
