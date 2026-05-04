---
title: "Burp Suite 기초: 웹 취약점 진단 시작하기"
date: "2026-04-25"
description: "웹 보안 진단의 필수 도구 Burp Suite의 핵심 기능과 활용법을 정리합니다."
category: "tools"
tags: ["Burp Suite", "웹보안", "DAST", "펜테스팅"]
---

## Burp Suite란?

Burp Suite는 웹 애플리케이션 보안 테스트에 가장 널리 쓰이는 통합 도구입니다. PortSwigger에서 개발했으며 Community Edition은 무료로 사용 가능합니다.

### 핵심 기능

| 기능 | 설명 |
|------|------|
| **Proxy** | 브라우저-서버 간 트래픽 가로채기 |
| **Repeater** | 요청 수동 수정 및 재전송 |
| **Intruder** | 자동화된 페이로드 삽입 (브루트포스, Fuzzing) |
| **Scanner** | 자동 취약점 스캔 (Pro 버전) |
| **Decoder** | Base64, URL 인코딩/디코딩 |
| **Comparer** | 두 응답 비교 |

### 프록시 설정

```
# FoxyProxy 설정 (Chrome/Firefox)
Proxy IP: 127.0.0.1
Port: 8080

# Burp CA 인증서 설치
http://burpsuite/cert 접속 후 cacert.der 다운로드
→ 브라우저 인증서 저장소에 추가
```

### Repeater 활용 예시

SQL Injection 테스트:

```http
POST /login HTTP/1.1
Host: target.com
Content-Type: application/x-www-form-urlencoded

username=admin'--&password=anything
```

### Intruder로 브루트포스

```
공격 유형:
- Sniper: 단일 파라미터 변경
- Battering ram: 모든 파라미터에 동일 페이로드
- Pitchfork: 여러 파라미터를 동시에 순차 변경
- Cluster bomb: 모든 조합 테스트 (Cartesian product)
```

### 유용한 단축키

| 단축키 | 동작 |
|--------|------|
| `Ctrl+R` | Repeater로 전송 |
| `Ctrl+I` | Intruder로 전송 |
| `Ctrl+U` | URL 디코딩 |
| `Ctrl+Shift+U` | URL 인코딩 |

### 추천 학습 플랫폼

- [PortSwigger Web Security Academy](https://portswigger.net/web-security) — 무료, 최고 품질
- [HackTheBox](https://www.hackthebox.com/)
- [TryHackMe](https://tryhackme.com/)
