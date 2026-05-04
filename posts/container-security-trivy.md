---
title: "컨테이너 보안: Docker 이미지 취약점 스캔 (Trivy)"
date: "2026-04-28"
description: "Trivy를 활용해 Docker 이미지의 OS 패키지, 라이브러리 취약점을 스캔하고 CI/CD에 통합하는 방법을 설명합니다."
category: "devsecops"
tags: ["Docker", "Trivy", "컨테이너보안", "DevSecOps"]
---

## 컨테이너 보안이 중요한 이유

컨테이너 이미지는 수백 개의 패키지를 포함하며, 그 중 하나라도 취약점이 있으면 공격 표면이 됩니다.

### Trivy 설치 및 기본 사용법

```bash
# macOS
brew install aquasecurity/trivy/trivy

# Ubuntu
sudo apt-get install trivy

# 이미지 스캔
trivy image nginx:latest

# 심각도 필터 (CRITICAL, HIGH만 표시)
trivy image --severity CRITICAL,HIGH nginx:latest

# JSON 출력
trivy image --format json --output result.json nginx:latest
```

### 스캔 결과 예시

```
nginx:latest (debian 12.5)
==============================
Total: 12 (HIGH: 8, CRITICAL: 4)

┌─────────────────┬───────────────┬──────────┬───────────────────┬────────────────┐
│ Library         │ Vulnerability │ Severity │ Installed Version │ Fixed Version  │
├─────────────────┼───────────────┼──────────┼───────────────────┼────────────────┤
│ openssl         │ CVE-2024-XXXX │ CRITICAL │ 3.0.11            │ 3.0.13         │
│ libexpat1       │ CVE-2024-YYYY │ HIGH     │ 2.5.0             │ 2.6.0          │
└─────────────────┴───────────────┴──────────┴───────────────────┴────────────────┘
```

### Dockerfile 보안 베스트 프랙티스

```dockerfile
# ❌ 나쁜 예 - root 사용자, latest 태그
FROM ubuntu:latest
RUN apt-get install -y curl
COPY . /app
CMD ["./app"]

# ✅ 좋은 예 - non-root, 고정 버전, 최소 이미지
FROM ubuntu:24.04 AS builder
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl=8.5.0-2ubuntu10 \
    && rm -rf /var/lib/apt/lists/*

FROM gcr.io/distroless/base-debian12
COPY --from=builder /app /app
USER nonroot:nonroot
EXPOSE 8080
ENTRYPOINT ["/app"]
```

### GitHub Actions 통합

```yaml
- name: Run Trivy vulnerability scanner
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: ${{ env.IMAGE_NAME }}
    format: sarif
    output: trivy-results.sarif
    severity: CRITICAL,HIGH
    exit-code: 1  # 취약점 발견 시 빌드 실패

- name: Upload Trivy scan results
  uses: github/codeql-action/upload-sarif@v3
  with:
    sarif_file: trivy-results.sarif
```

### SBOM (Software Bill of Materials) 생성

```bash
# CycloneDX 형식으로 SBOM 생성
trivy image --format cyclonedx --output sbom.json nginx:latest
```

SBOM은 이미지에 포함된 모든 소프트웨어 컴포넌트 목록으로, 공급망 보안의 핵심입니다.
