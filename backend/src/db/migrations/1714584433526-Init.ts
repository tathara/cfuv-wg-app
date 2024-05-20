import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1714584433526 implements MigrationInterface {
  name = 'Init1714584433526';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "username" character varying NOT NULL,
                "chat_id" bigint NOT NULL,
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                CONSTRAINT "UQ_c43d9c7669f5c12f23686e1b891" UNIQUE ("chat_id"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "peer" (
                "id" SERIAL NOT NULL,
                "name" character varying,
                "path" character varying,
                "user_id" integer,
                CONSTRAINT "UQ_2dad8cfc0349266cfad3199e8d5" UNIQUE ("name"),
                CONSTRAINT "UQ_ce9186727ef26b768e73101d9a5" UNIQUE ("path"),
                CONSTRAINT "PK_3a3bede69c11e056079aaece6db" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "peer"
            ADD CONSTRAINT "FK_b9e433fc12b133fab6fa397619f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "peer" DROP CONSTRAINT "FK_b9e433fc12b133fab6fa397619f"
        `);
    await queryRunner.query(`
            DROP TABLE "peer"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
  }
}
