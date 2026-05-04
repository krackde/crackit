---
title: "CI/CD 파이프라인에 보안 내재화하기 (SAST/DAST)"
date: "2026-05-03"
description: "GitHub Actions에 SAST, SCA, Secret Scanning을 통합하는 DevSecOps 파이프라인 구성 방법을 설명합니다."
category: "devsecops"
tags: ["DevSecOps", "CI/CD", "SAST", "GitHub Actions"]
---

## DevSecOps란?

**DevSecOps**는 개발(Dev) · 보안(Sec) · 운영(Ops)을 통합해 소프트웨어 개발 초기부터 보안을 내재화하는 방식입니다. "Shift Left Security"라고도 불립니다.

### 보안 검사 유형

| 유형 | 설명 | 도구 |
|------|------|------|
| **SAST** | 소스코드 정적 분석 | CodeQL, Semgrep, SonarQube |
| **DAST** | 실행 중 동적 분석 | OWASP ZAP, Burp Suite |
| **SCA** | 오픈소스 취약점 분석 | Dependabot, Snyk, OWASP Dependency-Check |
| **Secret Scanning** | 코드 내 시크릿 탐지 | TruffleHog, GitLeaks, GitHub Secret Scanning |
| **Container Scanning** | 이미지 취약점 분석 | Trivy, Grype, Snyk |

### GitHub Actions로 SAST 파이프라인 구성

```yaml
name: Security Scan

on: [push, pull_request]

jobs:
  codeql:
    runs-on: ubuntu-latest
    permissions:
      security-events: write
    steps:
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v3
        with:
          languages: javascript, python
      - uses: github/codeql-action/autobuild@v3
      - uses: github/codeql-action/analyze@v3

  secret-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: TruffleHog Scan
        uses: trufflesecurity/trufflehog@main
        with:
          extra_args: --only-verified

  sca:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Snyk SCA
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

### Semgrep으로 커스텀 룰 작성

```yaml
# SQL Injection 탐지 룰
rules:
  - id: sql-injection-format-string
    patterns:
      - pattern: |
          $QUERY = "... %s ..." % $INPUT
      - pattern-not: |
          $QUERY = "... %s ..." % $SAFE
    message: "SQL Injection 가능성: 사용자 입력을 쿼리에 직접 삽입하지 마세요."
    languages: [python]
    severity: ERROR
```

### 보안 게이트(Security Gate) 설정

PR 머지 조건에 보안 검사를 필수로 추가해 취약점이 있는 코드가 main 브랜치에 진입하지 못하도록 합니다.

> **핵심 원칙**: 보안은 마지막에 추가하는 것이 아니라, 처음부터 설계에 포함되어야 합니다.
