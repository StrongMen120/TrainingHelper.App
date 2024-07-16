export function createMapUpdate<TModel, TDto>(
  dtoArray: TDto[],
  factory: (dto: TDto) => TModel,
  keySelector: (dto: TDto, model: TModel) => string | number
): { [key: string | number]: TModel } {
  const update: { [key: string | number]: TModel } = {};
  dtoArray.forEach((dto) => {
    const model = factory(dto);
    const key = keySelector(dto, model);
    update[key] = model;
  });
  return update;
}
