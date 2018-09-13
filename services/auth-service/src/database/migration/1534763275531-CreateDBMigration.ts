import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CategoryMigration1534763275531 {

  up = async (queryRunner) => {
    // await queryRunner.createDatabase('provis_exam', true);
    await queryRunner.query(`create extension if not exists "uuid-ossp";`);
  };

  down = async (queryRunner) => {
    await queryRunner.dropDatabase('provis_exam', true);
  }
}
