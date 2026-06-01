---
title: "Notepad++ 제품 보안 업데이트 권고 요약 및 OWASP Top 10 분석"
date: "2026-06-01"
description: "KISA 보호나라 보안공지 Notepad++ 업데이트 권고를 요약하고 OWASP Top 10과 연계해 취약점을 분석합니다."
tags:
  - Notepad++
  - KISA
  - OWASP
  - 보안공지
category: news
---

## 요약

2026년 6월 1일 KISA 보호나라&KrCERT/CC는 Notepad++ 제품의 보안 업데이트 권고를 발표했습니다. 이번 공지는 Notepad++ 8.9.6 및 8.9.6.1 이하 버전에 존재하는 보안 취약점을 해결하기 위한 것으로, 영향을 받는 사용자는 최신 패치 버전으로 즉시 업데이트할 것을 권장합니다.

주요 취약점은 다음과 같습니다.

- CVE-2026-48770: Out-of-bounds Read 취약점
- CVE-2026-48778: OS Command Injection 취약점
- CVE-2026-48800: OS Command Injection 취약점

공지는 영향을 받는 버전과 수정 버전을 명확히 제시하며, Notepad++ 8.9.6.1 이하 사용자에게 8.9.6.2 이상 버전으로 업그레이드할 것을 권고합니다.

## OWASP Top 10 관점 분석

### A01: Injection

OS Command Injection 취약점(CVE-2026-48778, CVE-2026-48800)은 명백히 OWASP A01-Injection에 해당합니다. 공격자가 외부 입력을 시스템 명령에 그대로 전달할 수 있다면, 임의 명령 실행, 원격 코드 실행, 시스템 탈취 등의 위험이 발생할 수 있습니다.

- 취약점 유형: OS Command Injection
- 위험: 악의적인 입력을 통해 호스트 명령 실행 가능
- 대응: 입력 검증 및 실행 경로 차단, 최신 패치 적용

### A09: Using Components with Known Vulnerabilities

Notepad++ 자체 버전이 취약한 상태로 유지되고 있으므로 OWASP A09-Using Components with Known Vulnerabilities 항목과도 연관됩니다. 보안 업데이트 권고는 이미 알려진 취약점을 포함한 제품 버전을 사용 중인 경우의 위험을 경고합니다.

- 취약 요소: 취약 버전 Notepad++ 사용
- 위험: 패치되지 않은 소프트웨어로부터 취약점 노출
- 대응: 최신 버전으로 업데이트, 취약 버전 사용 중단

### A06: Security Misconfiguration (보완적 고려)

직접적으로 웹 애플리케이션의 구성 문제는 아니지만, 타사 소프트웨어나 플러그인의 취약점을 방치하는 것은 보안 구성 관리 실패로 볼 수 있습니다. 특히 업데이트 정책이 부재하거나 자동 업데이트가 비활성화된 경우 A06-보안 구성 오탐 영역으로 확장해 볼 수 있습니다.

## 결론

이번 공지는 Notepad++ 사용자의 즉각적인 업데이트가 필요한 보안 권고입니다. 특히 OS Command Injection 취약점은 OWASP A01-Injection으로 분류되며, 알려진 취약 버전의 사용은 A09에 해당하는 위험입니다. 따라서 Notepad++ 사용자는 8.9.6.2 이상으로 빠르게 업그레이드하고, 보안 공지에 따라 추가 보안 권고를 확인해야 합니다.

---

### 참고

- [Notepad++ 8.9.6.1 및 8.9.6.2 릴리스 정보](https://notepad-plus-plus.org/news/v8961-released/)
- [Notepad++ 8.9.6.2 릴리스 정보](https://notepad-plus-plus.org/news/v8962-released/)
