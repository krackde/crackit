---
title: "이진 탐색(Binary Search) 완벽 정리"
date: "2026-05-02"
description: "이진 탐색의 원리부터 다양한 변형 문제 풀이 패턴까지 정리합니다."
category: "algorithm"
tags: ["이진탐색", "알고리즘", "Python"]
---

## 이진 탐색이란?

정렬된 배열에서 **O(log n)** 시간에 원소를 찾는 알고리즘입니다.

### 기본 구현

```python
def binary_search(arr: list, target: int) -> int:
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1
```

### Lower Bound / Upper Bound

실전에서는 정확한 값이 아닌 **경계**를 찾는 경우가 많습니다.

```python
import bisect

arr = [1, 2, 2, 3, 4]

# 2가 처음 등장하는 인덱스
print(bisect.bisect_left(arr, 2))   # 1

# 2 다음 위치 (삽입 위치)
print(bisect.bisect_right(arr, 2))  # 3
```

### 매개변수 탐색 (Parametric Search)

"최솟값 중 최댓값" 같은 최적화 문제를 이진 탐색으로 풀 수 있습니다.

```python
def can_divide(arr, m, mid):
    count, total = 1, 0
    for x in arr:
        if total + x > mid:
            count += 1
            total = 0
        total += x
    return count <= m
```

이진 탐색은 단순해 보이지만 경계 조건을 정확히 잡는 것이 핵심입니다.
