export enum ElementType {
  JsonHash = 0x01,
  ImageHash = 0x02,
  WasmHash = 0xc0,
  EnumHash = 0xd0,
  PermHash = 0xd1,
  ValueRef = 0xe4,
  UniqueRef = 0xe5,
  Info = 0xff,
}

export function resolveElementType(name: string): number {
  const map: Record<string, ElementType> = {
    JsonHash: ElementType.JsonHash,
    ImageHash: ElementType.ImageHash,
    WasmHash: ElementType.WasmHash,
    EnumHash: ElementType.EnumHash,
    PermHash: ElementType.PermHash,
    ValueRef: ElementType.ValueRef,
    UniqueRef: ElementType.UniqueRef,
    Info: ElementType.Info,
  };
  return map[name] ?? 0;
}
