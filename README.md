# 교육대학원생을 위한 웹 앱 개발 입문

Vite + React + TypeScript로 만든 프론트엔드 전용 학습용 웹 앱입니다. 초보자가 웹 앱의 기본 개념, React 컴포넌트, TypeScript 타입, GitHub 업로드, Vercel 배포 흐름을 카드와 체크리스트로 따라갈 수 있게 구성했습니다.

## 실행 방법

```bash
npm install
npm run dev
```

개발 서버가 실행되면 터미널에 표시되는 로컬 주소를 브라우저에서 엽니다. 보통 `http://localhost:5173` 형식입니다.

## 빌드 확인

```bash
npm run build
```

빌드 결과물은 `dist` 폴더에 생성됩니다.

## GitHub에서 Vercel로 배포하기

1. GitHub에서 새 repository를 만들고 이 프로젝트를 push합니다.
2. Vercel에 로그인한 뒤 `Add New Project`를 선택합니다.
3. GitHub repository를 import합니다.
4. Framework Preset이 `Vite`인지 확인합니다.
5. Build Command는 `npm run build`, Output Directory는 `dist`로 둡니다.
6. `Deploy`를 누르면 배포 URL이 생성됩니다.

이후 GitHub에 다시 push하면 Vercel이 변경 사항을 자동으로 다시 배포합니다.
