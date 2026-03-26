import type { RowDataPacket } from "mysql2";

export interface Post extends RowDataPacket {
    post_id: number;
    title: string;
    description: string;
    status: 'Active' | 'Inactive';
    created_at: Date;
}