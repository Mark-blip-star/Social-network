import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitRole implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(``);
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('article', 'author');
    }
}