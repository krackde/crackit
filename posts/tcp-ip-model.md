---
title: "TCP/IP 4계층 모델 정리"
date: "2026-05-01"
description: "네트워크의 핵심인 TCP/IP 4계층 모델을 OSI 7계층과 비교하며 정리합니다."
category: "cs"
tags: ["네트워크", "CS", "TCP/IP"]
---

## TCP/IP 4계층

현대 인터넷은 TCP/IP 프로토콜 스택을 기반으로 동작합니다.

| 계층 | 이름 | 프로토콜 |
|------|------|----------|
| 4 | 응용 계층 | HTTP, HTTPS, DNS, FTP |
| 3 | 전송 계층 | TCP, UDP |
| 2 | 인터넷 계층 | IP, ICMP, ARP |
| 1 | 네트워크 접근 계층 | Ethernet, Wi-Fi |

### TCP vs UDP

**TCP (Transmission Control Protocol)**
- 연결 지향 (3-way handshake)
- 신뢰성 보장, 순서 보장
- 흐름 제어, 혼잡 제어
- HTTP, 파일 전송에 사용

**UDP (User Datagram Protocol)**
- 비연결형
- 빠르지만 신뢰성 없음
- 실시간 스트리밍, DNS, 게임에 사용

### 3-Way Handshake

```
클라이언트           서버
    |  --- SYN --->  |
    |  <-- SYN+ACK - |
    |  --- ACK --->  |
    |   (연결 완료)   |
```

### HTTP와 HTTPS

HTTPS는 HTTP에 **TLS(Transport Layer Security)** 를 추가한 것으로, 데이터를 암호화하여 전송합니다.
