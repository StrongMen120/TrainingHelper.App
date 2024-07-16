import { isNil } from 'lodash';
import { getType, IAnyStateTreeNode, IAnyType, IStateTreeNode, addDisposer, types, Instance, ModelActions, getRoot } from 'mobx-state-tree';
import { MstExtendFunction } from './mst-helpers';

type STNValue<T, IT extends IAnyType> = T extends object ? T & IStateTreeNode<IT> : T;

const PoolCache = new WeakMap<IAnyStateTreeNode, MstPool>();
const DefaultValueKey = Symbol();

export class MstPool {
  private TypeCache = new Map<IAnyType, Map<string | symbol, IAnyStateTreeNode>>();
  private DisposeBlockers = new WeakMap<IAnyStateTreeNode, boolean>();

  private getPooledType<T extends IAnyType>(type: T) {
    let result = this.TypeCache.get(type);

    if (isNil(result)) {
      result = new Map();
      this.TypeCache.set(type, result);
    }

    if (!this.TypeCache.has(type)) throw new Error('WTF: Should not happen!');

    return result;
  }

  public unregister<T extends IAnyType, N extends STNValue<any, T>>(type: T, node: N, named?: string) {
    let typePool = this.TypeCache.get(type);
    const key = named ?? DefaultValueKey;
    typePool?.delete(key);

    this.DisposeBlockers.set(node, true);
  }

  public registerUnsafe<T extends IAnyType, N extends STNValue<any, T>>(type: T, node: N, named?: string) {
    const typePool = this.getPooledType(type);
    const key = named ?? DefaultValueKey;

    if (typePool.has(key)) throw new Error(`Registration with same name exists for this type! (name: ${key === DefaultValueKey ? '<default>' : key}, type: ${type.name})`);

    typePool.set(key, node);

    addDisposer(node, () => !this.DisposeBlockers.get(node) && this.unregister(type, named));
  }

  public register<T extends IAnyType, N extends STNValue<any, T>>(type: T, node: N, named?: string) {
    if (!type.is(node)) throw new Error(`Cannot register given node (of type: '${getType(node).name}') to type: '${type.name}'`);
    this.registerUnsafe(type, node, named);
  }

  public resolve<T extends IAnyStateTreeNode = IAnyStateTreeNode>(type: IAnyType, named?: string): T | undefined {
    let typePool = this.TypeCache.get(type);
    const key = named ?? DefaultValueKey;

    return typePool?.get(key);
  }

  public debug() {
      console.log(`MstPool`, this.TypeCache)
  }
}

export function getBoundPool(node: IAnyStateTreeNode) {
  const root = getRoot(node);
  return PoolCache.get(root);
}

export function ensureBoundPool(node: IAnyStateTreeNode) {
  const root = getRoot(node);
  let result = PoolCache.get(root);

  if (isNil(result)) {
    result = new MstPool();
    PoolCache.set(root, result);
  }

  return result;
}

export function withIocPooling<TInstance extends Instance<IAnyType>>(config?: { name?: string; pool?: MstPool; type?: IAnyType }): MstExtendFunction<TInstance> {
  const { name, pool, type } = config ?? {};
  return (self: TInstance) => {
    const targetPool = pool ?? ensureBoundPool(self);
    targetPool.register(type ?? getType(self), self, name);
    return {};
  };
}

export function withIocPoolingUnsafe<TInstance extends Instance<IAnyType>>(config?: { name?: string; pool?: MstPool; type?: IAnyType }): MstExtendFunction<TInstance> {
  const { name, pool, type } = config ?? {};
  return (self: TInstance) => {
    const targetPool = pool ?? ensureBoundPool(self);
    targetPool.registerUnsafe(type ?? getType(self), self, name);
    return {};
  };
}
