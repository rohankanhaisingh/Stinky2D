# GeneratedUniqueIDObject

Interface representing an object that will be returned
when generating an unique id.

The object properties are marked as readonly, which cannot be modified in any way.

- - -

## Interface

```ts
export interface GeneratedUniqueIDObject {
	readonly id: string;
	readonly timestamp: number;
	readonly length: number;
}
```

## Example

```ts
const id: GeneratedUnqiueIDOBject = UniqueID(18);
```