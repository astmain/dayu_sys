//帮我阅读 https://www.npmjs.com/package/prisma-class-generator 的源码，并实现一个简单的示例

import { PrismaClient } from '@prisma/client';
import { TbGen } from '../generated/TbGen';

async function main() {
  const prisma = new PrismaClient();

  try {
    // 创建一个新的 TbGen 实例
    const tbGen = new TbGen(prisma);
    
    // 创建一条新记录
    const newRecord = await tbGen.create({
      data: {
        name: '测试数据'
      }
    });
    console.log('创建的新记录:', newRecord);

    // 查询所有记录
    const allRecords = await tbGen.findMany();
    console.log('所有记录:', allRecords);

    // 更新记录
    if (newRecord) {
      const updatedRecord = await tbGen.update({
        where: { id: newRecord.id },
        data: { name: '更新后的数据' }
      });
      console.log('更新后的记录:', updatedRecord);
    }

  } catch (error) {
    console.error('发生错误:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();









