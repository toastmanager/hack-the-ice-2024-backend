import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('issued_tokens')
export class IssuedTokenEntity {
    @PrimaryGeneratedColumn("uuid")
    issue_id: string
    
    @Column()
    token_id: string;
}