# 마실수다 (MASILSUDA)

60~70대 시니어를 위한 동네 소셜 플랫폼 프로토타입입니다.

## 주요 화면

- **마실**: 우리 동네 소규모 모임(산책, 식사·차, 동네마실 등) 둘러보기, 참여하기, 직접 만들기
- **이웃**: 「편한 친구 찾기」와 「설레는 인연 찾기」 프로필 카드, 준비된 인사말 보내기
- **수다**: 함께하는 마실 단체방, 이웃과의 1:1 수다, 일정 안내와 참석 확정
- **내 정보**: 큰 글씨 모드, 설레는 인연 공개 설정, 차단 관리, 전화 고객센터

## 실행 방법

빌드 과정 없이 `index.html` 파일 하나로 동작합니다. 브라우저로 열면 됩니다.
(Tailwind CSS, Google Fonts, Unsplash 이미지를 인터넷에서 불러옵니다.)

## Supabase 연결 (선택)

키를 넣지 않으면 예시 데이터로만 동작합니다. 연결하면 다음 내용이 서버에 저장됩니다:
새로 만든 마실, 마실 참여, 수다방 메시지, 이웃 인사.

1. Supabase 대시보드 > **SQL Editor**에서 `supabase/schema.sql` 내용을 붙여넣고 **Run**
2. **Project Settings > API**에서 `Project URL`과 `anon` `public` 키를 복사
3. `index.html` 상단의 `SUPABASE_URL`, `SUPABASE_ANON_KEY`에 붙여넣기

처음 접속하면 예시 마실 3개가 자동으로 저장됩니다.

> ⚠️ 지금의 접근 정책은 프로토타입용이라 로그인 없이 누구나 읽고 쓸 수 있습니다.
> 실제 이용자를 받기 전에 로그인(Supabase Auth)을 붙이고 정책을 좁혀야 합니다.
> `service_role` 키는 절대 `index.html`에 넣지 마세요.

## 웹으로 공개 (GitHub Pages)

저장소 **Settings > Pages**에서 Source를 `Deploy from a branch`, Branch를 `main` / `/ (root)`로 저장하면
`https://ssb4769-ops.github.io/masilsuda/` 주소로 열립니다. (무료 계정은 저장소가 Public이어야 합니다.)
