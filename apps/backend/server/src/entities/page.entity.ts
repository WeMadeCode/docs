import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { UserEntity } from './user.entity'

@Entity({
  name: 'page',
})
export class PageEntity {
  /**
   * 用于自实例化实体初始化
   * @param partial
   */
  constructor(partial: Partial<PageEntity>) {
    Object.assign(this, partial)
  }

  /**
   * 主键
   */
  @PrimaryGeneratedColumn()
  id: number

  /**
   * 项目ID
   */
  @Column({ type: 'varchar', length: 80 })
  pageId: string

  /**
   * 页面图标
   */
  @Column({ type: 'varchar', length: 4 })
  emoji: string

  /**
   * 页面标题
   */
  @Column({ type: 'varchar', length: 255 })
  title: string

  /**
   * 页面描述
   */
  @Column({ type: 'text', nullable: true })
  description: string

  /**
   * 页面创建时间
   */
  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date

  /**
   * 页面所属用户
   * 这就是我们讲到的，表之间的关联关系
   * 这里我们定义了一个多对一的关系，即一个用户可以有多个项目
   * 除了多对一，还有一对一、一对多、多对多等关系
   * 分别为：@OneToOne、@OneToMany、@ManyToMany、
   */
  @ManyToOne('UserEntity', 'applications')
  user: UserEntity
}
