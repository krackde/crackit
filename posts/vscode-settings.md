---
title: "개발 생산성을 높이는 VS Code 설정"
date: "2026-04-30"
description: "실제로 사용하는 VS Code 익스텐션과 단축키, settings.json 설정을 공유합니다."
category: "tools"
tags: ["VSCode", "개발환경", "생산성"]
---

## VS Code 필수 설정

개발 환경 설정에 시간을 투자하면 이후 생산성이 크게 올라갑니다.

### 필수 익스텐션

| 익스텐션 | 용도 |
|----------|------|
| ESLint | 코드 품질 검사 |
| Prettier | 코드 포매팅 |
| GitLens | Git 히스토리 시각화 |
| GitHub Copilot | AI 코드 자동완성 |
| Error Lens | 인라인 에러 표시 |

### settings.json 핵심 설정

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.fontSize": 14,
  "editor.fontFamily": "JetBrains Mono, Fira Code, monospace",
  "editor.fontLigatures": true,
  "editor.cursorBlinking": "smooth",
  "editor.minimap.enabled": false,
  "terminal.integrated.fontSize": 13,
  "workbench.colorTheme": "One Dark Pro"
}
```

### 자주 쓰는 단축키

| 단축키 | 동작 |
|--------|------|
| `Cmd + P` | 빠른 파일 열기 |
| `Cmd + Shift + P` | 커맨드 팔레트 |
| `Cmd + D` | 다음 동일 단어 선택 |
| `Option + Click` | 멀티 커서 |
| `Cmd + /` | 줄 주석 토글 |

작은 설정 하나하나가 쌓여 큰 차이를 만듭니다.
