import { useEffect, useMemo, useState } from 'react'
import './App.css'

type Lesson = {
  title: string
  tag: string
  minutes: number
  description: string
  points: string[]
}

type WorkflowStep = {
  title: string
  description: string
  command?: string
}

const lessons: Lesson[] = [
  {
    title: '웹 앱의 큰 그림',
    tag: 'Web App',
    minutes: 12,
    description: '브라우저, HTML, CSS, JavaScript가 함께 화면과 상호작용을 만드는 과정을 이해합니다.',
    points: ['정적 페이지와 웹 앱의 차이', '컴포넌트로 화면 나누기', '사용자 입력과 상태 변화'],
  },
  {
    title: 'React로 생각하기',
    tag: 'React',
    minutes: 18,
    description: 'UI를 작은 컴포넌트로 나누고 props와 state로 데이터를 흘려보내는 방식을 익힙니다.',
    points: ['컴포넌트 설계', 'useState 기초', '리스트 렌더링'],
  },
  {
    title: 'TypeScript 안전망',
    tag: 'TypeScript',
    minutes: 15,
    description: '타입을 통해 실수를 빨리 발견하고, 협업자가 읽기 쉬운 코드를 작성합니다.',
    points: ['type과 interface', '배열 데이터 타입 지정', '이벤트 타입 감각 익히기'],
  },
  {
    title: 'GitHub로 공유하기',
    tag: 'GitHub',
    minutes: 14,
    description: '내 프로젝트의 변경 기록을 저장하고 원격 저장소에 올리는 흐름을 연습합니다.',
    points: ['commit의 의미', 'push와 repository', 'README로 프로젝트 설명하기'],
  },
  {
    title: 'Vercel 배포 맛보기',
    tag: 'Deploy',
    minutes: 10,
    description: 'GitHub 저장소를 Vercel에 연결해 누구나 접속할 수 있는 주소로 배포합니다.',
    points: ['Import Project', 'Build Command 확인', '자동 재배포 흐름'],
  },
]

const workflow: WorkflowStep[] = [
  {
    title: '프로젝트 실행',
    description: '의존성을 설치한 뒤 개발 서버를 켜고 브라우저에서 결과를 확인합니다.',
    command: 'npm install → npm run dev',
  },
  {
    title: '컴포넌트 수정',
    description: 'src/App.tsx와 CSS를 고치며 저장할 때마다 화면이 갱신되는 경험을 합니다.',
    command: 'src/App.tsx',
  },
  {
    title: '빌드 점검',
    description: '배포 전에 TypeScript와 Vite 빌드가 통과하는지 확인합니다.',
    command: 'npm run build',
  },
  {
    title: 'GitHub 업로드',
    description: '변경 내용을 commit하고 GitHub 저장소로 push합니다.',
    command: 'git add . → git commit → git push',
  },
  {
    title: 'Vercel 연결',
    description: 'Vercel에서 GitHub 저장소를 선택하면 빌드 설정을 읽어 자동으로 배포합니다.',
    command: 'Framework Preset: Vite',
  },
]

const checklistItems = [
  '개발 서버를 켜고 로컬 주소에 접속했다',
  'React 컴포넌트가 화면 조각이라는 것을 설명할 수 있다',
  'TypeScript 타입 오류가 왜 도움이 되는지 이해했다',
  'GitHub에 프로젝트를 push했다',
  'Vercel에서 GitHub 저장소를 import했다',
  '배포된 URL을 열어 모바일 화면까지 확인했다',
]

function App() {
  const [checkedItems, setCheckedItems] = useState<string[]>(() => {
    const savedItems = localStorage.getItem('graduate-webapp-checklist')
    return savedItems ? JSON.parse(savedItems) : []
  })

  useEffect(() => {
    localStorage.setItem('graduate-webapp-checklist', JSON.stringify(checkedItems))
  }, [checkedItems])

  const completedCount = checkedItems.length
  const progress = useMemo(
    () => Math.round((completedCount / checklistItems.length) * 100),
    [completedCount],
  )

  const toggleItem = (item: string) => {
    setCheckedItems((currentItems) =>
      currentItems.includes(item)
        ? currentItems.filter((currentItem) => currentItem !== item)
        : [...currentItems, item],
    )
  }

  return (
    <main className="app-shell">
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow">Vite + React + TypeScript</span>
          <h1 id="hero-title">교육대학원생을 위한 웹 앱 개발 입문</h1>
          <p>
            처음 웹 앱을 만드는 학습자가 개념, 개발 순서, 배포 흐름을 한 번에 따라갈 수 있도록
            구성한 밝은 실습형 가이드입니다.
          </p>
          <div className="hero-actions" aria-label="핵심 학습 지표">
            <a href="#lessons">학습 카드 보기</a>
            <a href="#checklist">체크리스트 시작</a>
          </div>
        </div>

        <aside className="status-panel" aria-label="학습 진행 현황">
          <div>
            <span>완료율</span>
            <strong>{progress}%</strong>
          </div>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
          <p>
            {completedCount} / {checklistItems.length}개 완료
          </p>
        </aside>
      </section>

      <section className="section-block" id="lessons" aria-labelledby="lessons-title">
        <div className="section-heading">
          <span className="eyebrow">Learning Cards</span>
          <h2 id="lessons-title">초보자를 위한 핵심 학습 카드</h2>
        </div>
        <div className="lesson-grid">
          {lessons.map((lesson) => (
            <article className="lesson-card" key={lesson.title}>
              <div className="card-meta">
                <span>{lesson.tag}</span>
                <span>{lesson.minutes}분</span>
              </div>
              <h3>{lesson.title}</h3>
              <p>{lesson.description}</p>
              <ul>
                {lesson.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block flow-section" aria-labelledby="flow-title">
        <div className="section-heading">
          <span className="eyebrow">Development Flow</span>
          <h2 id="flow-title">로컬 개발부터 Vercel 배포까지</h2>
        </div>
        <ol className="workflow-list">
          {workflow.map((step, index) => (
            <li key={step.title}>
              <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {step.command && <code>{step.command}</code>}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section-block checklist-section" id="checklist" aria-labelledby="checklist-title">
        <div className="section-heading">
          <span className="eyebrow">Practice Checklist</span>
          <h2 id="checklist-title">나의 실습 체크리스트</h2>
          <p>체크한 항목은 브라우저에 저장되어 새로고침 후에도 유지됩니다.</p>
        </div>
        <div className="checklist">
          {checklistItems.map((item) => {
            const isChecked = checkedItems.includes(item)

            return (
              <label className="check-item" key={item}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleItem(item)}
                />
                <span>{item}</span>
              </label>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default App
