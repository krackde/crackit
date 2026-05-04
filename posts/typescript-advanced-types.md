---
title: "TypeScript 타입 시스템 완전 정복"
date: "2026-05-03"
description: "제네릭, 조건부 타입, infer 키워드까지 TypeScript의 고급 타입 시스템을 정리합니다."
category: "dev"
tags: ["TypeScript", "JavaScript"]
---

## TypeScript 고급 타입

TypeScript의 타입 시스템은 단순한 정적 타입 검사를 넘어, 강력한 타입 프로그래밍을 가능하게 합니다.

### 제네릭 (Generics)

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

### 조건부 타입 (Conditional Types)

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
```

### infer 키워드

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Fn = () => string;
type R = ReturnType<Fn>; // string
```

### Mapped Types

```typescript
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};
```

타입 시스템을 잘 활용하면 런타임 에러를 컴파일 타임에 잡을 수 있습니다.
