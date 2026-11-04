import {
  AnyKeys,
  QueryFilter,
  HydratedDocument,
  Model,
  MongooseBaseQueryOptions,
  MongooseUpdateQueryOptions,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from "mongoose";

export abstract class DatabaseRepository<TRowDocType> {
  constructor(protected readonly model: Model<TRowDocType>) {}

  // ===================== CREATE ===================== //

  async create(data: AnyKeys<TRowDocType>): Promise<HydratedDocument<TRowDocType>> {
    return await this.model.create(data);
  }

  async insertMany(data: AnyKeys<TRowDocType>[]): Promise<HydratedDocument<TRowDocType>[]> {
    return (await this.model.insertMany(data)) as HydratedDocument<TRowDocType>[];
  }

  // ===================== READ ===================== //

  async findById(
    id: string,
    projection?: ProjectionType<TRowDocType>,
    options?: QueryOptions<TRowDocType>
  ): Promise<HydratedDocument<TRowDocType> | null> {
    return await this.model.findById(id, projection, options);
  }

  async findOne(
    filter: QueryFilter<TRowDocType>,
    projection?: ProjectionType<TRowDocType>,
    options?: QueryOptions<TRowDocType>
  ): Promise<HydratedDocument<TRowDocType> | null> {
    return await this.model.findOne(filter, projection, options);
  }

  async find(
    filter: QueryFilter<TRowDocType> = {},
    projection?: ProjectionType<TRowDocType>,
    options?: QueryOptions<TRowDocType>
  ): Promise<HydratedDocument<TRowDocType>[]> {
    return await this.model.find(filter, projection, options);
  }

  // ===================== UPDATE ===================== //

  async findByIdAndUpdate(
    id: string,
    update: UpdateQuery<TRowDocType>,
    options: QueryOptions<TRowDocType> = { new: true, runValidators: true }
  ): Promise<HydratedDocument<TRowDocType> | null> {
    return await this.model.findByIdAndUpdate(id, update, options);
  }

  async findOneAndUpdate(
    filter: QueryFilter<TRowDocType>,
    update: UpdateQuery<TRowDocType>,
    options: QueryOptions<TRowDocType> = { new: true, runValidators: true }
  ): Promise<HydratedDocument<TRowDocType> | null> {
    return await this.model.findOneAndUpdate(filter, update, options);
  }

  async updateOne(
    filter: QueryFilter<TRowDocType>,
    update: UpdateQuery<TRowDocType> | UpdateWithAggregationPipeline,
    options?: MongooseUpdateQueryOptions<TRowDocType>
  ) {
    return await this.model.updateOne(filter, update, options);
  }

  async updateMany(
    filter: QueryFilter<TRowDocType>,
    update: UpdateQuery<TRowDocType> | UpdateWithAggregationPipeline,
    options?: MongooseUpdateQueryOptions<TRowDocType>
  ) {
    return await this.model.updateMany(filter, update, options);
  }

  // ===================== DELETE ===================== //

  async findByIdAndDelete(
    id: string,
    options?: QueryOptions<TRowDocType>
  ): Promise<HydratedDocument<TRowDocType> | null> {
    return await this.model.findByIdAndDelete(id, options);
  }

  async findOneAndDelete(
    filter: QueryFilter<TRowDocType>,
    options?: QueryOptions<TRowDocType>
  ): Promise<HydratedDocument<TRowDocType> | null> {
    return await this.model.findOneAndDelete(filter, options);
  }

async deleteOne(
    filter: QueryFilter<TRowDocType>,
    options?: MongooseBaseQueryOptions<TRowDocType>
  ) {
    return await this.model.deleteOne(filter, options);
  }

  async deleteMany(
    filter: QueryFilter<TRowDocType>,
    options?: MongooseBaseQueryOptions<TRowDocType>
  ) {
    return await this.model.deleteMany(filter, options);
  }

  // ===================== UTILITIES ===================== //

  async exists(filter: QueryFilter<TRowDocType>): Promise<{ _id: unknown } | null> {
    return await this.model.exists(filter);
  }

  async countDocuments(filter: QueryFilter<TRowDocType> = {}): Promise<number> {
    return await this.model.countDocuments(filter);
  }

  async paginate(
    filter: QueryFilter<TRowDocType> = {},
    page: number = 1,
    limit: number = 10,
    projection?: ProjectionType<TRowDocType>,
    options?: QueryOptions<TRowDocType>
  ): Promise<{
    data: HydratedDocument<TRowDocType>[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.model.find(filter, projection, { ...options, skip, limit }),
      this.model.countDocuments(filter),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }
}