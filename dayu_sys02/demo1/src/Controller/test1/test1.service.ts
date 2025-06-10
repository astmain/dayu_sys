import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { tb_test1 } from './test1.entity';

@Injectable()
export class Test1Service {
  constructor(
    @InjectRepository(tb_test1)
    private test1Repository: Repository<tb_test1>,
  ) { }

  // 创建记录
  async create(data: Partial<tb_test1>): Promise<tb_test1> {
    const test1 = this.test1Repository.create(data);
    return await this.test1Repository.save(test1);
  }

  // 查找所有记录
  async findAll(): Promise<tb_test1[]> {
    return await this.test1Repository.find();
  }

  // 根据ID查找记录
  async findOne(id: number): Promise<tb_test1> {
    const test1 = await this.test1Repository.findOne({ where: { id } });
    if (!test1) {
      throw new NotFoundException(`Test1 with ID ${id} not found`);
    }
    return test1;
  }

  // 更新记录
  async update(id: number, data: Partial<tb_test1>): Promise<tb_test1> {
    await this.test1Repository.update(id, data);
    const updated = await this.test1Repository.findOne({ where: { id } });
    if (!updated) {
      throw new NotFoundException(`Test1 with ID ${id} not found`);
    }
    return updated;
  }

  // 删除记录
  async remove(id: number): Promise<void> {
    await this.test1Repository.delete(id);
  }
} 