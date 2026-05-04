---
title: "OWASP Top 10 2021 완전 정리"
date: "2026-05-01"
description: "웹 애플리케이션 보안의 기본 중의 기본, OWASP Top 10 2021 각 항목을 코드 예시와 함께 정리합니다."
category: "security"
tags: ["OWASP", "웹보안", "취약점"]
---

## OWASP Top 10 (2021)

OWASP(Open Web Application Security Project)는 매년 가장 심각한 웹 보안 위험 10가지를 발표합니다.

---

### A01 - Broken Access Control (접근 제어 취약점)

가장 흔하고 위험한 취약점. 인증된 사용자가 권한 밖의 리소스에 접근 가능한 경우입니다.

```python
# 취약한 코드 - 권한 검사 없음
@app.route('/admin/users/<int:user_id>')
def get_user(user_id):
    return User.query.get(user_id)  # 누구든 접근 가능!

# 안전한 코드
@app.route('/admin/users/<int:user_id>')
@require_role('admin')
def get_user(user_id):
    return User.query.get(user_id)
```

---

### A02 - Cryptographic Failures (암호화 실패)

민감한 데이터를 평문 전송하거나 약한 암호 알고리즘을 사용하는 경우.

```python
# 취약 - MD5는 사용 금지
import hashlib
password_hash = hashlib.md5(password.encode()).hexdigest()

# 안전 - bcrypt 사용
import bcrypt
password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
```

---

### A03 - Injection (인젝션)

SQL, OS 커맨드, LDAP 등 인터프리터에 신뢰할 수 없는 데이터를 삽입하는 공격.

```python
# SQL Injection 취약 코드
query = f"SELECT * FROM users WHERE name = '{username}'"

# 안전한 코드 - Parameterized Query
query = "SELECT * FROM users WHERE name = %s"
cursor.execute(query, (username,))
```

---

### A07 - Identification and Authentication Failures (인증 실패)

브루트포스 공격, 취약한 패스워드 정책, 세션 관리 미흡 등.

**체크리스트:**
- [ ] 다중 인증(MFA) 적용
- [ ] 로그인 실패 횟수 제한 (Rate Limiting)
- [ ] 세션 만료 시간 설정
- [ ] JWT 서명 검증 필수

---

### A09 - Security Logging and Monitoring Failures (보안 로깅 실패)

침해 사고를 탐지하지 못하거나 로그가 부족해 사후 분석이 불가능한 경우.

```python
import logging

# 보안 이벤트는 반드시 로깅
logging.warning(f"[SECURITY] Failed login attempt: user={username}, ip={request.remote_addr}")
logging.critical(f"[SECURITY] Privilege escalation attempt detected: user_id={user_id}")
```

---

전체 목록과 상세 내용은 [owasp.org](https://owasp.org/Top10/)에서 확인할 수 있습니다.
